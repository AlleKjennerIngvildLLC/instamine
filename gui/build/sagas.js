'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _miner = require('./miner');

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [requestResponse, minerSaga].map(_regenerator2.default.mark);

function requestResponse(action) {
    return _regenerator2.default.wrap(function requestResponse$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return (0, _effects.put)();

                case 3:
                    _context.next = 5;
                    return (0, _effects.put)({ type: "START_STATUS_REQUEST_SAGA_SUCCEEDED" });

                case 5:
                    _context.next = 11;
                    break;

                case 7:
                    _context.prev = 7;
                    _context.t0 = _context['catch'](0);
                    _context.next = 11;
                    return (0, _effects.put)({ type: "START_STATUS_REQUEST_SAGA_FAILED", message: _context.t0.message });

                case 11:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this, [[0, 7]]);
}

function minerSaga() {
    return _regenerator2.default.wrap(function minerSaga$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.takeLatest)("START_STATUS_REQUEST_SAGA", requestResponse);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
}

exports.default = minerSaga;