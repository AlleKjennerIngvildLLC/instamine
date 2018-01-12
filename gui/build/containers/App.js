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

var _electron = require('electron');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _redux = require('redux');

var _rebass = require('rebass');

var _reactNotificationSystemRedux = require('react-notification-system-redux');

var _reactNotificationSystemRedux2 = _interopRequireDefault(_reactNotificationSystemRedux);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _Header = require('../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _miner = require('../actions/miner');

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return { miner: state.miner, notifications: state.notifications };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  var miner = (0, _redux.bindActionCreators)(_miner2.default, dispatch);
  return {
    systemStatus: function systemStatus() {
      miner.systemStatus();
    },
    stopMiner: function stopMiner() {
      miner.stop();
    }
  };
};

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this.close = function () {

      _this.props.stopMiner();
      _electron.remote.getCurrentWindow().close();
    };

    _this.minimize = function () {
      _electron.remote.getCurrentWindow().minimize();
    };

    _this.toggleMaximize = function () {

      var currentWindow = _electron.remote.getCurrentWindow();
      if (_this.state.isMaximized) {
        currentWindow.unmaximize();
      } else {
        currentWindow.maximize();
      }

      _this.setState({
        isMaximized: !_this.state.isMaximized
      });
    };

    _this.state = {
      isMaximized: false
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.systemStatus();
    }
  }, {
    key: 'render',
    value: function render() {
      var notifications = this.props.notifications;

      //Optional styling

      var style = {
        NotificationItem: { // Override the notification item
          DefaultStyle: { // Applied to every notification, regardless of the notification level
            margin: '10px 5px 2px 1px'
          },

          success: { // Applied only to the success notification item
            color: 'red'
          }
        }
      };

      return _react2.default.createElement(
        _rebass.Provider,
        { theme: _theme2.default },
        _react2.default.createElement(
          'div',
          { className: 'window' },
          _react2.default.createElement(_Header2.default, { minimize: this.minimize, close: this.close, miner: this.props.miner }),
          _react2.default.createElement(
            'div',
            { style: { overflow: 'hidden' }, className: 'window-content' },
            this.props.children
          ),
          _react2.default.createElement(
            'footer',
            { className: 'toolbar toolbar-footer' },
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Instamine'
            )
          ),
          _react2.default.createElement(_reactNotificationSystemRedux2.default, {
            notifications: notifications,
            style: style
          })
        )
      );
    }
  }]);
  return App;
}(_react.Component);

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App));