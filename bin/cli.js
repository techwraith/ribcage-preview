#!/usr/bin/env node
'use strict'

var server = require('../index.js')
  , minimist = require('minimist')
  , args = minimist(process.argv.slice(2), {
    boolean: ['s', 'client-jsx', 'r', 'react-router', 'no-debug']
  })
  , path = require('path')

server({
  dir: path.join(process.cwd(), args._[0])
  , debug: !args['no-debug']
  , enableClientJSX: args.s || args['client-jsx']
  , enableReactRouter: args.r || args['react-router']
  , autoprefix: typeof args.autoprefix === 'undefined' ? args.autoprefix : true
})
