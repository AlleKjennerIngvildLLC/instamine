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

var _rebass = require('rebass');

var _reactRouterRedux = require('react-router-redux');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MinerItem = function (_Component) {
    (0, _inherits3.default)(MinerItem, _Component);

    function MinerItem(props) {
        (0, _classCallCheck3.default)(this, MinerItem);
        return (0, _possibleConstructorReturn3.default)(this, (MinerItem.__proto__ || (0, _getPrototypeOf2.default)(MinerItem)).call(this, props));
    }

    (0, _createClass3.default)(MinerItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var settings = this.props.settings;

            var startButton = _react2.default.createElement(
                _rebass.Button,
                { disabled: this.props.disabled, onClick: function onClick() {

                        if (settings.walletAddress === "") {
                            _this2.props.history.push('/settings');
                        } else {
                            _this2.props.startMiner(settings.config, settings.enableGPU);
                        }
                    } },
                'Start'
            );

            var stopButton = _react2.default.createElement(
                _rebass.Button,
                { disabled: this.props.disabled, onClick: this.props.stopMiner },
                'Stop'
            );

            var button = startButton;

            if (this.props.running) {
                button = stopButton;
            }

            return _react2.default.createElement(
                'div',
                {
                    style: {
                        background: 'rgb(57, 73, 109)'
                    },

                    className: 'row' },
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: '3px',
                            marginLeft: '8px'
                        },
                        className: 'col-sm-2' },
                    _react2.default.createElement(_rebass.Avatar, { size: 32, style: {
                            background: 'white'
                        }, src: this.props.image })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginLeft: '5px'
                        },
                        className: 'col-sm-4' },
                    _react2.default.createElement(
                        _rebass.Text,
                        { fontSize: 14 },
                        this.props.name
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: '5px'
                        },
                        className: 'col-sm-2' },
                    button
                )
            );
        }
    }]);
    return MinerItem;
}(_react.Component);

;

exports.default = (0, _reactRouterDom.withRouter)(MinerItem);