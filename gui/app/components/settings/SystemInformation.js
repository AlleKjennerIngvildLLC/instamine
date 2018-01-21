import React, {Component} from 'react';
import {Border, Text, Textarea} from 'rebass';

const gpuInfo = require('gpu-info');
const si = require('systeminformation');

export default class SystemInformation extends Component {

    state = {
        brand: '',
        speedmax: '',
        cores: 0
    }

    componentWillMount() {
        si
            .cpu()
            .then(data => this.setState(data))
            .catch(error => console.error(error))
            .then(gpuInfo)
            .then(gpus => {
                let info = gpus.map(gpu => {
                    return {brand: gpu.AdapterCompatibility, name: gpu.Name};
                });

                this.setState({gpu: info});
            });
    }

    render() {

        let settings = this.props.settings;

        let gpus;
        if (this.state.gpu !== undefined) {
            gpus = this
                .state
                .gpu
                .map((gpu, i) => {
                    return (
                        <div key={`gpu-${i}`} className="row">
                            <div className='col-xs-3'>
                                {`GPU-${i}:`}
                            </div>
                            <div className='col-xs-8'>
                                {gpu.name}
                            </div>
                        </div>
                    );
                });
        }

      
        return (
            <div
                style={{
                color: 'white',
                minHeight: '400px',
            }}
                className="cpuInformation">

                <div className="row">
                    <div className='col-xs-12'>
                        <b>
                            System Information
                        </b>
                    </div>
                </div>
                <div className="row">
                    <div className='col-xs-12'>

                        Manufacturer: {this.state.manufacturer}
                    </div>
                </div>
                <div className="row">

                    <div className='col-xs-12'>

                        CPU Brand: {this.state.brand}
                    </div>
                </div>
                <div className="row">
                    <div className='col-xs-12'>

                        Speed: {this.state.speedmax}
                    </div>
                </div>
                <div className="row">
                    <div className='col-xs-12'>

                        Cores: {this.state.cores}
                    </div>
                </div>

                {gpus}

                <div
                    style={{
                    marginTop: '1.5em'
                }}
                    className="row">
                    <div className='col-xs-12'>

                        <b>
                            Current Settings
                        </b>
                    </div>
                </div>
                {this.props.children}
            </div>

        );
    }
}