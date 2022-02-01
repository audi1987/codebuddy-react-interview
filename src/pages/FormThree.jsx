/* eslint-disable react/destructuring-assignment */
// import React from 'react';

function FormThree(props) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="country_code">Country Code:</label>
        <select
          className="form-control"
          placeholder="Select country code"
          id="first_name"
          value={props.formData.countryCode}
          onChange={e => {
            props.onChangeFormData('countryCode', e.target.value);
          }}
        >
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
      </div>
      {props.errorFlagData.countryCode && <p>{props.errorMessageData.countryCode}</p>}

      <div className="form-group">
        <label htmlFor="phone_number">Phone No:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter phone no"
          id="phone_number"
          value={props.formData.phoneNumber}
          onChange={e => props.onChangeFormData('phoneNumber', e.target.value)}
        />
      </div>
      {props.errorFlagData.phoneNumber && <p>{props.errorMessageData.phoneNumber}</p>}

      <div className="form-check">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            value={props.formData.acceptTermsAndCondition}
            onChange={e => props.onChangeFormData('acceptTermsAndCondition', e.target.value)}
          />
          Accept Terms And Conditions
        </label>
      </div>
      {props.errorFlagData.acceptTermsAndCondition && (
        <p>{props.errorMessageData.acceptTermsAndCondition}</p>
      )}
    </div>
  );
}

export default FormThree;
