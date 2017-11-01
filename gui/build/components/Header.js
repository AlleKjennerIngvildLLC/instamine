'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_Component) {
    (0, _inherits3.default)(Header, _Component);

    function Header(props) {
        (0, _classCallCheck3.default)(this, Header);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(Header, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'header',
                {
                    className: 'toolbar toolbar-header',
                    style: {
                        'WebkitAppRegion': 'drag',
                        'WebkitUserSelect': 'none'
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'toolbar-actions' },
                    _react2.default.createElement(
                        'div',
                        { className: 'btn-group' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-default', onClick: this.props.close },
                            _react2.default.createElement('span', { className: 'icon icon-cancel' })
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-default', onClick: this.props.minimize },
                            _react2.default.createElement('span', { className: 'icon icon-window' }),
                            _react2.default.createElement('span', null)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'btn-group' },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                _react2.default.createElement('span', { className: 'icon icon-home' })
                            )
                        ),
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/settings' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-default' },
                                _react2.default.createElement('span', { className: 'icon icon-folder' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default btn-dropdown pull-right' },
                        _react2.default.createElement('span', { className: 'icon icon-megaphone' })
                    )
                )
            );
        }
    }]);
    return Header;
}(_react.Component);

exports.default = Header;
//# sourceMappingURL=Header.js.map