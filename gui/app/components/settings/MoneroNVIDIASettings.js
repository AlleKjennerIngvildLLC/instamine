import React, {Component} from 'react';
import {Heading, Image} from 'rebass';

import SystemInformationCPU from './SystemInformationCPU';
import CompleteForm from './MoneroNVIDIA/CompleteForm';

class MoneroNVIDIASettings extends Component {

    render() {
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
                                Monero (NVIDIA) Settings
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
                            <SystemInformationCPU settings={this.props.settings}/>
                        </div>

                        <div
                            style={{
                            marginLeft: '20px',
                            padding: '15px 15px 15px 15px',
                            border: '1px solid #c2c0c2',
                            background: 'rgba(0, 0, 0, 0.36)'
                        }}
                            className="col-xs-4">
                            <CompleteForm settings={this.props.settings} 
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

export default MoneroNVIDIASettings;