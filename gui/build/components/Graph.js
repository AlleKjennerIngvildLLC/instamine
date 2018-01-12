'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _reactSparklines = require('react-sparklines');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graph = function (_Component) {
    (0, _inherits3.default)(Graph, _Component);

    function Graph(props) {
        (0, _classCallCheck3.default)(this, Graph);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Graph.__proto__ || (0, _getPrototypeOf2.default)(Graph)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(Graph, [{
        key: 'render',
        value: function render() {
            var _ref;

            var values = this.props.hashrates.map(function (r) {
                return r.hashrates.reduce(function (sum, x) {
                    return sum + x;
                });
            });

            return _react2.default.createElement(
                'div',
                {
                    style: (_ref = {
                        border: 'solid',
                        borderColor: 'black'
                    }, (0, _defineProperty3.default)(_ref, 'border', 'solid'), (0, _defineProperty3.default)(_ref, 'background', 'white'), _ref) },
                _react2.default.createElement(
                    _reactSparklines.Sparklines,
                    {
                        data: values,
                        limit: 50,
                        width: 100,
                        height: 20,
                        style: {
                            marginTop: '30px',
                            marginBottom: '-8px'
                        } },
                    _react2.default.createElement(_reactSparklines.SparklinesReferenceLine, { type: 'median' }),
                    _react2.default.createElement(_reactSparklines.SparklinesLine, {
                        style: {
                            strokeWidth: '0.5',
                            marginBottom: '0px'
                        },
                        color: 'black' })
                )
            );
        }
    }]);
    return Graph;
}(_react.Component);

exports.default = Graph;