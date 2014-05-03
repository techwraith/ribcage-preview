var atomify = require('atomify')
  , path = require('path')

module.exports = function (dir) {
  atomify({
    server: {
      lr: {
        patterns: [dir + '/**']
      , port: 4001
      }
      , port: 4000
    }
  , css: {
      entry: path.join(dir, 'example/entry.css')
    , debug: true
    }
  , js: {
      entry: path.join(dir, 'example/entry.js')
    , debug: true
    }
  })
}
