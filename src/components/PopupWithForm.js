import React from 'react';

function PopupWithForm({ title, name, isOpen, children, onClose, onSubmit }) {
  function checkIfPopupOverlayWasClicked(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  return (
    <div
      onClick={checkIfPopupOverlayWasClicked}
      className={`popup popup_content_${name} ${isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          className="button popup__exit-button"
          onClick={onClose}
        ></button>
        <form onSubmit={onSubmit} className={`form form_type_${name}`}>
          <h1 className="form__heading">{title}</h1>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
