import _ from 'lodash';
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input, Button} from 'rebass';
import DropdownList from 'react-widgets/lib/DropdownList'

import renderField from '../renderField';
import buildConfiguration from './config.js';

const si = require('systeminformation');
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
    if (!values.email) {
        errors.email = 'E-mail should not be empty (can be anything).';
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
        workerName: '',
        mode: CommandRequest.Miner.XMR_CPU
    }

    buildCpuConfig = (n) => {
        let cpuSettings = _
            .range(n)
            .map(i => {
                return {'low_power_mode': false, 'no_prefetch': true, 'affine_to_cpu': i};

            });

        return cpuSettings;
    }

    onSubmit = (values) => {


        console.log(values);

        let numberCores = parseInt(values.numberCores);

        let cpu_threads_conf = this.buildCpuConfig(numberCores);
        let config = buildConfiguration(cpu_threads_conf, values.walletAddress, values.workerName, values.pool.value);


        this.setState({
            config: config,
            walletAddress: values.walletAddress,
            numberCores: values.numberCores,
            name: `config-${this.state.mode}`,
            email: values.email,
            workerName: values.workerName,
            pool: values.pool
        }, () => {
            this
                .props
                .updateSettings({
                    config: this.state.config,
                    walletAddress: this.state.walletAddress,
                    numberCores: this.state.numberCores,
                    email: this.state.email,
                    name: this.state.name,
                    workerName: this.state.workerName,
                    pool: this.state.pool
                });
        });
    }

    componentWillMount() {
        si
            .cpu()
            .then(data => this.setState({
                ...data,
                ...this.props.settings
            }))
            .catch(error => console.error(error));
    }

    render() {

        const {handleSubmit, pristine, reset, submitting} = this.props;
        let mode = CommandRequest.Miner.XMR_CPU;

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
                            E-email
                        </label>
                    </div>
                    <div className="col-xs-8">
                        <Field
                            name="email"
                            component={renderField}
                            type="text"
                            placeholder="e-mail address"/>
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

export default reduxForm({form: 'MoneroCPUCompleteForm', validate})(CompleteForm);