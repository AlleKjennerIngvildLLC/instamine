'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grpc = require('grpc');
var grpc_promise = require('grpc-promise');

var _require = require('./rpc/messages_pb'),
    Event = _require.Event,
    StatusRequest = _require.StatusRequest;

var _require2 = require('./rpc/command_pb'),
    CommandRequest = _require2.CommandRequest,
    Config = _require2.Config,
    SystemStatusRequest = _require2.SystemStatusRequest;

var _require3 = require('./rpc/miner_grpc_pb'),
    MinerStatusClient = _require3.MinerStatusClient;

var MinerClient = function () {
    function MinerClient() {
        (0, _classCallCheck3.default)(this, MinerClient);

        this.client = new MinerStatusClient('127.0.0.1:50051', grpc.credentials.createInsecure());

        grpc_promise.promisifyAll(this.client);
    }

    (0, _createClass3.default)(MinerClient, [{
        key: 'startMiner',
        value: function startMiner() {
            var config_str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var mode = arguments[1];


            var request = new CommandRequest();
            request.setMiner(mode);

            var config = new Config();
            config.setConfigStr(config_str);
            request.setConfig(config);

            return this.client.startMiner().sendMessage(request);
        }
    }, {
        key: 'stopMiner',
        value: function stopMiner() {
            var request = new CommandRequest();
            return this.client.stopMiner().sendMessage(request);
        }
    }, {
        key: 'getSystemStatus',
        value: function getSystemStatus() {
            var request = new SystemStatusRequest();
            return this.client.systemStatus().sendMessage(request);
        }
    }, {
        key: 'getMiningStatus',
        value: function getMiningStatus() {
            var request = new StatusRequest();
            return this.client.reportStatus().sendMessage(request);
        }
    }]);
    return MinerClient;
}();

exports.default = MinerClient;
//# sourceMappingURL=miner.js.map