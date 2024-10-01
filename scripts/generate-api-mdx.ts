import path from "path";
import yaml from "yamljs";
import fs from "fs";
import { sync as globSync } from "glob";
import { loadJsonFileSync } from "load-json-file";
import * as prettier from "prettier";

(async () => {
  // documentation v14 has moved to ESM so need to import as if async, and wrap
  // in an IIFE as top level async not allowed.
  const documentation = await import("documentation");

  const srcPathDir = path.resolve(__dirname, "..", "turf");
  const docsOutDir = path.resolve(__dirname, "..", "docs");

  console.log(srcPathDir);
  // ...
  const modules = [];

  interface SidebarConfig {
    type: string;
    label: string;
    collapsed: boolean;
    items: string[];
  }

  const sidebarBuckets = {};
  const orderedSidebarBucketKeys: string[] = [];
  const tocCategories = {};
  let category = "";

  // Assemble user defined categories to place functions into. These will be the
  // categories in the API sidebar. A few other categories we create
  // automatically below to place types and constants in to.
  const docs = yaml.load(path.join(srcPathDir, "documentation.yml"));
  docs.toc.forEach((tocItem) => {
    if (tocItem.name) {
      sidebarBuckets[tocItem.name] = [];
      orderedSidebarBucketKeys.push(tocItem.name);
      category = tocItem.name;
    } else {
      tocCategories[tocItem] = category;
    }
  });
  // Catch all for uncategorised functions.
  sidebarBuckets["Other"] = [];
  orderedSidebarBucketKeys.push("Other");

  console.log(sidebarBuckets);

  // glob index.ts/js in turf/packages/
  const packageDirs = globSync(path.join(srcPathDir, "packages", "turf-*"));
  // These two packages weren't exported from @turf/turf in 6.5.0, so
  // aren't in the CDN file the website uses. Suppress for now
  // and add back in once v7 is on the CDN.
  // .filter((path) => path.includes("turf-helpers"));
  // .filter((path) => path.includes("turf-bearing"))
  // .filter((path) => !path.includes("turf-rectangle-grid"))
  // .filter((path) => !path.includes("turf-nearest-neighbor-analysis"));

  for (const packageDir of packageDirs) {
    const moduleName = path.parse(packageDir).name;
    console.log(`\n\n*** ${moduleName}\n`);

    const pckg = loadJsonFileSync(path.join(packageDir, "package.json"));

    // Check for index.ts or index.js
    const indexFiles = globSync(path.join(packageDir, "index.[jt]s"));
    if (indexFiles.length === 1) {
      const indexFile = indexFiles[0];

      // Get the documentation for the module.
      const res = await documentation.build([path.resolve(indexFile)], {
        external: [],
        shallow: true,
      });
      const moduleObj = JSON.parse(await documentation.formats.json(res));

      if (moduleName === "turf-moran-index") {
        console.log(JSON.stringify(moduleObj));
      }

      // For each exported member of the module (functions, types, consts)
      // generate the documentation, save to a file, and add an entry to the
      // appropriate heading in the sidebar. Some modules have multiple
      // members e.g. helpers or meta
      for (const member of moduleObj) {
        // console.log("function", JSON.stringify(fn));

        if (member.kind === "module") {
          console.log("skipping module header");
          continue;
        }

        let filename: string | undefined = undefined,
          mdx: string | undefined = undefined;

        if (member.kind === "typedef") {
          [filename, mdx] = typedefJsonToMdx(member, pckg);
        } else if (member.kind === "constant") {
          [filename, mdx] = [member.name, "bar"];
        } else if (member.kind === "function") {
          console.log(
            `skipping2 ${member.kind} ${member.name} from ${moduleName}`,
          );
        } else {
          // A function.
          [filename, mdx] = functionJsonToMdx(member, pckg);
        }

        console.log(pckg.name, member.name, filename);

        if (filename && mdx) {
          const prettyMdx = await prettier.format(mdx, {
            parser: "mdx",
            trailingSemi: "none",
          });
          const apiDir = member.kind === "typedef" ? "api/types" : "api";
          fs.writeFileSync(
            path.join(docsOutDir, apiDir, `${filename}.mdx`),
            prettyMdx,
          );

          if (tocCategories[filename]) {
            sidebarBuckets[tocCategories[filename]].push(
              `${apiDir}/${filename}`,
            );
          } else {
            // No category provided in documentation.yml. Default to "Other".
            sidebarBuckets["Other"].push(path.join(apiDir, `${filename}`));
          }
        } else {
          console.log(
            `skipping ${member.kind} ${member.name} from ${moduleName}`,
          );
        }
      }
    }
  }

  const sidebarConfig: SidebarConfig[] = [];
  for (const key of orderedSidebarBucketKeys) {
    sidebarConfig.push({
      type: "category",
      label: key,
      collapsed: false,
      items: sidebarBuckets[key].sort(),
    });
  }

  console.log(sidebarConfig);

  // Save API categories config to api-sidebar.ts. Prettify content as well.
  const sidebarContent = `// Generated automatically by generate-api-mdx.ts
// Do not edit manually.

export default ${JSON.stringify(sidebarConfig)}`;

  const prettySidebarContent = await prettier.format(sidebarContent, {
    parser: "typescript",
  });

  fs.writeFile(
    path.resolve(__dirname, "..", "api-sidebar.ts"),
    prettySidebarContent,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    },
  );

  function typedefJsonToMdx(typedef, pckg) {
    return [typedef.name, "some mdx"];
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

import * as turf from "turf-next";
import ExampleMap from "@site/src/components/ExampleMap";
import BrowserOnly from "@docusaurus/BrowserOnly";

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
    const tags = fn.tags;
    for (const param of fn.params) {
      const paramTag = tags
        .filter((tag) => tag.name === param.name)
        .slice(0, 1)[0];
      if (paramTag) {
        param.type = paramTag.type;
      }
      mdx = mdx.concat(renderTagToMdx(param));
      // For example, options.blah
      if (param.properties) {
        for (const property of param.properties) {
          // Merge in the 'types' field from the tag of the same name. For some
          // reason documentationjs stores the type data (including optional) on
          // the tag, but the rich description (including embedded links) on the
          // params.
          const propertyTag = tags
            .filter((tag) => tag.name === property.name)
            .slice(0, 1)[0];

          property.type = propertyTag.type;
          mdx = mdx.concat(renderTagToMdx(property));
        }
      }
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
          "{$1}",
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
          '"center": turf.point(center)',
        );

        // shortestPath
        exampleCode = exampleCode.replace(
          /(?<=var addToMap = \{.*?)(options.obstacles)/,
          '"obstacles": options.obstacles',
        );

        // square
        exampleCode = exampleCode
          .replace(
            /(?<=var addToMap = \{.*?)(turf\.bboxPolygon\(bbox\))/,
            '"bbox": turf.bboxPolygon(bbox)',
          )
          .replace(
            /(?<=var addToMap = \{.*?)(turf\.bboxPolygon\(squared\))/,
            '"squared": turf.bboxPolygon(squared)',
          );

        // Indent with two spaces so example lines up with surrounding MDX.
        mdx = mdx.concat(
          "  // jsdoc example start\n",
          exampleCode.replace(/^(.*?)$/gm, "  $1"), // Indent lines
          "\n  // jsdoc example end",
        );
        mdx = mdx.concat(`
        
  return <ExampleMap addToMap={addToMap}/>;
}

<!-- prettier-ignore -->
<BrowserOnly>{() => <Map${index} />}</BrowserOnly>
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
          ? newlineToSpace(mdxEscape(renderToMdx(tag.description)))
          : "";
        const defaultValue = tag.default
          ? `_(default ${mdxEscape(tag.default)})_`
          : "";
        mdx = mdx.concat(
          `| ${name}${optional} | **${type}** | ${description} ${defaultValue} |\n`,
        );
        break;
      case "example":
        // When rendering to MDX (i.e. to be read by a person) trim everything
        // from the //addToMap comment to the end of the text.
        mdx = mdx.concat(
          mdxLiteral(tag.description.replace(/\s.\/\/addToMap.+$/s, "")),
        );
        break;
      default:
        throw new Error(tag.title + " not supported");
    }
    return mdx;
  }

  function mdxEscape(mdxIn) {
    return mdxIn
      .replace(/(?<!\\)([\{\}\<\>])/g, "\\$1")
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
      case "html":
        mdx = mdx.concat(node.value);
        break;
      case "link":
      case "linkReference":
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
        mdx = mdx.concat("`", node.value, "`");
        break;
      case "strong":
        mdx = mdx.concat("**");
        for (const child of node.children) {
          mdx = mdx.concat(renderToMdx(child));
        }
        mdx = mdx.concat("**");
        break;
      case "emphasis":
        mdx = mdx.concat("_");
        for (const child of node.children) {
          mdx = mdx.concat(renderToMdx(child));
        }
        mdx = mdx.concat("_");
        break;
      case "list":
        // Need special path for this to be able to pass ordered or unordered
        // prefix to renderListItemMdx()
        mdx = mdx.concat(renderListMdx(node));
        mdx = mdx.concat("\n\n");
        break;
      case "TypeApplication":
        mdx = mdx.concat(
          `${renderToMdx(node.expression)}<${node.applications
            .map((application) => renderToMdx(application))
            .join("|")}>`,
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
          `${node.elements.map((element) => renderToMdx(element)).join("|")}`,
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
