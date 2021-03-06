'use strict'

const requireDirectory = require('require-directory')
const camelCase = require('lodash/fp/camelCase')

module.exports = requireDirectory(module, {
  rename: camelCase
})
