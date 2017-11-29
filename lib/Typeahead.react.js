'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Overlay = require('./Overlay.react');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _TypeaheadInput = require('./TypeaheadInput.react');

var _TypeaheadInput2 = _interopRequireDefault(_TypeaheadInput);

var _TypeaheadMenu = require('./TypeaheadMenu.react');

var _TypeaheadMenu2 = _interopRequireDefault(_TypeaheadMenu);

var _typeaheadContainer = require('./containers/typeaheadContainer');

var _typeaheadContainer2 = _interopRequireDefault(_typeaheadContainer);

var _utils = require('./utils/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Typeahead = function (_React$Component) {
    _inherits(Typeahead, _React$Component);

    function Typeahead() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Typeahead);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call.apply(_ref, [this].concat(args))), _this), _this._renderMenu = function (results, shouldPaginate, menuVisible) {
            var _this$props = _this.props,
                align = _this$props.align,
                bodyContainer = _this$props.bodyContainer,
                className = _this$props.className,
                dropup = _this$props.dropup,
                emptyLabel = _this$props.emptyLabel,
                labelKey = _this$props.labelKey,
                maxHeight = _this$props.maxHeight,
                newSelectionPrefix = _this$props.newSelectionPrefix,
                onMenuHide = _this$props.onMenuHide,
                onMenuShow = _this$props.onMenuShow,
                onPaginate = _this$props.onPaginate,
                paginationText = _this$props.paginationText,
                renderMenu = _this$props.renderMenu,
                renderMenuItemChildren = _this$props.renderMenuItemChildren,
                text = _this$props.text;


            var menuProps = {
                align: align,
                dropup: dropup,
                emptyLabel: emptyLabel,
                labelKey: labelKey,
                maxHeight: maxHeight,
                newSelectionPrefix: newSelectionPrefix,
                paginationText: paginationText,
                onPaginate: onPaginate,
                paginate: shouldPaginate,
                text: text
            };

            var menu = typeof renderMenu === 'function' ? renderMenu(results, menuProps) : _react2.default.createElement(_TypeaheadMenu2.default, _extends({}, menuProps, {
                options: results,
                renderMenuItemChildren: renderMenuItemChildren
            }));

            return _react2.default.createElement(
                _Overlay2.default,
                {
                    align: align,
                    className: className,
                    container: bodyContainer ? document.body : _this,
                    dropup: dropup,
                    onMenuHide: onMenuHide,
                    onMenuShow: onMenuShow,
                    show: menuVisible,
                    target: _this },
                menu
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Typeahead, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var allowNew = nextProps.allowNew,
                onInitialItemChange = nextProps.onInitialItemChange,
                onResultsChange = nextProps.onResultsChange,
                results = nextProps.results;

            // Clear the initial item when there are no results.

            if (!(allowNew || results.length)) {
                onInitialItemChange(null);
            }

            if (results.length !== this.props.results.length) {
                onResultsChange(results);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                allowNew = _props.allowNew,
                className = _props.className,
                dropup = _props.dropup,
                emptyLabel = _props.emptyLabel,
                labelKey = _props.labelKey,
                minLength = _props.minLength,
                onInputChange = _props.onInputChange,
                _onKeyDown = _props.onKeyDown,
                onSelectionAdd = _props.onSelectionAdd,
                onSelectionRemove = _props.onSelectionRemove,
                paginate = _props.paginate,
                showMenu = _props.showMenu,
                shownResults = _props.shownResults,
                text = _props.text;


            var results = this.props.results.slice();

            // This must come before we truncate.
            var shouldPaginate = paginate && results.length > shownResults;

            // Truncate if necessary.
            results = (0, _utils.getTruncatedOptions)(results, shownResults);

            // Add the custom option.
            if (allowNew) {
                results = (0, _utils.addCustomOption)(results, text, labelKey);
            }

            var menuVisible = !!(showMenu && text.length >= minLength && (results.length || emptyLabel !== ''));

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)('rbt', 'open', 'clearfix', { 'dropup': dropup }, className),
                    style: { position: 'relative' },
                    tabIndex: -1 },
                _react2.default.createElement(_TypeaheadInput2.default, _extends({}, this.props, {
                    onAdd: onSelectionAdd,
                    onChange: onInputChange,
                    onKeyDown: function onKeyDown(e) {
                        return _onKeyDown(results, e);
                    },
                    onRemove: onSelectionRemove,
                    options: results,
                    ref: function ref(input) {
                        return _this2._input = input;
                    }
                })),
                this._renderMenu(results, shouldPaginate, menuVisible),
                _react2.default.createElement(
                    'div',
                    {
                        'aria-atomic': true,
                        'aria-live': 'polite',
                        className: 'sr-only rbt-sr-status',
                        role: 'status' },
                    (0, _utils.getAccessibilityStatus)(results, menuVisible, this.props)
                )
            );
        }
    }, {
        key: 'getInputNode',
        value: function getInputNode() {
            return this._input.getInputNode();
        }
    }]);

    return Typeahead;
}(_react2.default.Component);

exports.default = (0, _typeaheadContainer2.default)(Typeahead);