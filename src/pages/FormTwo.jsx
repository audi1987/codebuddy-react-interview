/* eslint-disable react/destructuring-assignment */
// import React from 'react';

function FormTwo(props) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter first name"
          id="first_name"
          value={props.formData.firstName}
          onChange={e => props.onChangeFormData('firstName', e.target.value)}
        />
      </div>
      {props.errorFlagData.firstName && <p>{props.errorMessageData.firstName}</p>}

      <div className="form-group">
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter last name"
          id="last_name"
          value={props.formData.lastName}
          onChange={e => props.onChangeFormData('lastName', e.target.value)}
        />
      </div>
      {props.errorFlagData.lastName && <p>{props.errorMessageData.lastName}</p>}

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter address"
          id="address"
          value={props.formData.address}
          onChange={e => props.onChangeFormData('address', e.target.value)}
        />
      </div>
      {props.errorFlagData.address && <p>{props.errorMessageData.address}</p>}
    </div>
  );
}

export default FormTwo;
