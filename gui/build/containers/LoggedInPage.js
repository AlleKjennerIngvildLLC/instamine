'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _LoggedIn = require('../components/LoggedIn');

var _LoggedIn2 = _interopRequireDefault(_LoggedIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  // eslint-disable-line no-unused-vars
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_LoggedIn2.default);
//# sourceMappingURL=LoggedInPage.js.map