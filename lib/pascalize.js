'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var pascalize = function pascalize(string) {
  return (0, _lodash.capitalize)((0, _lodash.camelCase)(string));
};

exports['default'] = pascalize;
exports.pascalize = pascalize;