'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var main = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var event, timestamp, newState;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return client.getMiningStatus();

                    case 3:
                        event = _context.sent;
                        timestamp = event.getTimestamp();
                        // console.log(
                        //     event.getTypeCase() == Event.TypeCase['REPLY']
                        // );

                        // console.log(event.toObject());


                        if (timestamp !== undefined) {

                            console.log(event.toObject());
                            newState = (0, _reply2.default)(event, state);

                            state = (0, _extends3.default)({}, state, newState);
                        }
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 8]]);
    }));

    return function main() {
        return _ref.apply(this, arguments);
    };
}();

var test = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var config_str;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        config_str = fs.readFileSync('./app/config.txt', 'utf8');


                        client.startMiner(config_str);
                        //await main();

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function test() {
        return _ref2.apply(this, arguments);
    };
}();

var _miner = require('./miner');

var _miner2 = _interopRequireDefault(_miner);

var _reply = require('./reducers/reply');

var _reply2 = _interopRequireDefault(_reply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var _require = require('./rpc/messages_pb'),
    Event = _require.Event,
    StatusRequest = _require.StatusRequest;

var sleep = function sleep(ms) {
    return new _promise2.default(function (resolve) {
        return setTimeout(resolve, ms);
    });
};

var client = new _miner2.default();

var state = { hashrates: [] };

test();