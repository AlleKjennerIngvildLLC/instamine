import React, {Component} from 'react';

export class CurrentSettings extends Component {



 
    render() {

        console.log(this.props.settings);

        let settings = this.props.settings;
        let information = <div/>;



        if (settings !== undefined) {
            information = (
                <div>
                    <div className="row">
                        <div
                            className='col-xs-12'
                            style={{
                            wordBreak: 'break-all',
                            whiteSpace: 'normal'
                        }}>
                            Wallet Address: {settings.walletAddress}
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-xs-12'>
                            Worker Name: {settings.workerName}
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-xs-12'>
                        Threads: {settings.threads}
                        </div>
                    </div>

                     <div className="row">
                        <div className='col-xs-12'>
                        Threads: {settings.blocks}
                        </div>
                    </div>
                     <div className="row">
                        <div className='col-xs-12'>
                        Bfactor: {settings.bfactor}
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-xs-12'>
                        Bsleep: {settings.bsleep}
                        </div>
                    </div>

                </div>
            );
        }

        return information;

    }
}

export default CurrentSettings;