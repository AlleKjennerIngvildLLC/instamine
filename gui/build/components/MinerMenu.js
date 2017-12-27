'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _rebass = require('rebass');

var _MinerItem = require('./MinerItem');

var _MinerItem2 = _interopRequireDefault(_MinerItem);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MinerMenu = function (_Component) {
    (0, _inherits3.default)(MinerMenu, _Component);

    function MinerMenu(props) {
        (0, _classCallCheck3.default)(this, MinerMenu);
        return (0, _possibleConstructorReturn3.default)(this, (MinerMenu.__proto__ || (0, _getPrototypeOf2.default)(MinerMenu)).call(this, props));
    }

    (0, _createClass3.default)(MinerMenu, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'menu' },
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: '20px',
                            marginBottom: '30px'
                        },
                        className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-offset-1 col-sm-10' },
                        _react2.default.createElement(
                            _rebass.Border,
                            { py: 1, top: true, bottom: true },
                            'Currencies'
                        )
                    )
                ),
                _react2.default.createElement(_MinerItem2.default, (0, _extends3.default)({
                    is: 'div',
                    className: 'row',
                    name: 'Monero (CPU)',
                    settingsRoute: '/settings/MoneroCPU',
                    running: this.props.status.running,
                    image: './xmr.png'
                }, this.props)),
                _react2.default.createElement(_MinerItem2.default, (0, _extends3.default)({
                    is: 'div',
                    disabled: true,
                    className: 'row',
                    name: 'Monero (NVIDIA)',
                    settingsRoute: '/settings/MoneroCPU',
                    running: this.props.status.running,
                    image: './xmr.png'
                }, this.props)),
                _react2.default.createElement(_MinerItem2.default, (0, _extends3.default)({
                    is: 'div',
                    className: 'row',
                    name: 'Bitcoin (BTC)',
                    disabled: true,
                    image: './bitcoin.png'
                }, this.props)),
                _react2.default.createElement(_MinerItem2.default, (0, _extends3.default)({
                    is: 'div',
                    className: 'row',
                    name: 'Ethereum (ETH)',
                    disabled: true,
                    image: './eth.png'
                }, this.props)),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: '380px',
                            height: '400px'
                        },
                        className: 'logo' },
                    _react2.default.createElement(_rebass.Image, {
                        style: {
                            marginTop: '200px',
                            marginLeft: '35%',
                            height: '80px'
                        },
                        src: './logo.png' })
                )
            );
        }
    }]);
    return MinerMenu;
}(_react.Component);

exports.default = MinerMenu;
//# sourceMappingURL=MinerMenu.js.map