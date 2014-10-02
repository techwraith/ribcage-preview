'use strict';

var atomify = require('atomify')
  , path = require('path')
  , os = require('os')

module.exports = function (dir, ext) {
  ext || (ext = {})
  ext.js || (ext.js = 'js')
  ext.css || (ext.css = 'css')

  var transforms = []

  // atomify doesn't yet support reactify
  if (ext.js === 'jsx')
    transforms.push(['reactify', {'es6': true}])

  atomify({
    server: {
      lr: {
        patterns: [dir + '/**']
      , port: 4001
      }
    , port: 4000
    , url: 'http://' + os.hostname() + '.local'
    }
  , css: {
      entry: path.join(dir, 'example/entry.' + ext.css)
    , alias: '/bundle.css'
    , debug: true
    }
  , js: {
      entry: path.join(dir, 'example/entry.' + ext.js)
    , alias: '/bundle.js'
    , debug: true
    , transforms: transforms
    }
  })
}
