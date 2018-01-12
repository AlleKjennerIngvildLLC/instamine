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

            var name = 'config-' + this.props.mode;
            var settings = this.props.settings[name];

            var disabled = this.props.disabled;
            var anotherActiveMiner = this.props.status.mode !== undefined && this.props.mode !== this.props.status.mode;

            disabled = disabled || anotherActiveMiner;

            var startButton = _react2.default.createElement(
                _rebass.Button,
                {
                    bg: 'blue',
                    color: 'white',
                    disabled: disabled,
                    onClick: function onClick() {
                        if (settings === undefined || settings.walletAddress === '') {
                            _this2.props.history.push(_this2.props.settingsRoute);
                        } else {
                            _this2.props.startMiner(settings.config, _this2.props.mode);
                        }
                    } },
                'Start'
            );

            var stopButton = _react2.default.createElement(
                _rebass.Button,
                { disabled: this.props.disabled, onClick: this.props.stopMiner },
                'Stop'
            );

            var settingsButton = _react2.default.createElement(
                _rebass.ButtonOutline,
                {
                    bg: 'blue',
                    color: 'white',
                    disabled: this.props.disabled,
                    onClick: function onClick() {
                        return _this2.props.history.push(_this2.props.settingsRoute);
                    } },
                'Settings'
            );

            var button = startButton;

            if (this.props.running && this.props.status.mode == this.props.mode) {
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
                            marginTop: '3px'
                        },
                        className: 'col-xs-2' },
                    _react2.default.createElement(_rebass.Avatar, {
                        size: 32,
                        style: {
                            marginLeft: '20px',
                            background: 'white'
                        },
                        src: this.props.image })
                ),
                _react2.default.createElement(
                    'div',
                    { style: {}, className: 'col-xs-3' },
                    _react2.default.createElement(
                        _rebass.Text,
                        {
                            style: {
                                marginLeft: '10px'
                            },
                            fontSize: 14 },
                        this.props.name
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: '5px'
                        },
                        className: 'col-xs-3' },
                    settingsButton
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: '5px',
                            marginLeft: '15px'
                        },
                        className: 'col-xs-2' },
                    button
                )
            );
        }
    }]);
    return MinerItem;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(MinerItem);
//# sourceMappingURL=MinerItem.js.map