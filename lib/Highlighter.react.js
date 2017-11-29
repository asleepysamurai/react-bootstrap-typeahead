'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stripDiacritics = require('./utils/stripDiacritics');

var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getMatchBoundaries(subject, search) {
  var matches = search.exec((0, _stripDiacritics2.default)(subject));
  if (matches) {
    return {
      first: matches.index,
      last: matches.index + matches[0].length
    };
  }
}

/**
 * Stripped-down version of https://github.com/helior/react-highlighter
 *
 * Results are already filtered by the time the component is used internally so
 * we can safely ignore case and diacritical marks for the purposes of matching.
 */

var Highlighter = function (_React$Component) {
  _inherits(Highlighter, _React$Component);

  function Highlighter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Highlighter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Highlighter.__proto__ || Object.getPrototypeOf(Highlighter)).call.apply(_ref, [this].concat(args))), _this), _this._count = 0, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Highlighter, [{
    key: 'render',
    value: function render() {
      var children = this.props.search ? this._renderHighlightedChildren() : this.props.children;

      return _react2.default.createElement(
        'span',
        null,
        children
      );
    }
  }, {
    key: '_renderHighlightedChildren',
    value: function _renderHighlightedChildren() {
      var children = [];
      var search = new RegExp((0, _escapeStringRegexp2.default)(this.props.search), 'i' // Case-insensitive
      );

      var remaining = this.props.children;

      while (remaining) {
        if (!search.test((0, _stripDiacritics2.default)(remaining))) {
          this._count++;
          children.push(_react2.default.createElement(
            'span',
            { key: this._count },
            remaining
          ));
          return children;
        }

        var boundaries = getMatchBoundaries(remaining, search);

        // Capture the string that leads up to a match...
        var nonMatch = remaining.slice(0, boundaries.first);
        if (nonMatch) {
          this._count++;
          children.push(_react2.default.createElement(
            'span',
            { key: this._count },
            nonMatch
          ));
        }

        // Now, capture the matching string...
        var match = remaining.slice(boundaries.first, boundaries.last);
        if (match) {
          this._count++;
          children.push(_react2.default.createElement(
            'mark',
            { className: 'rbt-highlight-text', key: this._count },
            match
          ));
        }

        // And if there's anything left over, recursively run this method again.
        remaining = remaining.slice(boundaries.last);
      }

      return children;
    }
  }]);

  return Highlighter;
}(_react2.default.Component);

Highlighter.propTypes = {
  children: _propTypes2.default.string.isRequired,
  search: _propTypes2.default.string.isRequired
};

exports.default = Highlighter;