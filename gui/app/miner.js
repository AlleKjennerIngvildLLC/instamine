const grpc = require('grpc');
const grpc_promise = require('grpc-promise');


const { Event, StatusRequest } = require('./rpc/messages_pb');
const { CommandRequest, Config, SystemStatusRequest } = require('./rpc/command_pb');
const { MinerStatusClient } = require('./rpc/miner_grpc_pb');

class MinerClient {

    constructor() {
        this.client = new MinerStatusClient(
            '127.0.0.1:50051',
            grpc.credentials.createInsecure()
        );

        grpc_promise.promisifyAll(this.client);
    }

    startMiner(config_str="", mode) {

        console.log(config_str);

        let request = new CommandRequest();
        request.setMiner(mode);

        
        let config = new Config();
        config.setConfigStr(config_str);
        request.setConfig(config);

        return this.client.startMiner().sendMessage(request);
    }

    stopMiner() {
        let request = new CommandRequest();
        return this.client.stopMiner().sendMessage(request);
    }

    getSystemStatus() {
        let request = new SystemStatusRequest();
        return this.client.systemStatus().sendMessage(request);
    }

    getMiningStatus() {
        let request = new StatusRequest();
        return this.client.reportStatus().sendMessage(request);
    }
}


export default MinerClient;
