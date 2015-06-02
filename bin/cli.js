#!/usr/bin/env node
'use strict'

var server = require('../index.js')
  , yargs = require('yargs')
  , pkg = require('../package.json')
  , cwd = process.cwd()
  , fs = require('fs')
  , path = require('path')
  , chalk = require('chalk')
  , dir
  , args = yargs
    .usage('$0 <directory> [-sr] [--no-debug] [--react-router] [--client-jsx]')
    .demand(1, chalk.red('Pass a directory'))
    .describe({
      s: chalk.yellow('Only applies to .jsx!') + ' Serve the client-side js. By default, jsx is only rendered on the server.'
      , r: chalk.yellow('Only applies to .jsx!') + ' Enable the react-router. You must set your index file to pass a Route component.'
      , 'no-debug': 'Disables sourcemaps.'
    })
    .alias({
      h: 'help'
      , r: 'react-router'
      , s: 'client-jsx'
    })
    .default({
      _: [cwd]
    })
    .check(function check (argv) {
      var passedDir = argv._[0]
      dir = path.join(cwd, passedDir || '')
      if (!fs.statSync(dir).isDirectory()) {
        return chalk.red('Pass a directory')
      }
      else if (!fs.existsSync(path.join(cwd, 'node_modules'))) {
        return chalk.red('Must be run from a directory with `node_modules`')
      }
      else return true
    })
    .help('h')
    .epilog('License: ' + pkg.license)
    .version(pkg.version)
    .showHelpOnFail(false, 'Pass --help for available options')
    .argv

server({
  dir: dir
  , debug: !args['no-debug']
  , enableClientJSX: args.s || args['client-jsx']
  , enableReactRouter: args.r || args['react-router']
  , autoprefix: typeof args.autoprefix === 'undefined' ? args.autoprefix : true
})
