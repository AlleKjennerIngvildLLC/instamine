import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input, Button} from 'rebass';
import _ from 'lodash';

import buildConfiguration from './config.js';

const si = require('systeminformation');
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

    return errors;
};

class CompleteForm extends Component {

    state = {
        brand: '',
        speedmax: '',
        cores: 1,
        walletAddress: '',
        numberCores: 1
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
        let config = buildConfiguration(cpu_threads_conf, values.walletAddress);

        this.setState({
            config: config,
            walletAddress: values.walletAddress,
            numberCores: values.numberCores
        }, () => {
            this
                .props
                .updateSettings(this.state);

            console.log('calling upudate settings!');
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


        console.log(this.state)
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