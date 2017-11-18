import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {Button} from 'rebass';

import renderField from '../renderField';
import validate from './validate.js';

class MoneroCPUSettingsWizardSecondPage extends Component {
    render() {
        const {handleSubmit} = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="row">
                        <Field
                            name="theads"
                            type="number"
                            min="1"
                            max={this.props.maxCores}
                            component={renderField}
                            label="Cores"/>
                        <Button style={{marginLeft: '5px'}} type="submit" className="next">
                            Next
                        </Button>

                </div>
            </form>
        );
    }
}

export default reduxForm({form: 'MoneroCPUSettingsForm', destroyOnUnmount: false, forceUnregisterOnUnmount: true, validate})(MoneroCPUSettingsWizardSecondPage);