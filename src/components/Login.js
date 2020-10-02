import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login({ onLoginUser }) {
  const history = useHistory();
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
    setIsEmailValid(input.validity.valid);
    setEmailValidationMessage(input.validationMessage);
    setIsFormValid(isValid && isPasswordValid && password !== '');
  }

  function handlePasswordInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setPassword(input.value);
    setIsPasswordValid(input.validity.valid);
    setPasswordValidationMessage(input.validationMessage);
    setIsFormValid(isEmailValid && isValid && email !== '');
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    onLoginUser()
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form form_dark form_type_login">
        <h1 className="form__heading">Log in</h1>
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
          {isLoading ? 'Saving...' : 'Log in'}
        </button>
        <Link className="form__link" to="/signup">
          Not a member yet? Sign up here!
        </Link>
      </form>
    </div>
  );
}

export default Login;
