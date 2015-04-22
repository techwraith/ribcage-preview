'use strict'

var atomify = require('atomify')
  , path = require('path')
  , fs = require('fs')
  , React = require('react')
  , prettyError = require('prettify-error')
  , internals = {}

require('babel/register')

internals.findFirstFile = function findFirstFile (dir, filenames){
  var entryPath
    , i
    , l

  for (i = 0, l = filenames.length; i < l; i++){
    entryPath = path.join(dir, filenames[i])
    if (fs.existsSync(entryPath)){
      return entryPath
    }
  }
}

internals.findEntryJs = function findEntryJs (dir){
  return internals.findFirstFile(dir, ['entry.js', 'entry.jsx', 'index.js', 'index.jsx'])
}

internals.findEntryCss = function findEntryCss (dir){
  return internals.findFirstFile(dir, ['entry.css', 'index.css'])
}

internals.findEntryHTML = function findEntryHTML (dir){
  return internals.findFirstFile(dir, ['entry.html', 'index.html'])
}

internals.findEntryData = function findEntryHTML (dir){
  return internals.findFirstFile(dir, ['data.js', 'data.json', 'entry.json'])
}

internals.htmlifyError = function htmlifyError (err){
  return '<h1 style="color: red; background: yellow">' + err.message + '</h1>'
    + '<ul style="list-style: none; padding: 0; margin: 0">'
    + err.stack.split('\n').map(function eachLine (line){
      return '<li>' + line.trim() + '</li>'
    })
    + '</ul>'
}

module.exports = function ribcagePreview (options) {
  var config = {
      server: {
        lr: {
          port: 4001
        }
      , port: 4000
      }
    }
    , exampleDir = path.join(options.dir, 'example')
    , cssEntry = internals.findEntryCss(exampleDir)
    , jsEntry = internals.findEntryJs(exampleDir)
    , htmlEntry = internals.findEntryHTML(exampleDir)
    , jsComponent = internals.findEntryJs(options.dir)
    , dataEntry = internals.findEntryData(exampleDir)

  if (cssEntry) {
    config.css = {
      entry: cssEntry
    , alias: '/bundle.css'
    , debug: options.debug
    , autoprefixer: typeof options.autoprefix === 'undefined' ? true : options.autoprefix
    }
  }

  if (jsEntry) {
    config.js = {
      entry: jsEntry
    , alias: '/bundle.js'
    , debug: options.debug
    }
  }

  if (htmlEntry) {
    config.server.html = htmlEntry
  }

  if (jsEntry.indexOf('.jsx') > -1) {
    config.server.html = function defaultHtml (paths, callback){
      var reactComponent
        // be sure to include the body tag so that the livereload snipped can
        // be inserted
        , html = '<body>'
        , reactComponentHTML
        , data

      if (dataEntry) {
        delete require.cache[dataEntry]
        data = require(dataEntry)
      }

      delete require.cache[jsComponent]

      try {
        reactComponent = require(jsComponent)
        reactComponentHTML = React.renderToString(React.createElement(reactComponent, data))
      }
      catch (err) {
        console.error(prettyError(err))
        reactComponentHTML = internals.htmlifyError(err)
      }

      if (paths.css) html += '<link rel="stylesheet" href="' + paths.css + '" />'
      html += '<div id="app">' + reactComponentHTML + '</div>'
      if (paths.js && options.enableClientJSX) html += '<script src="' + paths.js + '"></script>'
      html += '</body>'

      callback(null, html)
    }
  }

  atomify(config)
}
