'use strict'

var atomify = require('atomify')
  , path = require('path')
  , fs = require('fs')
  , React = require('react')
  , babel = require('babel-core')
  , cwd = process.cwd()
  , internals = {}

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
      babel.transformFile(jsComponent, function es5dTheCode (err, result){
        var reactComponent
          // be sure to include the body tag so that the livereload snipped can
          // be inserted
          , html = '<body>'

        if (err) return void callback(err)

        // we'll get back a string of JS that needs to be run here, so … eval it
        /* eslint-disable no-eval */
        reactComponent = eval(result.code
        /* eslint-enable no-eval */
          // FIXME: OMG this is hacky. like… really bad. There might be a better
          // way to do this by deleting the jsComponent from the require.cache
          // and requring the file each time with the babel require hook in
          // place… but I'm not sure if that's better or not.

          // get node modules relative to the current working directory
          .replace(/require\((['"])([A-z])/g, 'require($1' + path.join(cwd, '/node_modules') + '/$2')
          // get modules relative to the component
          .replace(/require\((['"])([.])/g, 'require($1' + path.dirname(jsComponent) + '/$2')
        )

        if (paths.css) html += '<link rel="stylesheet" href="' + paths.css + '" />'
        html += '<div id="app">' + React.renderToString(React.createElement(reactComponent)) + '</div>'
        if (paths.js && options.enableClientJSX) html += '<script src="' + paths.js + '"></script>'
        html += '</body>'

        callback(null, html)
      })
    }
  }

  atomify(config)
}
