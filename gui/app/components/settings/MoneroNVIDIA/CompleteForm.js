import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input, Button} from 'rebass';
import _ from 'lodash';

import buildConfiguration from './config.js';

const si = require('systeminformation');
const gpuInfo = require('gpu-info');

const renderField = (field) => {
    return (
        <div className="input-row">
            <Input
                {...field.input}
                placeholder={field.placeholder}
                style={{
                color: 'black',
                background: 'white'
            }}
                min={field.min}
                max={field.max}
                type={field.type}/> {field.meta.touched && field.meta.error && <span
                style={{
                color: '#ff4545'
            }}
                className="error">
                <b>
                    {field.meta.error}</b>
            </span>
}
        </div>
    );
};

const validate = values => {

    const errors = {};
    if (!values.walletAddress) {
        errors.walletAddress = 'Wallet address required!';
    }
    if (!values.numberCores) {
        errors.numberCores = 'Must assign atleast one core!';
    }
    if (!values.workerName) {
        errors.workerName = 'Worker name cannot be empty!';
    }

    return errors;
};

class CompleteForm extends Component {

    state = {
        brand: '',
        speedmax: '',
        cores: 1,
        walletAddress: '',
        numberCores: 1,
        workerName: ''
    }

    constructor(props) {
        super(props);

    }

    buildGPUConfig = () => {
        let gpuSettings = [
            {
                'index': 0,
                'threads': 5,
                'blocks': 60,
                'bfactor': 8,
                'bsleep': 100,
                'affine_to_cpu': false
            }
        ];

        return gpuSettings;

    }

    onSubmit = (values) => {

        console.log(values);

        let numberCores = parseInt(values.numberCores);

        let cpu_threads_conf = this.buildCpuConfig(numberCores);
        let config = buildConfiguration(cpu_threads_conf, values.walletAddress, values.workerName);

        this.setState({
            config: config,
            walletAddress: values.walletAddress,
            numberCores: values.numberCores,
            workerName: values.workerName
        }, () => {

            console.log(this.state)
            this
                .props
                .updateSettings(this.state);

            console.log('calling upudate settings!');
        });

    }

    componentWillMount() {
        gpuInfo().then(gpus => {
            let info = gpus.map(gpu => {
                return {brand: gpu.AdapterCompatibility, name: gpu.Name};
            });

            this.setState({gpu: info});
        });
    }

    render() {

        const {handleSubmit, pristine, reset, submitting} = this.props;

        console.log(this.state.gpu);

        let gpus;
        if (this.state.gpu !== undefined) {
            gpus = this
                .state
                .gpu
                .map((gpu, i) => {
                    return (
                        <div key={`gpu-${i}`} className="row">

                            <div className="row" name="gpu-threads">
                                <div className="col-xs-4">
                                    Threads
                                </div>

                                <div className="col-xs-offset-2 col-xs-6">
                                    <Field
                                        name="threads"
                                        component={renderField}
                                        min={1}
                                        max={this.state.cores}
                                        type="number"
                                        placeholder=""/>
                                </div>
                            </div>

                            
                        </div>
                    );
                });
        }

        return (

            <form
                style={{
                color: 'white'
            }}
                onSubmit={handleSubmit(this.onSubmit)}>
                <div className="row">

                    <div
                        style={{
                        marginTop: '5px'
                    }}
                        className="col-xs-4">
                        <label
                            style={{
                            marginLeft: '10px'
                        }}>
                            Wallet Address
                        </label>
                    </div>
                    <div className="col-xs-8">
                        <Field
                            name="walletAddress"
                            component={renderField}
                            type="text"
                            placeholder="Wallet address"/>
                    </div>
                </div>
                <div className="row">
                    <div
                        style={{
                        marginTop: '5px'
                    }}
                        className="col-xs-4">
                        <label
                            style={{
                            marginLeft: '10px'
                        }}>
                            Worker Name
                        </label>
                    </div>
                    <div className="col-xs-8">
                        <Field
                            name="workerName"
                            component={renderField}
                            type="text"
                            placeholder="Worker-1"/>
                    </div>
                </div>

                {gpus}
            </form>

        );
    }
}

export default reduxForm({form: 'MoneroNVIDIACompleteForm', validate})(CompleteForm);