#!/usr/bin/env node

var server = require('../index.js')
  , path = require('path')
  , argv = require('minimist')(process.argv.slice(2))
  , jsExt = argv.js
  , cssExt = argv.css

server(path.join(process.cwd(), argv._[0]), {js: jsExt, css: cssExt})
