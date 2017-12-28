import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input, Button} from 'rebass';
import _ from 'lodash';

import buildConfiguration from './config.js';
import { buffers } from 'redux-saga';

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
        walletAddress: '',
        workerName: '',
        threads: 5,
        blocks: 60,
        bfactor: 8,
        bsleep: 100
    }

    constructor(props) {
        super(props);

    }

    buildGPUConfig = ({threads, blocks, bfactor, bsleep}) => {
        let gpuSettings = [
            {
                'index': 0,
                'threads': threads,
                'blocks': blocks,
                'bfactor': bfactor,
                'bsleep': bsleep,
                'affine_to_cpu': false
            }
        ];

        return gpuSettings;

    }

    onSubmit = (values) => {

        console.log(values);

        let numberCores = parseInt(values.numberCores);

        let gpu_config = this.buildGPUConfig(values);
        let config = buildConfiguration(gpu_config, values.walletAddress, values.workerName); 

        this.setState({
            config: config,
            walletAddress: values.walletAddress,
            numberCores: values.numberCores,
            workerName: values.workerName
        }, () => {
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
                                <div
                                    style={{
                                    marginTop: '5px'
                                }}
                                    className="col-xs-4">
                                    <label
                                        style={{
                                        marginLeft: '10px'
                                    }}>
                                        Number of CPUs
                                    </label>
                                </div>
                                <div className="col-xs-offset-2 col-xs-6">
                                    <Field
                                        name="numberCores"
                                        component={renderField}
                                        min={1}
                                        max={this.state.cores}
                                        type="number"
                                        placeholder="Number of CPUs"/>
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
                <div
                    style={{
                    marginTop: '10px'
                }}
                    className="row">
                    <div
                        style={{
                        marginTop: '5px'
                    }}
                        className="col-xs-4">
                        <label
                            style={{
                            marginLeft: '10px'
                        }}>
                            Number of GPU Threads
                        </label>
                    </div>
                    <div className="col-xs-offset-2 col-xs-6">
                        <Field
                            name="threads"
                            component={renderField}
                            min={1}
                            type="number"
                            placeholder=""/>
                    </div>
                </div>

                 <div
                    style={{
                    marginTop: '10px'
                }}
                    className="row">
                    <div
                        style={{
                        marginTop: '5px'
                    }}
                        className="col-xs-4">
                        <label
                            style={{
                            marginLeft: '10px'
                        }}>
                            Bfactor
                        </label>
                    </div>
                    <div className="col-xs-offset-2 col-xs-6">
                        <Field
                            name="bfactor"
                            component={renderField}
                            min={1}
                            type="number"
                            placeholder=""/>
                    </div>
                </div>

                 <div
                    style={{
                    marginTop: '10px'
                }}
                    className="row">
                    <div
                        style={{
                        marginTop: '5px'
                    }}
                        className="col-xs-4">
                        <label
                            style={{
                            marginLeft: '10px'
                        }}>
                            Number of blocks
                        </label>
                    </div>
                    <div className="col-xs-offset-2 col-xs-6">
                        <Field
                            name="blocks"
                            component={renderField}
                            min={1}
                            type="number"
                            placeholder=""/>
                    </div>
                </div>


                    


                 <div
                    style={{
                    marginTop: '10px'
                }}
                    className="row">
                    <div
                        style={{
                        marginTop: '5px'
                    }}
                        className="col-xs-4">
                        <label
                            style={{
                            marginLeft: '10px'
                        }}>
                            Delay
                        </label>
                    </div>
                    <div className="col-xs-offset-2 col-xs-6">
                        <Field
                            name="bsleep"
                            component={renderField}
                            min={1}
                            type="number"
                            placeholder=""/>
                    </div>
                </div>

                

                <div
                    style={{
                    marginTop: '10px'
                }}
                    className="row">
                    <div className="col-xs-offset-9 col-xs-3">
                        <Button type="submit" disabled={pristine && submitting}>
                            Save
                        </Button>
                    </div>

                </div>

            </form>

        );
    }
}

export default reduxForm({
    form: 'MoneroNVIDIACompleteForm', 
    validate,
    initialValues: {
        bsleep: 100,
        threads: 5,
        blocks: 60,
        bfactor: 8,
      }
})(CompleteForm);