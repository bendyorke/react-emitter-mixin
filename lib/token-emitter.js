"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fbemitter = require('fbemitter');

var TokenEventEmitter = (function (_EventEmitter) {
  _inherits(TokenEventEmitter, _EventEmitter);

  function TokenEventEmitter() {
    _classCallCheck(this, TokenEventEmitter);

    _get(Object.getPrototypeOf(TokenEventEmitter.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(TokenEventEmitter, [{
    key: "createToken",
    value: function createToken(_ref) {
      var on = _ref.on;
      var perform = _ref.perform;
      var _ref$subscription = _ref.subscription;
      var subscription = _ref$subscription === undefined ? "addListener" : _ref$subscription;

      var token = perform ? this[subscription](on, perform) : { remove: function remove() {} };
      return token;
    }
  }, {
    key: "refreshCloseToken",
    value: function refreshCloseToken(event) {
      var _this = this;

      var token = event + "CloseToken";
      if (this[token]) this[token].remove();
      this[token] = this.createToken({
        on: event,
        perform: function perform() {
          return _get(Object.getPrototypeOf(TokenEventEmitter.prototype), "emit", _this).call(_this, event + "Close");
        },
        subscription: "once"
      });
    }
  }, {
    key: "decoratedEmit",
    value: function decoratedEmit(event) {
      var _this2 = this;

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      };
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _get2;

      _get(Object.getPrototypeOf(TokenEventEmitter.prototype), "emit", this).call(this, event + "Open");
      this.refreshCloseToken(event);

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_get2 = _get(Object.getPrototypeOf(TokenEventEmitter.prototype), "emit", this)).call.apply(_get2, [this, event].concat(args));
    }
  }]);

  return TokenEventEmitter;
})(_fbemitter.EventEmitter);

exports.TokenEventEmitter = TokenEventEmitter;