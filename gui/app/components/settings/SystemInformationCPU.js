import React, {Component} from 'react';
import {Border, TabItem} from 'rebass';

const si = require('systeminformation');

export default class SystemInformationCPU extends Component {

    state = {
        brand: '',
        speedmax: '',
        cores: 0
    }

    componentWillMount() {
        si
            .cpu()
            .then(data => this.setState(data))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div
                style={{
                color: 'white',
            }}
                className="cpuInformation">

                <div className="row">
                    <b>
                        System Information
                    </b>
                </div>
               <div className="row">
                    Manufacturer: {this.state.manufacturer}
                </div>
                <div className="row">
                    CPU Brand: {this.state.brand}
                </div>
                <div className="row">
                    Speed: {this.state.speedmax}
                </div>
                <div className="row">
                    Cores: {this.state.cores}
                </div>
                



             

            </div>

        );
    }
}