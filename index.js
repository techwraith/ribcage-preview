var atomify = require('atomify')
  , path = require('path')
  , os = require('os')

module.exports = function (dir) {
  atomify({
    server: {
      lr: {
        patterns: [dir + '/**']
      , port: 4001
      }
    , port: 4000
    , url: os.hostname()
    }
  , css: {
      entry: path.join(dir, 'example/entry.css')
    , alias: '/bundle.css'
    , debug: true
    }
  , js: {
      entry: path.join(dir, 'example/entry.js')
    , alias: '/bundle.js'
    , debug: true
    }
  })
}
