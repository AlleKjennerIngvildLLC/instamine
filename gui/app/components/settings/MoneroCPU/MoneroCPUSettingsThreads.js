import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {Button} from 'rebass';

import renderField from '../renderField';
import validate from './validate.js';

const si = require('systeminformation');


class MoneroCPUSettingsThreads extends Component {

    state = {
        brand: '',
        speedmax: '',
        cores: 0
    }

    componentWillMount() {
        si
        .cpu()
        .then(data => this.setState(data))
        .catch(error => console.error(error));
    }
    
    render() {
        const {handleSubmit} = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="row">
                    <div className='col-xs-5'>

                        <Field
                            name="theads"
                            type="number"
                            min="1"
                            max={this.state.cores}
                            component={renderField}
                            label="Cores"/>
                    </div>
                    <div className='col-xs-6'>
                        <Button children='next' style={{marginLeft: '5px'}} type="submit" className="next"/>
                    </div>

                </div>
            </form>
        );
    }
}

export default reduxForm({form: 'MoneroCPUSettingsForm', destroyOnUnmount: false, forceUnregisterOnUnmount: true, validate})(MoneroCPUSettingsThreads);