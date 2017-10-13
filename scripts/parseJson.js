const path = require('path')
const load = require('load-json-file')
const write = require('write-json-file')

var moduleSidebarList = []
var completeModules = []
load.sync(path.join(__dirname, 'tempConfig.json')).forEach(module => {
  var isHeading = module.kind === 'note'
  moduleSidebarList.push({
    isHeading: isHeading,
    name: module.name,
    hidden: false
  })
  if (!isHeading) {
    var parent = getParent(module.context.file)
    completeModules.push({
      name: module.name,
      description: concatTags(module.description.children[0].children, true),
      parent: parent,
      snippet: getSnippet(module.examples[0]),
      example: getExample(module.examples[0]),
      hasMap: hasMap(module.examples[0]),
      npmName: getNpmName(module.name, parent),
      returns: getReturns(module.returns),
      params: getParams(module.params),
      throws: getThrows(module.throws)
    })
  }
})

var config = {
  sidebar: moduleSidebarList,
  modules: completeModules
}
write.sync(path.join(__dirname, '..', 'template', 'turf-template', 'src', 'assets', 'config.json'), config)
console.log('Done compiling the config file')

function getParent (filePath) {
  if (filePath.includes('turf-helpers')) return 'helpers'
  if (filePath.includes('turf-meta')) return 'meta'
  if (filePath.includes('turf-invariant')) return 'invariant'
  return null
}

function getSnippet (example) {
  if (example) return example.description.split('\r\n//addToMap')[0]
  return false
}

function getExample (example) {
  if (example) return example.description
  return false
}

function hasMap (example) {
  if (example) return example.description.indexOf('//addToMap') !== -1
  return false
}

function getNpmName (moduleName, parent) {
  if (parent !== null) return parent
  return moduleName.replace(/([A-Z])/g, word => '-' + word.toLowerCase())
}

function getReturns (returns) {
  return returns.map(function (result) {
    return {
      type: getType(result.type),
      desc: concatTags(result.description.children[0].children, false)
    }
  })
}

function getThrows (throws) {
  return throws.map(function (result) {
    return {
      type: getType(result.type),
      desc: concatTags(result.description.children[0].children, false)
    }
  })
}

function getParams (params) {
  var outParams = params.map(function (param) {
    if (!param.type) return { type: null }

    return {
      Argument: param.name,
      Type: getType(param.type),
      Description: concatTags(param.description.children[0].children, false),
      _lineNum: param.lineNumber
    }
  })
  outParams = outParams.filter(function (param) {
    return param.type !== null
  })
  var finalOut = outParams.sort(function (a, b) {
    return a._lineNum - b._lineNum
  })
  finalOut.forEach(function (param) {
    delete param._lineNum
  })
  return finalOut
}

function concatTags (inNode, addLink) {
  var outDescr = inNode.map(function (node) {
    if (node.children) {
      if (!addLink) return node.children[0].value
      var link = getLink(node.children[0].value)
      if (link === null || !node.jsdoc) link = node.url
      return '<a target="_blank" href="' + link + '">' + node.children[0].value + '</a>'
    }
    return node.value
  })
  return outDescr.join(' ').replace(' .', '.')
}

function getType (inNode) {
  if (inNode.type === 'UnionType') {
    return '( ' + inNode.elements.map(function (node) {
      return getType(node)
    }).join(' | ') + ' )'
  }
  if (inNode.type === 'OptionalType') return 'Optional: ' + inNode.expression.name
  if (typeof inNode.type === 'object') return inNode.name
  if (inNode.type === 'NameExpression') return inNode.name
  if (inNode.type === 'TypeApplication') {
    return inNode.expression.name + ' 〈' + inNode.applications.map(function (node) {
      return node.name
    }) + '〉'
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
