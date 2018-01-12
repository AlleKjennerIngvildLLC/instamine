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

    let hashrates = [...state.hashrates];
    if (newHashrates.hashrates.length !== 0) {
        hashrates = [...state.hashrates, newHashrates];
    }

    hashrates = hashrates.slice(-500);

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
        hashrates: hashrates
    }
}

export default handleReply;