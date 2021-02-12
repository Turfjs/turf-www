#!/usr/bin/env node

const d3 = require('d3-queue')
const path = require('path')
const glob = require('glob')
const yaml = require('yamljs')
const load = require('load-json-file')
const write = require('write-json-file')
const documentation = require('documentation')

const configPath = path.join(__dirname, '..', 'src', 'assets', 'config.json')
const packagesPath = glob.sync(path.join(__dirname, '..', 'turf', 'packages', 'turf-*', 'package.json'))

const modules = []
const q = d3.queue(1)

const docs = yaml.load(path.join(__dirname, '..', 'turf', 'documentation.yml'))
docs.toc.forEach(tocItem => {
  if (tocItem.name) {
    return modules.push({
      group: tocItem.name,
      modules: []
    })
  }
  modules[modules.length - 1].modules.push({
    name: tocItem,
    hidden: false
  })
})
packagesPath.forEach(packagePath => {
  const directory = path.parse(packagePath).dir
  const indexPath = path.join(directory, 'dist', 'js', 'index.js')
  const pckg = load.sync(packagePath)

  // Build Documentation
  q.defer(callback => {
    console.log('Parsing Docs:', pckg.name)
    documentation.build(indexPath, {
      shallow: true
    }).then(res => {
      if (res === undefined) return console.warning(packagePath)
      // Format JSON
      documentation.formats.json(res).then(docs => {
        docs = JSON.parse(docs)
        const parent = (docs.length > 1) ? pckg.name : null

        docs.forEach(metadata => {
          var moduleObj = getModuleObj(metadata.name)
          if (moduleObj) {
            moduleObj.parent = parent
            moduleObj.description = getDescription(metadata)
            moduleObj.snippet = getSnippet(metadata)
            moduleObj.example = getExample(metadata)
            moduleObj.hasMap = hasMap(metadata)
            moduleObj.npmName = pckg.name
            moduleObj.returns = getReturns(metadata)
            moduleObj.params = getParams(metadata)
            moduleObj.options = getOptions(metadata)
            moduleObj.throws = getThrows(metadata)
          }
        })
        callback(null)
      })
    })
  })
})

q.awaitAll(() => {
  const config = {
    modules: modules
  }
  write.sync(configPath, config)
  console.log('Saved Config:', configPath)
})

function getModuleObj (moduleName) {
  for (var i = 0; i < modules.length; i++) {
    var group = modules[i]
    for (var i2 = 0; i2 < group.modules.length; i2++) {
      if (group.modules[i2].name === moduleName) return group.modules[i2]
    }
  }
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
      Type: createLink(param.type),
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
  const options = metadata.params.filter(({name}) => {
    return name === 'options'
  })
  if (options.length === 0) return null

  let outParams = options[0].properties.map(prop => {
    let defaultVal = prop.default ? prop.default.replace('\\', '') : null
    return {
      Prop: prop.name.replace('options.', ''),
      Type: createLink(prop.type),
      Default: defaultVal,
      Description: createLink(prop.description.children[0].children[0])
    }
  })
  return outParams
}

function concatTags (inNode) {
  if (!inNode) return false
  let outDescr = inNode.map(node => {
    if (node.children) {
      return createLink(node.children[0])
    }
    return node.value
  })
  outDescr = outDescr.join(' ').replace(' .', '.')
  if (outDescr === 'Optional parameters') outDescr = outDescr.concat(': see below')
  return outDescr
}

function getType (inNode) {
  if (!inNode) return false
  return createLink(inNode)
}

Object.keys(docs.paths).forEach(name => {
  docs.paths[name.toUpperCase()] = docs.paths[name]
})

function getLink (name) {
  return docs.paths[name.toUpperCase()] || null
}

function createLink (node) {
  let name
  switch (node.type) {
    case 'text':
      name = node.value
      break
    case 'AllLiteral':
      name = '*'
      break
    case 'NameExpression':
      name = node.name
      break
    case 'UndefinedLiteral':
      name = 'undefined'
      break
    case 'NullLiteral':
      name = 'null'
      break
    case 'RestType':
      return `...${createLink(node.expression)}`
    case 'TypeApplication':
      return `${createLink(node.expression)} <${node.applications.map(application => createLink(application)).join('|')}>`
    case 'OptionalType':
      return `(${createLink(node.expression)})`
    case 'UnionType':
      return `(${node.elements.map(element => createLink(element)).join('|')})`
    default:
      console.log(node)
      throw new Error(node + ' not supported')
  }
  const link = getLink(name)
  if (link === null) return name
  return `<a target="_blank" href="${link}">${name}</a>`
}
