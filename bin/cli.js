#!/usr/bin/env node
'use strict'

var server = require('../index.js')
  , minimist = require('minimist')
  , args = minimist(process.argv.slice(2), {
    boolean: ['s', 'client-jsx', 'r', 'react-router', 'no-debug']
  })
  , path = require('path')
  , fs = require('fs')
  , cwd = process.cwd()
  , dir = path.join(cwd, args._[0])

if (!fs.statSync(dir).isDirectory()) throw new Error('Must pass a directory')
if (!fs.existsSync(path.join(cwd, 'node_modules'))) throw new Error('Must be run from a directory with `node_modules`')

server({
  dir: dir
  , debug: !args['no-debug']
  , enableClientJSX: args.s || args['client-jsx']
  , enableReactRouter: args.r || args['react-router']
  , autoprefix: typeof args.autoprefix === 'undefined' ? args.autoprefix : true
})
