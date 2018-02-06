import React from 'react';

//import styles
import './inputs.css';

const Input = ({ name, label, placeholder, value, onChange, disabled }) => (
  <div className="input">
    <label>{`${label}:`}</label>
    <input
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

export const AirportInput = ({ name, label, placeholder, value, onChange }) => (
  <Input
    name={name}
    label={label}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={false}
  />
);

export const DateInput = ({ name, label, placeholder, value, onChange, disabled }) => (
  <Input
    name={name}
    label={label}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);
