import React from 'react';

function ImagePopup({ onClose, isOpen, card: { link, name } }) {
  function checkIfPopupOverlayWasClicked(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  return (
    <div
      onClick={checkIfPopupOverlayWasClicked}
      className={`popup popup_content_picture ${isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          className="button popup__exit-button"
          onClick={onClose}
        ></button>
        <div className="picture">
          <img alt={name} src={link} className="picture__image" />
          <p className="picture__title">{name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
