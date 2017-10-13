const serve = require('serve')

const server = serve('./', {
  port: 8080,
  ignore: ['node_modules']
})