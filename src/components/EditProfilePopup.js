import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [
    descriptionValidationMessage,
    setDescriptionValidationMessage,
  ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const CurrentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const { name: currentUserName, about } = CurrentUser;
    setDescription(about);
    setName(currentUserName);
  }, [CurrentUser]);

  function handleNameInputChange(e) {
    const input = e.target;
    setName(input.value);
    setIsNameValid(input.validity.valid);
    setNameValidationMessage(input.validationMessage);
  }

  function handleDescriptionInputChange(e) {
    const input = e.target;
    setDescription(input.value);
    setIsDescriptionValid(input.validity.valid);
    setDescriptionValidationMessage(input.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    onUpdateUser({
      name,
      about: description,
    }).then(() => {
      setIsLoading(false);
    });
  }

  return (
    <PopupWithForm
      name="edit-profile-form"
      title="Edit profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label" htmlFor="name-field">
        <input
          onChange={handleNameInputChange}
          defaultValue={name}
          type="text"
          className={`form__field form__field_type_name ${
            !isNameValid && 'form__field_invalid'
          }`}
          id="name-field"
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Z -]{1,}"
          required
        />
        <span
          className={`form__field-error ${
            !isNameValid && 'form__field-error_active'
          }`}
          id="name-field-error"
        >
          {nameValidationMessage}
        </span>
      </label>
      <label className="form__label" htmlFor="job-field">
        <input
          onChange={handleDescriptionInputChange}
          defaultValue={description}
          type="text"
          className={`form__field form__field_type_job ${
            !isDescriptionValid && 'form__field_invalid'
          }`}
          id="job-field"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className={`form__field-error ${
            !isDescriptionValid && 'form__field-error_active'
          }`}
          id="job-field-error"
        >
          {descriptionValidationMessage}
        </span>
      </label>
      <button
        type="submit"
        className="form__submit-button form__submit-button_type_edit-profile"
        disabled={!isNameValid || !isDescriptionValid}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
