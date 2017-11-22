import React, {Component} from 'react';
import {Avatar} from 'rebass';
import {Text, Button, ButtonOutline} from 'rebass';
import {push} from 'react-router-redux';
import {withRouter} from 'react-router-dom';

class MinerItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.disabled);

        let settings = this.props.settings;

        let startButton = (
            <Button
                bg='blue'
                color='white'
                disabled={this.props.disabled}
                onClick={() => {
                if (settings.walletAddress === '') {
                    this
                        .props
                        .history
                        .push(this.props.settingsRoute);
                } else {
                    this
                        .props
                        .startMiner(settings.config, settings.enableGPU);
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

        let settingsButton = (
            <ButtonOutline
                bg='blue'
                color='white'
                disabled={this.props.disabled}
                onClick={() => 
                this
                    .props
                    .history
                    .push(this.props.settingsRoute)
            }>
            Settings
            </ButtonOutline>

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
                    marginTop: '3px'
                }}
                    className="col-xs-2">
                    <Avatar
                        size={32}
                        style={{
                        marginLeft: '20px',
                        background: 'white'
                    }}
                        src={this.props.image}/>

                </div>

                <div style={{}} className="col-xs-3">
                    <Text
                        style={{
                        marginLeft: '10px'
                    }}
                        fontSize={14}>
                        {this.props.name}
                    </Text>
                </div>

                <div
                    style={{
                    marginTop: '5px'
                }}
                    className="col-xs-3">

                    {settingsButton}
                </div>

                <div
                    style={{
                    marginTop: '5px',
                    marginLeft: '15px'
                }}
                    className="col-xs-2">
                    {button}

                </div>

            </div>

        )
    }
};

export default withRouter(MinerItem);