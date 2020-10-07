import React, { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef(null);
  const [isAvatarValid, setIsAvatarValid] = useState(true);
  const [avatarValidationMessage, setAvatarValidationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  function handleAvatarInputChange(e) {
    const input = e.target;
    setIsAvatarValid(input.validity.valid);
    setAvatarValidationMessage(input.validationMessage);
    setIsFormValid(input.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    onUpdateAvatar({
      avatar: avatarInput.current.value,
    }).then(() => {
      setIsLoading(false);
      avatarInput.current.value = '';
      setIsFormValid(false);
    });
  }

  return (
    <PopupWithForm
      name="change-avatar-form"
      title="Change profile picture"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isFormValid={isFormValid}
      submitBtnText="Save"
    >
      <label htmlFor="avatar-img-field" className="form__label">
        <input
          ref={avatarInput}
          placeholder="Image-link"
          type="url"
          className={`form__field form__field_type_avatar-img ${
            !isAvatarValid && 'form__field_invalid'
          }`}
          id="avatar-img-field"
          onChange={handleAvatarInputChange}
          required
        />
        <span
          className={`form__field-error ${
            !isAvatarValid && 'form__field-error_active'
          }`}
          id="avatar-img-field-error"
        >
          {avatarValidationMessage}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarProfilePopup;
