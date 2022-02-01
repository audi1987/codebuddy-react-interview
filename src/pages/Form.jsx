import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';

function Form() {
  const history = useHistory();

  const [activeStep, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '+91',
    phoneNumber: undefined,
    acceptTermsAndCondition: false,
  });
  const [errorFlagData, setErrorFlagData] = useState({
    emailId: false,
    password: false,
    firstName: false,
    lastName: false,
    address: false,
    countryCode: false,
    phoneNumber: false,
    acceptTermsAndCondition: false,
  });
  const [errorMessageData, setErrorMessageData] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
    acceptTermsAndCondition: '',
  });

  const formTitle = ['Form 1', 'Form 2', 'Form 3'];

  const onChangeFormData = (fieldName, value) => {
    setFormData(prevVal => ({
      ...prevVal,
      [fieldName]: value,
    }));
  };

  const getActiveForm = () => {
    if (activeStep === 1) {
      return (
        <FormOne
          formData={formData}
          onChangeFormData={onChangeFormData}
          errorFlagData={errorFlagData}
          errorMessageData={errorMessageData}
        />
      );
    }

    if (activeStep === 2) {
      return (
        <FormTwo
          formData={formData}
          onChangeFormData={onChangeFormData}
          errorFlagData={errorFlagData}
          errorMessageData={errorMessageData}
        />
      );
    }

    return (
      <FormThree
        formData={formData}
        onChangeFormData={onChangeFormData}
        errorFlagData={errorFlagData}
        errorMessageData={errorMessageData}
      />
    );
  };

  const setError = (fieldName, isInvalid, message) => {
    setErrorFlagData(prevVal => ({
      ...prevVal,
      [fieldName]: isInvalid,
    }));

    setErrorMessageData(prevVal => ({
      ...prevVal,
      [fieldName]: message,
    }));
  };

  const validateEmail = email =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

  const validatePassword = password =>
    password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

  const isOnlyAlphabet = str => /^[a-zA-Z]+$/.test(str);

  const isDataInvalid = () => {
    const formValidationStatus = {
      emailId: false,
      password: false,
      firstName: false,
      lastName: false,
      address: false,
      countryCode: false,
      phoneNumber: false,
      acceptTermsAndCondition: false,
    };

    if (activeStep === 1) {
      if (!formData.emailId) {
        setError('emailId', true, 'Email Required');
        formValidationStatus.emailId = true;
      } else if (formData.emailId && !validateEmail(formData.emailId)) {
        setError('emailId', true, 'Invalid Email');
        formValidationStatus.emailId = true;
      } else {
        setError('emailId', false, '');
        formValidationStatus.emailId = false;
      }

      if (!formData.password) {
        setError('password', true, 'Password Required');
        formValidationStatus.password = true;
      } else if (formData.password && !validatePassword(formData.password)) {
        setError('password', true, 'Invalid Password');
        formValidationStatus.password = true;
      } else {
        setError('password', false, '');
        formValidationStatus.password = false;
      }
    }

    if (activeStep === 2) {
      if (!formData.firstName) {
        setError('firstName', true, 'First Name Required');
        formValidationStatus.firstName = true;
      } else if (formData.firstName && !isOnlyAlphabet(formData.firstName)) {
        setError('firstName', true, 'First name can not contain numbers or special characters');
        formValidationStatus.firstName = true;
      } else if (formData.firstName && formData.firstName.length < 2) {
        setError('firstName', true, 'First name can not be less than 2 characters');
        formValidationStatus.firstName = true;
      } else if (formData.firstName && formData.firstName.length > 50) {
        setError('firstName', true, 'First name can not be greater than 50 characters');
        formValidationStatus.firstName = true;
      } else {
        setError('firstName', false, '');
        formValidationStatus.firstName = false;
      }

      if (formData.lastName && !isOnlyAlphabet(formData.lastName)) {
        setError('lastName', true, 'Last name can not contain numbers or special characters');
        formValidationStatus.lastName = true;
      } else if (formData.lastName && formData.lastName.length < 2) {
        setError('lastName', true, 'Last name can not be less than 2 characters');
        formValidationStatus.lastName = true;
      } else if (formData.lastName && formData.lastName.length > 50) {
        setError('lastName', true, 'Last name can not be greater than 50 characters');
        formValidationStatus.lastName = true;
      } else {
        setError('lastName', false, '');
        formValidationStatus.lastName = false;
      }

      if (!formData.address) {
        setError('address', true, 'Address is required');
        formValidationStatus.address = true;
      } else if (formData.address && formData.address.length < 10) {
        setError('address', true, 'Address can not be less than 10 characters');
        formValidationStatus.address = true;
      } else {
        setError('address', false, '');
        formValidationStatus.address = false;
      }
    }

    if (activeStep === 3) {
      if (!formData.countryCode) {
        setError('countryCode', true, 'Country Code is required');
        formValidationStatus.countryCode = true;
      } else {
        setError('countryCode', false, '');
        formValidationStatus.countryCode = false;
      }

      if (!formData.phoneNumber) {
        setError('phoneNumber', true, 'Phone Number is required');
        formValidationStatus.phoneNumber = true;
      } else if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
        setError('phoneNumber', true, 'Phone Number must be 10 digit');
        formValidationStatus.phoneNumber = true;
      } else {
        setError('phoneNumber', false, '');
        formValidationStatus.phoneNumber = false;
      }

      if (!formData.acceptTermsAndCondition) {
        setError('acceptTermsAndCondition', true, 'Please accept Terms And Condition');
        formValidationStatus.acceptTermsAndCondition = true;
      } else {
        setError('acceptTermsAndCondition', false, '');
        formValidationStatus.acceptTermsAndCondition = false;
      }
    }

    return (
      formValidationStatus.emailId ||
      formValidationStatus.password ||
      formValidationStatus.firstName ||
      formValidationStatus.lastName ||
      formValidationStatus.address ||
      formValidationStatus.countryCode ||
      formValidationStatus.phoneNumber ||
      formValidationStatus.acceptTermsAndCondition
    );
  };

  const onNextClick = () => {
    const isFormInvalid = isDataInvalid();
    if (!isFormInvalid) {
      setStep(currStep => currStep + 1);
    }
  };

  const onSubmit = () => {
    const isFormInvalid = isDataInvalid();
    if (!isFormInvalid) {
      const finalData = {
        emailId: formData.emailId,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/submit`, JSON.stringify(finalData))
        .then(response => {
          if (response.status === 200) {
            history.push('/posts');
          }
        })
        .catch(error => {
          console.log('Some error has occured while posting form data ', error);
        });
    }
  };

  return (
    <div>
      <div className="form_header">{formTitle[activeStep - 1]}</div>
      <div className="form_body">{getActiveForm()}</div>
      <div className="form_footer">
        {activeStep !== 3 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onNextClick();
            }}
          >
            Save & Next
          </button>
        ) : null}

        {activeStep === 3 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onSubmit();
            }}
          >
            Save
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Form;
