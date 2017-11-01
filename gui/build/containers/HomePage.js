'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _Home = require('../components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _miner = require('../actions/miner');

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return { miner: state.miner };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {

  var miner = (0, _redux.bindActionCreators)(_miner2.default, dispatch);
  return {

    startMiner: function startMiner(config) {
      miner.start(config);
    },

    stopMiner: function stopMiner() {
      miner.stop();
    },

    reportStatus: function reportStatus() {
      miner.systemStatus();
    },

    systemStatus: function systemStatus() {},

    sagaReport: function sagaReport() {
      dispatch({ type: 'START_STATUS_REQUEST_SAGA' });
    }

  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Home2.default);
//# sourceMappingURL=HomePage.js.map