import React from 'react';
import Popup from './Popup';

function PopupWithForm({
  title,
  name,
  isOpen,
  children,
  onClose,
  onSubmit,
  isFormValid,
  isLoading,
  submitBtnText,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} content={name}>
      <form onSubmit={onSubmit} className={`form form_type_${name}`}>
        <h1 className="form__heading">{title}</h1>
        {children}
        <button
          type="submit"
          className={`form__submit-button form__submit-button_type_${name}`}
          disabled={!isFormValid}
        >
          {isLoading ? 'Saving...' : submitBtnText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
