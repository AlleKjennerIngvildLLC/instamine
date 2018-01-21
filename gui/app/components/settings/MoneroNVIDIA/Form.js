import _ from 'lodash';
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button} from 'rebass';
import {buffers} from 'redux-saga';
import DropdownList from 'react-widgets/lib/DropdownList'

import renderField from '../renderField';
import buildConfiguration from './config.js';

const si = require('systeminformation');
const gpuInfo = require('gpu-info');
const {CommandRequest, Config, SystemStatusRequest} = require('../../../rpc/command_pb');

const renderDropdownList = ({input, data, valueField, textField}) => <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}/>

const minerPools = [
    {
        name: 'minexmr',
        value: 'minexmr.instamine.tech:7777'
    }, {
        name: 'supportxmr',
        value: 'supportxmr.instamine.tech:80'
    }, {
        name: 'usxmr',
        value: 'usxmr.instamine.tech:3333'
    }
];

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
        bsleep: 100,
        mode: CommandRequest.Miner.XMR_CUDA
    }

    constructor(props) {
        super(props);

    }

    buildGPUConfig = ({threads, blocks, bfactor, bsleep}) => {
        let gpuSettings = [
            {
                'index': 0,
                'threads': parseInt(threads),
                'blocks': parseInt(blocks),
                'bfactor': parseInt(bfactor),
                'bsleep': parseInt(bsleep),
                'affine_to_cpu': false
            }
        ];

        return gpuSettings;

    }

    onSubmit = (values) => {

        let numberCores = parseInt(values.numberCores);

        let gpu_config = this.buildGPUConfig(values);
        let config = buildConfiguration(gpu_config, values.walletAddress, values.workerName, values.pool.value);

        this.setState({
            config: config,
            walletAddress: values.walletAddress,
            threads: values.threads,
            blocks: values.blocks,
            bfactor: values.bfactor,
            bsleep: values.bsleep,
            email: values.email,
            name: `config-${this.state.mode}`,
            workerName: values.workerName,
            pool: values.pool
        }, () => {
            this
                .props
                .updateSettings({
                    config: this.state.config,
                    walletAddress: this.state.walletAddress,
                    name: this.state.name,
                    workerName: this.state.workerName,
                    threads: this.state.threads,
                    blocks: this.state.blocks,
                    bfactor: this.state.bfactor,
                    bsleep: this.state.bsleep,
                    email: this.state.email,
                    pool: this.state.pool
                });
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

        let mode = CommandRequest.Miner.XMR_CUDA;
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
                        <Field name="workerName" component={renderField} type="text" placeholder=""/>
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
                    <div
                        style={{
                        marginTop: '5px'
                    }}
                        className="col-xs-4">
                        <label
                            style={{
                            marginLeft: '10px'
                        }}>
                            Pool
                        </label>
                    </div>
                    <div className="col-xs-offset-2 col-xs-6">
                        <Field
                            name="pool"
                            component={renderDropdownList}
                            data={minerPools}
                            valueField="value"
                            textField="name"/>
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

export default reduxForm({form: 'MoneroNVIDIACompleteForm', validate})(CompleteForm);