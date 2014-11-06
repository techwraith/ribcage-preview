var atomify = require('atomify')
  , path = require('path')
  , os = require('os')

module.exports = function (dir) {
  var hostname = os.hostname()

  // hack--because sometimes hostnames end in .local and sometimes they don't...
  if (hostname.slice(-1 * '.local'.length) !== '.local')
    hostname = hostname + '.local'

  atomify({
    server: {
      lr: {
        patterns: [dir + '/**']
      , port: 4001
      }
    , port: 4000
    , url: 'http://' + os.hostname()
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
