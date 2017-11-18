import React, { Component } from 'react';
import { Avatar } from 'rebass';
import { Text, Button, ButtonOutline } from 'rebass';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';



class MinerItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        let settings = this.props.settings;


        let startButton = (
            <Button disabled={this.props.disabled} onClick={() => {

                if (settings.walletAddress === "") {
                    console.log(this.props.settingsRoute);
                    this.props.history.push(this.props.settingsRoute);
                } else {
                    this.props.startMiner(
                        settings.config, 
                        settings.enableGPU
                    );
                }
            }}>
                Start
            </Button>
        );

        let stopButton = (
            <Button disabled={this.props.disabled} onClick={this.props.stopMiner}>
                Stop
            </Button>
        );

        let button = startButton;

        if (this.props.running) {
            button = stopButton;
        }

        return (
            <div
                style={{
                    background: 'rgb(57, 73, 109)'
                }}

                className="row">
                <div
                    style={{
                        marginTop: '3px',
                        marginLeft: '8px'
                    }}
                    className="col-sm-2">
                    <Avatar size={32} style={{
                        background: 'white',
                    }} src={this.props.image} />

                </div>

                <div
                    style={{
                        marginLeft: '5px',
                    }}
                    className="col-sm-4">
                    <Text fontSize={14}>
                        {this.props.name}
                    </Text>
                </div>

                <div
                    style={{
                        marginTop: '5px'
                    }}
                    className="col-sm-2">

                    {button}

                </div>

            </div>

        )
    }
};

export default withRouter(MinerItem);