import MinerClient from './miner';
import handleReply from './reducers/reply';

const fs = require('fs');
const { Event, StatusRequest } = require('./rpc/messages_pb');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

var client = new MinerClient();


let state = {hashrates: []}


async function main() {
    try {

        let event = await client.getMiningStatus();
        
        let timestamp = event.getTimestamp();
        // console.log(
        //     event.getTypeCase() == Event.TypeCase['REPLY']
        // );

        // console.log(event.toObject());


        if (timestamp !== undefined) {

            console.log(event.toObject());
            let newState = handleReply(event, state)
            state = {...state, ...newState};
        }
    } 
    catch (e) {
        console.log(e);
    }
    
}

async function test() {


    let config_str = fs.readFileSync('./app/config.txt', 'utf8')
    
    client.startMiner(config_str);
    //await main();
}


test();





