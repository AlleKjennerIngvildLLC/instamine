import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Heading} from 'rebass';


import SystemInformationCPU from './SystemInformationCPU';
import MoneroCPUSettingsWizardFirstPage from './MoneroCPU/MoneroCPUSettingsWizardFirstPage';
import MoneroCPUSettingsWizardSecondPage from './MoneroCPU/MoneroCPUSettingsWizardSecondPage';


class MoneroCPUSettings extends Component {

    state = {
        page: 1
    }

    constructor(props) {
        super(props)
        this.nextPage = this
            .nextPage
            .bind(this)
        this.previousPage = this
            .previousPage
            .bind(this)
    }

    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
    }

    previousPage = () => {
        this.setState({
            page: this.state.page - 1
        })
    }

    render() {
        const {handleSubmit} = this.props;
        const {page} = this.state;

        return (

            <div className="pane-group">
                <div
                    className="pane"
                    style={{
                    backgroundSize: 'cover',
                    color: 'black',
                    backgroundImage: 'url("./background.png")'

                }}>

                    <div className="row" style={{marginTop: "220px"}}>
                        <div className="col-sm-offset-4">
                            <Heading fontSize={24} style={{ color: 'white' }}>
                                Monero (CPU) Settings 
                            </Heading>
                        </div>
                    </div>

                    <div className="row" style={{marginTop: '30px'}}>
                        <div className="col-sm-offset-3 col-sm-3" style={{background: 'rgba(0, 0, 0, 0.36)'}}>
                            <SystemInformationCPU />
                        </div>

                      
                        <div style={{marginLeft: '20px'}} className="col-sm-3">
                            {page === 1 && <MoneroCPUSettingsWizardFirstPage onSubmit={this.nextPage}/>}
                            {page === 2 && <MoneroCPUSettingsWizardSecondPage onSubmit={this.nextPage}/>}

                        </div>

                     


                    </div>

                </div>
            </div>
        );
    }
}

export default reduxForm({form: 'MoneroCPUSettingsForm'})(MoneroCPUSettings);