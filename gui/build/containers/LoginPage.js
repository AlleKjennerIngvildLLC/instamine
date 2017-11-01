'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _Login = require('../components/Login');

var _Login2 = _interopRequireDefault(_Login);

var _user = require('../actions/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  var user = (0, _redux.bindActionCreators)(_user2.default, dispatch);
  return {
    onLogin: function onLogin(data) {
      user.login(data);
      dispatch((0, _reactRouterRedux.push)('/loggedin'));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Login2.default);
//# sourceMappingURL=LoginPage.js.map