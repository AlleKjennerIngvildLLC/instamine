import React, { Component } from 'react';
import { Avatar } from 'rebass';
import { Text, Button, ButtonOutline } from 'rebass';

export default class MinerItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        let startButton = (
            <Button disabled={this.props.disabled} onClick={() => {
                this.props.startMiner(this.props.settings.config);
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
