'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mixinJs = require('./mixin.js');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _mixinJs.EventMixin;
  }
});
Object.defineProperty(exports, 'EventMixin', {
  enumerable: true,
  get: function get() {
    return _mixinJs.EventMixin;
  }
});

var _emitterJs = require('./emitter.js');

Object.defineProperty(exports, 'EventEmitter', {
  enumerable: true,
  get: function get() {
    return _emitterJs.TokenEventEmitter;
  }
});

var _pascalizeJs = require('./pascalize.js');

Object.defineProperty(exports, 'pascalize', {
  enumerable: true,
  get: function get() {
    return _pascalizeJs.pascalize;
  }
});