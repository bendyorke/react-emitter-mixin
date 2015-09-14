'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _pascalizeJs = require('./pascalize.js');

var _emitterJs = require('./emitter.js');

var EventMixin = {
  subscribe: function subscribe() {
    for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
      events[_key] = arguments[_key];
    }

    var _EventMixin$_filterParams = EventMixin._filterParams(events);

    var events = _EventMixin$_filterParams.events;
    var emitter = _EventMixin$_filterParams.emitter;

    return {
      componentWillMount: function componentWillMount() {
        var _this = this;

        this.emitter = emitter || this.emitter || this.props.emitter || new _emitterJs.TokenEventEmitter();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var event = _step.value;

            var emission = 'emit' + (0, _pascalizeJs.pascalize)(event);
            this[emission] = this.emitter.decoratedEmit(event);
            this.emitterTokens = _extends({}, this.emitterTokens, EventMixin._generateTokens.call(this, event));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!this.removeEmitterTokens) {
          this.removeEmitterTokens = function () {
            Object.keys(_this.emitterTokens).forEach(function (key) {
              _this.emitterTokens[key].remove();
            });
          };
        }
      },

      componentWillUnmount: function componentWillUnmount() {
        if (this.emitterTokens) {
          this.removeEmitterTokens();
          this.emitterTokens = null;
        }
      }
    };
  },

  _filterParams: function _filterParams(args) {
    function isType(arg, type) {
      return arg && typeof arg === type;
    }

    return {
      events: args.filter(function (arg) {
        return isType(arg, 'string');
      }),
      emitter: args.find(function (arg) {
        return isType(arg, 'object');
      })
    };
  },

  _generateTokens: function _generateTokens(event) {
    var _this2 = this;

    var pascalEvent = (0, _pascalizeJs.pascalize)(event);
    var createToken = this.emitter.createToken.bind(this.emitter);
    return [[event + 'Open', 'before' + pascalEvent], ['' + event, 'on' + pascalEvent], [event + 'Close', 'after' + pascalEvent]].reduce(function (memo, _ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var event = _ref2[0];
      var listener = _ref2[1];

      return _extends({}, memo, _defineProperty({}, event + "Token", createToken({ on: event, perform: _this2[listener] })));
    }, {});
  }
};
exports.EventMixin = EventMixin;