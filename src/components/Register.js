import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(
    '',
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleEmailInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setEmail(input.value);
    setIsEmailValid(isValid);
    setEmailValidationMessage(input.validationMessage);
    setIsFormValid(isValid && isPasswordValid && password !== '');
  }

  function handlePasswordInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    const message =
      input.validationMessage === 'Please match the requested format.'
        ? 'Password must contain no spaces.'
        : input.validationMessage;
    setPassword(input.value);
    setIsPasswordValid(isValid);
    console.log(input.validationMessage);
    setPasswordValidationMessage(message);
    setIsFormValid(isEmailValid && isValid && email !== '');
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="register">
      <form
        onSubmit={handleSubmit}
        className="form form_dark form_type_register"
      >
        <h1 className="form__heading">Sign up</h1>
        <label className="form__label" htmlFor="email-field">
          <input
            onChange={handleEmailInputChange}
            placeholder="Email"
            type="email"
            value={email}
            className={`form__field form__field_dark form__field_type_email ${
              !isEmailValid && 'form__field_invalid'
            }`}
            id="email-field"
            required
          />
          <span
            className={`form__field-error ${
              !isEmailValid && 'form__field-error_active'
            }`}
            id="email-field-error"
          >
            {emailValidationMessage}
          </span>
        </label>
        <label className="form__label" htmlFor="password-field">
          <input
            onChange={handlePasswordInputChange}
            type="password"
            placeholder="Password"
            value={password}
            className={`form__field form__field_dark form__field_type_password ${
              !isPasswordValid && 'form__field_invalid'
            }`}
            id="password-field"
            minLength="6"
            maxLength="30"
            pattern="\S+"
            required
          />
          <span
            className={`form__field-error ${
              !isPasswordValid && 'form__field-error_active'
            }`}
            id="password-field-error"
          >
            {passwordValidationMessage}
          </span>
        </label>
        <button
          type="submit"
          className="form__submit-button form__submit-button_dark form__submit-button_type_edit-profile"
          disabled={!isFormValid}
        >
          {isLoading ? 'Saving...' : 'Sign up'}
        </button>
        <Link className="form__link" to="/signin">
          Not a member yet? Log in here!
        </Link>
      </form>
    </div>
  );
}

export default Register;
