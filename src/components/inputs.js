import React from 'react';

//import styles
import './inputs.css';

const Input = ({ name, label, placeholder, value, onChange }) => (
  <div className="input">
    <label>{`${label}:`}</label>
    <input
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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
  />
);

export const DateInput = ({ name, label, placeholder, value, onChange }) => (
  <Input
    name={name}
    label={label}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
