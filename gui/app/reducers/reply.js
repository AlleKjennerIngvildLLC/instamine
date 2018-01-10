import timestamp_to_date from '../utils';

function handleReply(event, state) {

    let reply = event
        .getReply()
        .toObject();
    let timestamp = timestamp_to_date(event);





    let newHashrates = {
        timestamp: timestamp,
        hashrates: reply
            .stats
            .hashrateList
            .map(entry => entry.hashrate)
           .filter(entry => !isNaN(entry))
    };


    if (newHashrates.hashrates.length === 0) {

        conosle.log("EMPTY!")
        console.log(newHashrates.hashrates)
        newHashrates = {};
    }



    console.log(event.toObject());

    return {

        status: {
            ...state.status,
            running: event
                .getStatus()
                .getRunning()
        },

        statistics: {
            n_threads: reply.stats.nThreads,
            ping: reply.stats.ping,
            poolAddress: reply.stats.poolAddress
        },

        hashrates: [
            ...state.hashrates,
            newHashrates
        ].slice(-10000)
    }
}

export default handleReply;