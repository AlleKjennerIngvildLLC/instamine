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

var _MinerMenu = require('./MinerMenu');

var _MinerMenu2 = _interopRequireDefault(_MinerMenu);

var _Statistics = require('./Statistics');

var _Statistics2 = _interopRequireDefault(_Statistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);
    return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));
  }

  (0, _createClass3.default)(Home, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'pane-group' },
        _react2.default.createElement(
          'div',
          {
            className: 'pane-sm',
            style: {
              color: 'white',
              maxWidth: '300px',
              minWidth: '300px',
              background: '#426397'
            } },
          _react2.default.createElement(_MinerMenu2.default, {
            settings: this.props.miner.settings,
            status: this.props.miner.status,
            stopMiner: this.props.stopMiner,
            startMiner: this.props.startMiner })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'pane',
            style: {
              overflow: 'hidden',

              borderColor: 'rgb(14, 49, 105)',
              color: 'white',
              backgroundSize: 'cover',
              backgroundImage: 'url("./background.png")'
            } },
          _react2.default.createElement(_Statistics2.default, { miner: this.props.miner })
        )
      );
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;
//# sourceMappingURL=Home.js.map