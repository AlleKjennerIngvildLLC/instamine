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

    componentWillMount() {
    }

    render() {

        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div> u </div>
        );
    }
}

export default reduxForm({form: 'MoneroNVIDIACompleteForm', validate})(CompleteForm);