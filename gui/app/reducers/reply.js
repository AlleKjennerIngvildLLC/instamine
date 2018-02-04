import _ from 'lodash';
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


    let report = state.latestReport;

    if (!_.isEmpty(reply.stats.report)) {
        report = reply.stats.report;
        //console.log(reply.stats.report);
    } else {
        //console.log("no report attribute found!");
    }

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
        hashrates: hashrates,
        latestReport: report
    }
}

export default handleReply;