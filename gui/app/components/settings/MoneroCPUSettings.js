import React, {Component} from 'react';
import {Heading, Image} from 'rebass';

import SystemInformation from './SystemInformation';
import SettingsForm from './MoneroCPU/Form';
import CurrentSettings from './MoneroCPU/CurrentSettings';

import _ from 'lodash';

const {CommandRequest, Config, SystemStatusRequest} = require('../../rpc/command_pb');

class MoneroCPUSettings extends Component {

    render() {

        let name = `config-${CommandRequest.Miner.XMR_CPU}`;
        let settings = this.props.settings[name];

        let defaultSettings = {
            workerName: 'XMR_CPU_WORKER',
            numberCores: 1,
            email: 'email@example.com',
            walletAddress: '4581HhZkQHgZrZjKeCfCJxZff9E3xCgHGF25zABZz7oR71TnbbgiS7sK9jveE6Dx6uMs2LwszDuvQJgRZQotdpHt1fTdDhk',
            pool: {
                name: 'minexmr', 
                value: 'minexmr.instamine.tech:7777'
            }
        }

        if (_.isEmpty(settings)) {
            settings = defaultSettings;
        }

        return (
            <div className="pane-group">
                <div
                    className="pane"
                    style={{
                    overflow: 'hidden',
                    backgroundSize: 'cover',
                    color: 'black',
                    backgroundImage: 'url("./background.png")'
                }}>

                    <div
                        className="row"
                        style={{
                        marginTop: "100px"
                    }}>
                        <div className="col-sm-offset-4">
                            <Heading
                                fontSize={24}
                                style={{
                                color: 'white'
                            }}>
                                Monero (CPU) Settings
                            </Heading>
                        </div>
                    </div>

                    <div
                        className="row"
                        style={{
                        marginTop: '30px'
                    }}>
                        <div
                            className="col-xs-offset-2 col-xs-3"
                            style={{
                            border: '1px solid #c2c0c2',
                            minHeight: '300px',
                            marginLeft: '200px',
                            background: 'rgba(56, 29, 81, 0.36)'
                        }}>
                            <SystemInformation settings={settings}>
                                <CurrentSettings settings={settings}/>
                            </SystemInformation>
                        </div>

                        <div
                            style={{
                            marginLeft: '20px',
                            padding: '15px 15px 15px 15px',
                            border: '1px solid #c2c0c2',
                            background: 'rgba(0, 0, 0, 0.36)'
                        }}
                            className="col-xs-4">
                            <SettingsForm
                                settings={settings}
                                initialValues={settings}
                                updateSettings={this.props.updateSettings}/>
                        </div>
                    </div>

                    <div className="logo">
                        <Image
                            style={{
                            marginLeft: "400px",
                            marginTop: "-30px",
                            height: '200px'
                        }}
                            src='./banner.png'/>

                    </div>
                </div>
            </div>
        );
    }
}

export default MoneroCPUSettings;