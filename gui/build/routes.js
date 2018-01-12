'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterTransition = require('react-router-transition');

var _HomePage = require('./containers/HomePage');

var _HomePage2 = _interopRequireDefault(_HomePage);

var _SettingsPage = require('./containers/SettingsPage');

var _SettingsPage2 = _interopRequireDefault(_SettingsPage);

var _MoneroCPUSettingsPage = require('./containers/MoneroCPUSettingsPage');

var _MoneroCPUSettingsPage2 = _interopRequireDefault(_MoneroCPUSettingsPage);

var _MoneroNVIDIASettingsPage = require('./containers/MoneroNVIDIASettingsPage');

var _MoneroNVIDIASettingsPage2 = _interopRequireDefault(_MoneroNVIDIASettingsPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouterTransition.AnimatedSwitch,
  {
    atEnter: { opacity: 0 },
    atLeave: { opacity: 0 },
    atActive: { opacity: 1 },
    className: 'switch-wrapper'
  },
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _HomePage2.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/settings/MoneroCPU', component: _MoneroCPUSettingsPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/settings/MoneroNVIDIA', component: _MoneroNVIDIASettingsPage2.default })
);