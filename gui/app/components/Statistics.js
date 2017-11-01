import React, {Component} from 'react';
import {Button, Text, PanelHeader, Truncate, Heading} from 'rebass';
import _ from 'lodash';

import Graph from './Graph';
import EventTable from './EventTable';

export default class Statistics extends Component {

    state = {
        hideEvents: false
    }

    render() {

        let statistics = this.props.miner.statistics;
        let ping = 'N/A';
        let sparklines;
        let n_threads = 'N/A';
        let poolAddress;
        let totalHashrate = 'N/A';
        let lastRate = 'N/A';

        if (statistics !== undefined) {

            if (ping !== 0) {
                ping = `${ping} ms`;
            }

            n_threads = statistics.n_threads;
            poolAddress = statistics.poolAddress;

            sparklines = <Graph hashrates={this.props.miner.hashrates}/>;

            let totalRates = _.map(this.props.miner.hashrates, entry => _.sum(entry.hashrates));

            totalHashrate = _
                .mean(totalRates)
                .toFixed(1);
            lastRate = _
                .last(totalRates)
                .toFixed(1);

        }

        let eventTable;

        if (this.state.hideEvents) {
            eventTable = '';
        } else {
            eventTable = <EventTable events={this.props.miner.eventHistory}/>;
        }

        return (

            <div>
                <div className="heading">
                    <div
                        style={{
                        marginTop: '10px'
                    }}
                        className="row center-sm">
                        <div className="col-sm-6">
                            <div className="box">
                                <PanelHeader fontSize={3}>
                                    Miner Statistics
                                </PanelHeader>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                    paddingLeft: '15px',
                    paddingTop: '50px',
                    overflowX: 'hidden'
                }}
                    className="statistics">

                    <div className="row">
                        <div className="col-sm-offset-1 col-sm-5">
                            <div className="row">
                                <Text
                                    style={{
                                    marginBottom: '0px'
                                }}
                                    bold
                                    fontSize={2}>
                                    {`Mean hashrate: ${totalHashrate}`}
                                </Text>
                            </div>

                            <div className="row">
                                <Text
                                    style={{
                                    marginTop: '0px'
                                }}
                                    bold
                                    fontSize={2}>
                                    {`Latest hashrate: ${lastRate}`}
                                </Text>
                            </div>

                            <div className="row">
                                <Text
                                    style={{
                                    marginTop: '0px'
                                }}
                                    bold
                                    fontSize={2}>
                                    {`Latency: ${ping}`}
                                </Text>
                            </div>

                            <div className="row">
                                <Text
                                    style={{
                                    marginTop: '0px'
                                }}
                                    bold
                                    fontSize={2}>
                                    {`Threads: ${n_threads}`}
                                </Text>
                            </div>

                            <div className="row">
                                <Truncate bold fontSize={2}>
                                    {`Pool: ${poolAddress}`}
                                </Truncate>
                            </div>
                        </div>

                        <div className="col-sm-5">
                            <div className="box">
                                {sparklines}
                            </div>

                        </div>

                        <div className="col-sm-2"></div>

                    </div>

                    <div
                        style={{
                        marginTop: '40px'
                    }}
                        className="row">
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-offset-5 col-xs-5">
                                    <Button
                                        style={{background: 'gray'}}
                                        onClick={() => {
                                        this.setState({
                                            hideEvents: !this.state.hideEvents
                                        });
                                    }}>
                                        { 
                                            (this.state.hideEvents) 
                                            ? 'Show events'
                                            : 'Hide events'
                                        }
                                    </Button>
                                </div>
                            </div>
                            <div style={{marginTop: '10px'}} className="row">
                                <div className="col-xs-offset-1 col-xs-10">
                                    {eventTable}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}
