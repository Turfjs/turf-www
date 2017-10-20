#!/usr/bin/env node

const fs = require('fs')
const d3 = require('d3-queue')
const path = require('path')
const glob = require('glob')
const yaml = require('yamljs')
const load = require('load-json-file')
const write = require('write-json-file')
const documentation = require('documentation')

const configPath = path.join(__dirname, '..', 'src', 'config.json')
const packagesPath = glob.sync(path.join(__dirname, '..', 'turf', 'packages', 'turf-*', 'package.json'))

const moduleSidebarList = []
const completeModules = []
const q = d3.queue(1)

var out = yaml.load(path.join(__dirname, '..', 'documentation.yml'))
out.toc.forEach(tocItem => {
  moduleSidebarList.push({
    isHeading: tocItem.name ? true : false,
    name: tocItem.name ? tocItem.name : tocItem,
    hidden: false
  })
})

packagesPath.forEach(packagePath => {
  const directory = path.parse(packagePath).dir
  const directoryName = path.basename(directory).replace('turf-', '')
  const indexPath = path.join(directory, 'index.js')
  const pckg = load.sync(packagePath)

  // Build Documentation
  q.defer(callback => {
    console.log('Parsing Docs:', pckg.name)
    documentation.build(indexPath, {
      shallow: true
    }).then(res => {
      if (res === undefined) return console.warning(packagePath);
      // Format JSON
      documentation.formats.json(res).then(docs => {
        docs = JSON.parse(docs)
        const parent = (docs.length > 1) ? pckg.name : null

        docs.forEach(metadata => {

          const category = getCategory(metadata)

          // Module
          if (isModuleInSidebar(metadata.name)) {
            completeModules.push({
              parent,
              category,
              name: metadata.name,
              description: getDescription(metadata),
              snippet: getSnippet(metadata),
              example: getExample(metadata),
              hasMap: hasMap(metadata),
              npmName: pckg.name,
              returns: getReturns(metadata),
              params: getParams(metadata),
              options: getOptions(metadata),
              throws: getThrows(metadata)
            })
          }
        })
        callback(null)
      })
    })
  })
})

q.awaitAll(() => {
  const config = {
    sidebar: moduleSidebarList,
    modules: completeModules
  }
  write.sync(configPath, config)
  console.log('Saved Config:', configPath)
})

function isModuleInSidebar (moduleName) {
  const matches = moduleSidebarList.filter(mod => {
    return mod.name === moduleName
  })
  return matches.length > 0
}

function getCategory (metadata) {
  for (const {title, description} of metadata.tags) {
    if (title === 'category') return description
  }
  return null
}

function getDescription (metadata) {
  return concatTags(metadata.description.children[0].children, true)
}

function getSnippet (metadata) {
  const example = metadata.examples[0]
  if (example) return example.description.split(/\n\/\/addToMap/)[0]
  return false
}

function getExample (metadata) {
  const example = metadata.examples[0]
  if (example) return example.description
  return false
}

function hasMap (metadata) {
  const example = metadata.examples[0]
  if (example) return example.description.indexOf('//addToMap') !== -1
  return false
}

function getNpmName (metadata, parent) {
  if (parent !== null) return parent
  return metadata.name.replace(/([A-Z])/g, word => '-' + word.toLowerCase())
}

function getReturns (metadata) {
  if (!metadata.returns) return false
  return metadata.returns.map(result => {
    if (!result.description.children.length) return false
    return {
      type: getType(result.type),
      desc: concatTags(result.description.children[0].children, false)
    }
  })
}

function getThrows (metadata) {
  if (!metadata.throws) return false
  return metadata.throws.map(result => {
    if (!result.description.children.length) return false
    return {
      type: getType(result.type),
      desc: concatTags(result.description.children[0].children, false)
    }
  })
}

function getParams (metadata) {
  if (!metadata.params) return false
  let outParams = metadata.params.map(param => {
    if (!param.type) return { type: null }
    if (!param.description.children.length) return false
    return {
      Argument: param.name,
      Type: getType(param.type, true),
      Description: concatTags(param.description.children[0].children),
      _lineNum: param.lineNumber
    }
  })
  outParams = outParams.filter(function (param) {
    return param.type !== null
  })
  const finalOut = outParams.sort(function (a, b) {
    return a._lineNum - b._lineNum
  })
  finalOut.forEach(function (param) {
    delete param._lineNum
  })
  return finalOut
}

function getOptions (metadata) {
  if (!metadata.params) return false
  let options = metadata.params.filter(({name}) => {
    return name === 'options'
  })
  if (options.length === 0) return null
  let outProperties = options[0].properties.map(prop => {
    let defaultVal = null
    if (prop.default) defaultVal = prop.default.replace('\\','')
    return {
      Prop: prop.name.replace('options.',''),
      Type: getType(prop.type),
      Default: defaultVal,
      Description: concatTags(prop.description.children[0].children, false),
    }
  })
  return outProperties
}

function concatTags (inNode, addLink) {
  if (!inNode) return false
  let outDescr = inNode.map(node => {
    if (node.children) {
      if (!addLink) return node.children[0].value
      let link = getLink(node.children[0].value)
      if (link === null || !node.jsdoc) link = node.url
      return '<a target="_blank" href="' + link + '">' + node.children[0].value + '</a>'
    }
    return node.value
  })
  outDescr = outDescr.join(' ').replace(' .', '.')
  if (outDescr === 'Optional parameters') outDescr = outDescr.concat(': see below')
  return outDescr
}

function getType (inNode, addLink) {
  if (!inNode) return false
  if (inNode.type === 'UnionType') {
    return '(' + inNode.elements.map(node => {
      return getType(node, addLink)
    }).join(' | ') + ')'
  }
  if (inNode.type === 'OptionalType') return 'Optional: ' + inNode.expression.name
  if (typeof inNode.type === 'object') return inNode.name
  if (inNode.type === 'NameExpression') return inNode.name
  if (inNode.type === 'TypeApplication') {
    return inNode.expression.name + ' <' + inNode.applications.map(node => {
      if (node.type === 'UnionType') {
        return '(' + node.elements.map(node2 => {
          return getType(node2, addLink)
        }).join(' | ') + ')'
      }
      if (node.type === 'TypeApplication') {
        return getType(node, addLink)
      }
      let link = getLink(node.name)
      if (!addLink || link === null) return node.name
      return '<a target="_blank" href="' + link + '">' + node.name + '</a>'
    }) + '>'
  }
}

function getLink (name) {
  switch (name.toUpperCase()) {
    case 'POINT':
    case 'POINTS':
      return 'http://geojson.org/geojson-spec.html#point'
    case 'MULTIPOINT':
      return 'http://geojson.org/geojson-spec.html#multipoint'
    case 'LINESTRING':
    case '(MULTI)LINESTRING':
    case '(MULTI)LINESTRING(S)':
    case 'LINE':
      return 'http://geojson.org/geojson-spec.html#linestring'
    case 'MULTILINESTRING':
      return 'http://geojson.org/geojson-spec.html#multilinestring'
    case 'POLYGON':
    case 'POLYGON(S)':
    case '(MULTI)POLYGON':
      return 'http://geojson.org/geojson-spec.html#polygon'
    case 'MULTIPOLYGON':
      return 'http://geojson.org/geojson-spec.html#multipolygon'
    case 'GEOMETRY':
      return 'http://geojson.org/geojson-spec.html#geometry'
    case 'GEOMETRYCOLLECTION':
      return 'http://geojson.org/geojson-spec.html#geometrycollection'
    case 'FEATURE':
      return 'http://geojson.org/geojson-spec.html#feature-objects'
    case 'FEATURECOLLECTION':
      return 'http://geojson.org/geojson-spec.html#feature-collection-objects'
    case 'BBOX':
      return 'http://geojson.org/geojson-spec.html#bounding-boxes'
    default:
      return null
  }
}
