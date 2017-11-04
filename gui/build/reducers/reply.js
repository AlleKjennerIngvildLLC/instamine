'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleReply(event, state) {

    var reply = event.getReply().toObject();
    var timestamp = (0, _utils2.default)(event);

    var newHashrates = {
        timestamp: timestamp,
        hashrates: reply.stats.hashrateList.map(function (entry) {
            return entry.hashrate;
        })
    };

    return {

        status: {
            running: event.getStatus().getRunning()
        },

        statistics: {
            n_threads: reply.stats.nThreads,
            ping: reply.stats.ping,
            poolAddress: reply.stats.poolAddress
        },

        hashrates: [].concat((0, _toConsumableArray3.default)(state.hashrates), [newHashrates]).slice(-10000)
    };
}

exports.default = handleReply;
//# sourceMappingURL=reply.js.map