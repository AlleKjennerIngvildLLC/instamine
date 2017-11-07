'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Settings = require('../components/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _miner = require('../actions/miner');

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {

  return { settings: state.miner.settings };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  var miner = (0, _redux.bindActionCreators)(_miner2.default, dispatch);
  return {
    updateSettings: miner.updateSettings
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Settings2.default);