const path = require('path')
const config = path.resolve('./webpack.config.js')
const Compiler = require('./lib/compiler.js')

const compiler = new Compiler(config)
compiler.run()