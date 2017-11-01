'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reduxActions = require('redux-actions');

var _reduxThunkActions = require('redux-thunk-actions');

var _reactNotificationSystemRedux = require('react-notification-system-redux');

var _reactNotificationSystemRedux2 = _interopRequireDefault(_reactNotificationSystemRedux);

var _effects = require('redux-saga/effects');

var _miner = require('../miner');

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [requestResponse, minerSaga].map(_regenerator2.default.mark);

var _require = require('../rpc/messages_pb'),
    Event = _require.Event;

// The connection should be triggered by an action!


var client = new _miner2.default();
var handle = void 0;

function send_notification(dispatch, title, message) {

  var options = {
    title: title,
    message: message,
    position: 'br',
    autoDismiss: 3
  };

  dispatch(_reactNotificationSystemRedux2.default.info(options));
}

var startMiner = function startMiner(config) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dispatch) {
      var startRequest, startSuccess, startFailure, startEnded, response, date;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              startRequest = (0, _reduxActions.createAction)('START_MINER_START');
              startSuccess = (0, _reduxActions.createAction)('START_MINER_SUCCEEDED');
              startFailure = (0, _reduxActions.createAction)('START_MINER_FAILED');
              startEnded = (0, _reduxActions.createAction)('START_MINER_ENDED');


              dispatch(startRequest());

              _context.prev = 5;
              _context.next = 8;
              return client.startMiner(config);

            case 8:
              response = _context.sent;


              if (response.getMessage() == 'Server started') {
                date = new Date().toLocaleString();


                send_notification(dispatch, 'Miner started.', 'Started mining XMR [' + date + ']');

                dispatch(startSuccess());

                console.log(handle);
                if (handle === undefined) {
                  handle = setInterval(function () {
                    return dispatch({ type: 'START_STATUS_REQUEST_SAGA' });
                  }, 5000);
                } else {
                  console.log('handle is not undefined. should not be possible!');
                }
              }
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](5);


              console.log(_context.t0);
              dispatch(startFailure(_context.t0));

            case 16:

              dispatch(startEnded());

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[5, 12]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var stopMiner = (0, _reduxThunkActions.createActionThunk)('STOP_MINER', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var response;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return client.stopMiner();

        case 2:
          response = _context2.sent;


          if (handle !== undefined) {
            clearInterval(handle);
            handle = undefined;
          }

          return _context2.abrupt('return', response);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

var requestStatus = function requestStatus() {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(dispatch) {
      var startRequest, startSuccess, startFailure, startEnded, event;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              startRequest = (0, _reduxActions.createAction)('FETCH_STATUS_START');
              startSuccess = (0, _reduxActions.createAction)('FETCH_STATUS_SUCCEEDED');
              startFailure = (0, _reduxActions.createAction)('FETCH_STATUS_FAILED');
              startEnded = (0, _reduxActions.createAction)('FETCH_STATUS_ENDED');


              dispatch(startRequest());

              _context3.prev = 5;
              _context3.next = 8;
              return client.getMiningStatus();

            case 8:
              event = _context3.sent;


              dispatch(startSuccess(event));

              _context3.t0 = event.getTypeCase();
              _context3.next = _context3.t0 === Event.TypeCase['CONNECTION'] ? 13 : 14;
              break;

            case 13:
              return _context3.abrupt('break', 15);

            case 14:
              return _context3.abrupt('break', 15);

            case 15:
              _context3.next = 20;
              break;

            case 17:
              _context3.prev = 17;
              _context3.t1 = _context3['catch'](5);

              dispatch(startFailure(_context3.t1));

            case 20:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[5, 17]]);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var requestSystemStatus = (0, _reduxThunkActions.createActionThunk)('FETCH_SYSTEM_STATUS', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
  var response;
  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return client.getSystemStatus();

        case 2:
          response = _context4.sent;
          return _context4.abrupt('return', response);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
})));

var updateSettings = (0, _reduxActions.createAction)('UPDATE_SETTINGS', function (value) {
  return value;
});

function requestResponse(action) {
  return _regenerator2.default.wrap(function requestResponse$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _effects.put)(requestStatus());

        case 3:
          _context5.next = 5;
          return (0, _effects.put)({ type: 'START_STATUS_REQUEST_SAGA_SUCCEEDED' });

        case 5:
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5['catch'](0);
          _context5.next = 11;
          return (0, _effects.put)({ type: 'START_STATUS_REQUEST_SAGA_FAILED', message: _context5.t0.message });

        case 11:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[0], this, [[0, 7]]);
}

function minerSaga() {
  return _regenerator2.default.wrap(function minerSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.takeLatest)('START_STATUS_REQUEST_SAGA', requestResponse);

        case 2:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[1], this);
}

exports.default = {
  start: startMiner,
  stop: stopMiner,
  status: requestStatus,
  systemStatus: requestSystemStatus,
  updateSettings: updateSettings,
  minerSaga: minerSaga
};
//# sourceMappingURL=miner.js.map