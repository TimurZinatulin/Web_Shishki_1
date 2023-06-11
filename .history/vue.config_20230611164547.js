const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    // can be string or regex
    'my-dep',
  ]
})
