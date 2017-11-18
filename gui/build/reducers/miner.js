'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _handleActions;

var _reduxActions = require('redux-actions');

var _miner = require('../actions/miner');

var _miner2 = _interopRequireDefault(_miner);

var _reply = require('./reply');

var _reply2 = _interopRequireDefault(_reply);

var _connected = require('./connected');

var _connected2 = _interopRequireDefault(_connected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../rpc/messages_pb'),
    Event = _require.Event;

exports.default = (0, _reduxActions.handleActions)((_handleActions = {

  'START_MINER_START': function START_MINER_START(state, action) {
    return (0, _extends3.default)({}, state, { isStarting: true });
  },

  'START_MINER_SUCCEEDED': function START_MINER_SUCCEEDED(state, action) {
    return (0, _extends3.default)({}, state, { isStarting: false, status: { running: true } });
  },

  'START_MINER_FAILED': function START_MINER_FAILED(state, action) {
    return (0, _extends3.default)({}, state, { isStarting: false });
  },

  'START_MINER_END': function START_MINER_END(state, action) {
    return (0, _extends3.default)({}, state, { isStarting: false });
  }

}, (0, _defineProperty3.default)(_handleActions, _miner2.default.updateSettings, function (state, action) {

  return (0, _extends3.default)({}, state, { settings: action.payload });
}), (0, _defineProperty3.default)(_handleActions, _miner2.default.systemStatus.SUCCEEDED, function (state, action) {

  console.log(action.payload.toObject());
  var running = action.payload.getRunning();
  return (0, _extends3.default)({}, state, { status: { running: running } });
  x;
}), (0, _defineProperty3.default)(_handleActions, _miner2.default.stop.START, function (state, action) {
  return (0, _extends3.default)({}, state);
}), (0, _defineProperty3.default)(_handleActions, _miner2.default.stop.SUCCEEDED, function (state, action) {

  return (0, _extends3.default)({}, state, { isStarting: false, status: { running: false } });
}), (0, _defineProperty3.default)(_handleActions, 'FETCH_STATUS_START', function FETCH_STATUS_START(state, action) {
  console.log('handling miner fetch action!');
  return (0, _extends3.default)({}, state);
}), (0, _defineProperty3.default)(_handleActions, 'FETCH_STATUS_SUCCEEDED', function FETCH_STATUS_SUCCEEDED(state, action) {

  var event = action.payload;
  var stateUpdate = {};

  if (event.getTimestamp() !== undefined) {

    switch (event.getTypeCase()) {

      case Event.TypeCase['CONNECTION']:
        stateUpdate = (0, _extends3.default)({}, stateUpdate, (0, _connected2.default)(event, state));

        break;

      case Event.TypeCase['REPLY']:

        stateUpdate = (0, _extends3.default)({}, stateUpdate, (0, _reply2.default)(event, state));

        break;

      case Event.TypeCase['ERROR']:
        break;

      case Event.TypeCase['END']:
        break;

      case Event.TypeCase['EMPTY']:

        console.log('empty');
        break;

      case Event.TypeCase['RESULT']:
        console.log('on_result');
        break;

      case Event.TypeCase['JOB']:
        console.log('on_job');
        break;

      default:
        break;
    }

    stateUpdate = (0, _extends3.default)({}, stateUpdate, {
      eventHistory: [].concat((0, _toConsumableArray3.default)(state.eventHistory), [event.toObject()]).slice(-10000)
    });
  }
  return (0, _extends3.default)({}, state, stateUpdate);
}), _handleActions), {
  status: { running: false }, isStarting: false,
  settings: { config: '', walletAddress: '', enableGPU: false, nThreads: 1 },
  running: false,
  eventHistory: [],
  hashrates: []
});
//# sourceMappingURL=miner.js.map