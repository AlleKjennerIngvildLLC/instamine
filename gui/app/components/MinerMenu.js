import React, {Component} from 'react';
import {Text, Border, Tooltip, Image} from 'rebass';
import MinerItem from './MinerItem';

import _ from 'lodash';

export default class MinerMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='menu'>

                <div
                    style={{
                    marginTop: '20px',
                    marginBottom: '30px'
                }}
                    className="row">
                    <div className="col-sm-offset-1 col-sm-10">
                        <Border py={1} top bottom>
                            Currencies
                        </Border>
                    </div>
                </div>

                <MinerItem
                    is='div'
                    className='row'
                    name='Monero (CPU)'
                    settingsRoute='/settings/MoneroCPU'
                    running={this.props.status.running}
                    image='./xmr.png'
                    {...this.props}/>

                <MinerItem
                    is='div'
                    disabled
                    className='row'
                    name='Monero (NVIDIA)'
                    settingsRoute='/settings/MoneroCPU'
                    running={this.props.status.running}
                    image='./xmr.png'
                    {...this.props}/>

                <MinerItem
                    is='div'
                    className='row'
                    name='Bitcoin (BTC)'
                    disabled
                    image='./bitcoin.png'
                    {...this.props}/>

                <MinerItem
                    is='div'
                    className='row'
                    name='Ethereum (ETH)'
                    disabled
                    image='./eth.png'
                    {...this.props}/>

                <div
                    style={{
                    marginTop: '380px',
                    height: '400px'
                }}
                    className="logo">
                    <Image
                        style={{
                        marginTop: '200px',
                        marginLeft: '35%',
                        height: '80px'
                    }}
                        src='./logo.png'/>
                </div>

            </div>

        );
    }

}
