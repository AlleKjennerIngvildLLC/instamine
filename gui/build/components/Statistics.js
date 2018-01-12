'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Graph = require('./Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _EventTable = require('./EventTable');

var _EventTable2 = _interopRequireDefault(_EventTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Statistics = function (_Component) {
    (0, _inherits3.default)(Statistics, _Component);

    function Statistics() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Statistics);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Statistics.__proto__ || (0, _getPrototypeOf2.default)(Statistics)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            hideEvents: false
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Statistics, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var statistics = this.props.miner.statistics;
            var ping = 'N/A';
            var sparklines = void 0;
            var n_threads = 'N/A';
            var poolAddress = void 0;
            var totalHashrate = 'N/A';
            var lastRate = 'N/A';

            if (statistics !== undefined) {

                if (ping !== 0) {
                    ping = ping + ' ms';
                }

                n_threads = statistics.n_threads;
                poolAddress = statistics.poolAddress;

                sparklines = _react2.default.createElement(_Graph2.default, { hashrates: this.props.miner.hashrates });

                var totalRates = _lodash2.default.map(this.props.miner.hashrates, function (entry) {
                    return _lodash2.default.sum(entry.hashrates);
                });

                totalHashrate = _lodash2.default.mean(totalRates).toFixed(1);
                lastRate = _lodash2.default.last(totalRates).toFixed(1);
            }

            var eventTable = void 0;

            if (this.state.hideEvents) {
                eventTable = '';
            } else {
                eventTable = _react2.default.createElement(_EventTable2.default, { events: this.props.miner.eventHistory });
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'heading' },
                    _react2.default.createElement(
                        'div',
                        {
                            style: {
                                marginTop: '10px'
                            },
                            className: 'row center-sm' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'box' },
                                _react2.default.createElement(
                                    _rebass.PanelHeader,
                                    { fontSize: 3 },
                                    'Miner Statistics'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            paddingLeft: '15px',
                            paddingTop: '50px',
                            overflowX: 'hidden'
                        },
                        className: 'statistics' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-offset-1 col-sm-5' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    _rebass.Text,
                                    {
                                        style: {
                                            marginBottom: '0px'
                                        },
                                        bold: true,
                                        fontSize: 2 },
                                    'Mean hashrate: ' + totalHashrate
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    _rebass.Text,
                                    {
                                        style: {
                                            marginTop: '0px'
                                        },
                                        bold: true,
                                        fontSize: 2 },
                                    'Latest hashrate: ' + lastRate
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-5' },
                            _react2.default.createElement(
                                'div',
                                { className: 'box' },
                                sparklines
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-sm-2' })
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            style: {
                                marginTop: '40px'
                            },
                            className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'col-xs-offset-5 col-xs-5' },
                                    _react2.default.createElement(
                                        _rebass.Button,
                                        {
                                            style: { background: 'gray' },
                                            onClick: function onClick() {
                                                _this2.setState({
                                                    hideEvents: !_this2.state.hideEvents
                                                });
                                            } },
                                        this.state.hideEvents ? 'Show events' : 'Hide events'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: { marginTop: '10px' }, className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'col-xs-offset-1 col-xs-10' },
                                    eventTable
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return Statistics;
}(_react.Component);

exports.default = Statistics;