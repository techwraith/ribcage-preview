#!/usr/bin/env node
'use strict'

var server = require('../index.js')
  , minimist = require('minimist')
  , args = minimist(process.argv.slice(2))
  , path = require('path')

server({
  dir: path.join(process.cwd(), args._[0])
  , debug: args.d || args.debug
  , enableClientJSX: args.s || args['client-jsx']
})
