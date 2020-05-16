'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://api-node.tony93-dev.top"'
  BASE_URL: '"https://api-node.tony93.top"'
})
