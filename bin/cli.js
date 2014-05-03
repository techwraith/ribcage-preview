#!/usr/bin/env node

var server = require('../index.js')
  , path = require('path')

server(path.join(process.cwd(), process.argv[2]))
