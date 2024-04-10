import { build, formats } from "documentation";
import path from "path";
import yaml from "yamljs";
import fs from "fs";
import { sync as globSync } from "glob";
import { loadJsonFileSync } from "load-json-file";
import parseJavaScript from "documentation/src/parsers/javascript";

(async () => {
  const srcPathDir = path.resolve(__dirname, "..", "turf");

  console.log(srcPathDir);
  // ...
  const modules = [];

  const docs = yaml.load(path.join(srcPathDir, "documentation.yml"));
  docs.toc.forEach((tocItem) => {
    if (tocItem.name) {
      return modules.push({
        group: tocItem.name,
        modules: [],
      });
    }
    modules[modules.length - 1].modules.push({
      name: tocItem,
      hidden: false,
    });
  });

  // console.log(modules);

  /* ... */
  const content = {};

  // glob index.ts/js in turf/packages/
  const packageDirs = globSync(path.join(srcPathDir, "packages", "turf-*"));
  // .filter((path) => path.includes("turf-difference"));

  await Promise.all(
    packageDirs.map(async (packageDir) => {
      const moduleName = path.parse(packageDir).name;
      console.log(moduleName);

      const pckg = loadJsonFileSync(path.join(packageDir, "package.json"));

      // Check for index.ts or index.js
      const indexFiles = globSync(path.join(packageDir, "index.[jt]s"));
      if (indexFiles.length === 1) {
        const indexFile = indexFiles[0];
        const res = await build([path.resolve(indexFile)], {
          external: [],
          shallow: true,
        });
        const moduleObj = JSON.parse(await formats.json(res));

        // Multiple functions e.g. helpers or meta
        moduleObj.forEach((fn) => {
          if (fn.kind && fn.kind === "module") {
            console.log("skipping module header");
            return;
          }
          if (fn.kind && fn.kind !== "function") {
            console.log(`skipping non-function ${fn.name}`);
            return;
          }

          const [filename, mdx] = functionJsonToMdx(fn, pckg);

          if (filename && mdx) {
            fs.writeFileSync(
              srcPathDir + "/../docs/api/" + filename + ".mdx",
              mdx
            );
          } else {
            console.log(`skipping ${moduleName} ${filename}`);
          }
        });
      }
    })
  );

  function moduleJsonToMdx(moduleObj, pckg) {
    if (moduleObj.length === 1) {
      // Single function in this module.
      return functionJsonToMdx(moduleObj[0], pckg);
    } else {
      let mdx = "";
      let filename = "";
      // Multiple functions e.g. helpers or meta
      moduleObj.forEach((fn) => {
        if (fn.kind && fn.kind === "module") {
          console.log("skipping module header");
          return;
        }
        const [fnFilename, fnMdx] = functionJsonToMdx(fn, pckg);
        filename = fnFilename;
        mdx.concat(fnMdx);
      });
      return [filename, mdx];
    }
  }

  function functionJsonToMdx(fn, pckg) {
    const name = fn.name;

    const description = getDescriptionMdx(fn);

    const params = getParamsMdx(fn);

    const returns = getReturnsMdx(fn);

    let examples;
    if (hasExamples(fn)) {
      examples = getExamplesMdx(fn);
    }

    return [
      name,
      `---
title: ${name}
---

import * as turf from "@turf/turf";
import ExampleMap from "@site/src/components/ExampleMap";
    
### Description

${description}

### Parameters

${params}

### Returns

${returns}

${examples ? "### Examples" : ""}

${examples ? examples : ""}

### Installation

\`\`\`javascript
$ npm install ${pckg.name}

import { ${name} } from "${pckg.name}";
const result = ${name}(...);
\`\`\`

\`\`\`javascript
$ npm install @turf/turf

import * as turf from "@turf/turf";
const result = turf.${name}(...);
\`\`\`

`,
    ];
  }

  function hasExamples(fn) {
    return fn.tags.filter((tag) => tag.title === "example").length > 0;
  }

  function getParamsMdx(fn) {
    let mdx = "| Name | Type | Description |\n| --- | --- | --- |\n";
    for (const tag of fn.tags.filter((tag) => tag.title === "param")) {
      mdx = mdx.concat(renderTagToMdx(tag));
    }

    return mdx;
  }

  function getReturnsMdx(fn) {
    let mdx = "";
    for (const ret of fn.returns) {
      const returnsType = `**${renderToMdx(ret.type)}**`;
      const returnsDescription = ret.description
        ? `${renderToMdx(ret.description)}`
        : "";
      mdx = mdx
        .concat("<ul>\n")
        .concat(mdxEscape(`  ${returnsType} ${returnsDescription}\n`))
        .concat("</ul>\n");
    }
    // for (const tag of fn.tags.filter((tag) => tag.title === "returns")) {
    //   mdx = mdx.concat(renderTagToMdx(tag));
    // }

    return mdx;
  }

  /**
   * Generates the Markdown content for the examples section of a function.
   * Note there may be multiple examples and maps for each
   * function.
   *
   * @param {Object} fn - The function JSDoc to extract examples from.
   * @return {string} The Markdown content for the examples section.
   */
  function getExamplesMdx(fn) {
    let mdx = "";
    // Remember there may be multiple examples!
    for (const [index, tag] of fn.tags
      .filter((tag) => tag.title === "example")
      .entries()) {
      // Possibly need to modify this below.
      let exampleCode: string = tag.description;

      mdx = mdx.concat(renderTagToMdx(tag));

      // If there's an //addToMap comment, include a copy of the example code
      // in the MDX to be executed, and embed an <ExampleMap> component to
      // display the result.
      if (exampleCode.match(/\/\/addToMap/)) {
        mdx = mdx.concat(`
export function Map${index}() {
  "use strict";
  
`);
        // However we need to transform the addToMap array into an object so
        // the ExampleMap can implicitly use the keys as layer names.
        // e.g. var addToMap = [a, b]
        // becomes var addToMap = {a, b}
        //
        // To complicate this however, some legacy doc passes complex values like
        // [start, end, options.obstacles, path]
        // [turf.point(center), ellipse]
        // so quote these strings so they can be used as object keys.

        // First replace [ with {, and ] with }
        exampleCode = exampleCode.replace(
          /(?<=^var addToMap = )(?:\[)(.+?)(?:\]);{0,1}$/m,
          "{$1}"
        );

        // Next (and this isn't ideal) replace a number of special cases.
        // This code can be retired in the near future, as we only need it
        // for the 6.5.0 code that we don't really want to make any changes
        // to.
        // Once we have a version of the 6.5.0 documentation generated and
        // archived, we can remove this as we'll be able to commit {} notation
        // in the JSDoc @example directly before generating new versions.

        // circle
        // ellipse
        exampleCode = exampleCode.replace(
          /(?<=var addToMap = \{.*?)(turf\.point\(center\))/,
          '"center": turf.point(center)'
        );

        // shortestPath
        exampleCode = exampleCode.replace(
          /(?<=var addToMap = \{.*?)(options.obstacles)/,
          '"obstacles": options.obstacles'
        );

        // square
        exampleCode = exampleCode
          .replace(
            /(?<=var addToMap = \{.*?)(turf\.bboxPolygon\(bbox\))/,
            '"bbox": turf.bboxPolygon(bbox)'
          )
          .replace(
            /(?<=var addToMap = \{.*?)(turf\.bboxPolygon\(squared\))/,
            '"squared": turf.bboxPolygon(squared)'
          );

        // Indent with two spaces so example lines up with surrounding MDX.
        mdx = mdx.concat(
          "  // jsdoc example start\n",
          exampleCode.replace(/^(.*?)$/gm, "  $1"), // Indent lines
          "\n  // jsdoc example end"
        );
        mdx = mdx.concat(`
        
  return <ExampleMap addToMap={addToMap}/>;
}
    
<Map${index} />
`);
      }
    }

    return mdx;
  }

  function renderTagToMdx(tag) {
    let mdx = "";
    switch (tag.title) {
      case "name":
        break;
      case "param":
        const name = tag.name;
        let optional = "";
        let type = "";
        if (!tag.type) {
          // Possible in the case of malformed JSDoc i.e. missing {}
          // Default to something to prompt user to check the code.
          // Should be able to remove this once we archive a copy of 6.5.0 docs
          // and fix the annotations in v7.
          // Single example found in @turf-distance-weight pNormDistance.
          type = "UNCERTAIN";
        } else {
          optional = tag.type.type === "OptionalType" ? "<i>?</i>" : "";
          type = mdxEscape(renderToMdx(tag.type));
        }
        // Join multi-line param descriptions with a space. https://stackoverflow.com/a/30955762
        const description = tag.description
          ? newlineToSpace(mdxEscape(tag.description))
          : "";
        const defaultValue = tag.default
          ? `_(default ${mdxEscape(tag.default)})_`
          : "";
        mdx = mdx.concat(
          `| ${name}${optional} | **${type}** | ${description} ${defaultValue} |\n`
        );
        break;
      case "example":
        // When rendering to MDX (i.e. to be read by a person) trim everything
        // from the //addToMap comment to the end of the text.
        mdx = mdx.concat(
          mdxLiteral(tag.description.replace(/\s.\/\/addToMap.+$/s, ""))
        );
        break;
      default:
        throw new Error(tag.title + " not supported");
    }
    return mdx;
  }

  function mdxEscape(mdxIn) {
    return mdxIn
      .replace(/(?<!\\)([\{\<])/g, "\\$1")
      .replace(/`(\w+)`/g, "```$1```")
      .replace(/\|/g, " \\| ");
  }

  function newlineToSpace(mdxIn) {
    return mdxIn.replace(/\n/g, " ");
  }

  function mdxLiteral(mdxIn) {
    return `\`\`\`javascript\n${mdxIn}\n\`\`\`\n`;
  }

  function getDescriptionMdx(fn) {
    let description = "";
    if (fn.description.children) {
      for (const child of fn.description.children) {
        description = description.concat(renderToMdx(child));
      }
    }

    return mdxEscape(description);
  }

  function renderListMdx(node) {
    let mdx = "";
    for (const child of node.children) {
      mdx = mdx.concat(renderListItemMdx(child, node.ordered ? "1." : "-"));
    }
    return mdx;
  }

  function renderListItemMdx(node, prefix) {
    let mdx = `${prefix} `;
    for (const child of node.children) {
      mdx = mdx.concat(renderToMdx(child, node));
    }
    return mdx;
  }

  function renderToMdx(node, parent: undefined | any = undefined) {
    if (typeof node === "string") {
      return node;
    }

    let mdx = "";
    switch (node.type) {
      case "root":
        for (const child of node.children) {
          mdx = mdx.concat(renderToMdx(child));
        }
        break;
      case "paragraph":
        for (const child of node.children) {
          mdx = mdx.concat(renderToMdx(child));
        }
        if (parent && parent.type === "listItem") {
          // For some reason list item contents are provided as paragraphs.
          // Only add a single newline to avoid additional whitespace
          // between items.
          mdx = mdx.concat("\n");
        } else {
          mdx = mdx.concat("\n\n");
        }
        break;
      case "text":
        mdx = mdx.concat(node.value);
        break;
      case "link":
        let url = node.url;
        if (docs.paths[node.url]) {
          url = docs.paths[node.url];
        }
        mdx = mdx.concat("[");
        for (const child of node.children) {
          mdx = mdx.concat(renderToMdx(child));
        }
        mdx = mdx.concat("](", url, ")");
        break;
      case "inlineCode":
        mdx = mdx.concat("```", node.value, "```");
        break;
      case "strong":
        mdx = mdx.concat("**");
        for (const child of node.children) {
          mdx = mdx.concat(renderToMdx(child));
        }
        mdx = "**";
        break;
      case "emphasis":
        mdx = mdx.concat("_", node.value, "_");
        break;
      case "list":
        // Need special path for this to be able to pass ordered or unordered
        // prefix to renderListItemMdx()
        mdx = mdx.concat(renderListMdx(node));
        break;
      case "TypeApplication":
        mdx = mdx.concat(
          `${renderToMdx(node.expression)}<${node.applications
            .map((application) => renderToMdx(application))
            .join("|")}>`
        );
        break;
      case "NameExpression":
        if (docs.paths[node.name]) {
          mdx = mdx.concat("[", node.name, "](", docs.paths[node.name], ")");
        } else {
          mdx = mdx.concat(node.name);
        }
        break;
      case "OptionalType":
        mdx = mdx.concat(renderToMdx(node.expression));
        break;
      case "UnionType":
        mdx = mdx.concat(
          `${node.elements.map((element) => renderToMdx(element)).join("|")}`
        );
        break;
      case "UndefinedLiteral":
        mdx = mdx.concat("undefined");
        break;
      case "NullLiteral":
        mdx = mdx.concat("null");
        break;
      case "AllLiteral":
        mdx = mdx.concat("\\*");
        break;
      default:
        throw new Error(node.type + " not supported");
    }
    return mdx;
  }
})();
