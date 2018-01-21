import React from 'react';
import {Input} from 'rebass';

const renderField = (field) => {

    let error = (
        field.meta.touched && field.meta.error && 
        <span className="error">
            <b style={{color: '#ce3939'}}>
                {field.meta.error}
            </b>
        </span>
    );

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
                type={field.type}/> {error}
        </div>
    );
};

export default renderField;