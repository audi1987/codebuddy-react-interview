/* eslint-disable react/destructuring-assignment */
// import React from 'react';

function FormOne(props) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          id="email"
          value={props.formData.emailId}
          onChange={e => props.onChangeFormData('emailId', e.target.value)}
        />
      </div>
      {props.errorFlagData.emailId && <p>{props.errorMessageData.emailId}</p>}
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          id="password"
          value={props.formData.password}
          onChange={e => props.onChangeFormData('password', e.target.value)}
        />
      </div>
      {props.errorFlagData.password && <p>{props.errorMessageData.password}</p>}
    </div>
  );
}

export default FormOne;
