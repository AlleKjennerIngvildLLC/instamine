import React from 'react'
import {Input} from 'rebass';

const renderField = ({ input, label, max, type, min, defaultValue, meta: { touched, error } }) => (
  <div>
    <div>
    <Input
        {...input}
        style={{background: 'white'}}
        defaultValue={defaultValue}
        type={type}
        min={min}
        max={max}
	    placeholder={label}
/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
 

export default renderField;