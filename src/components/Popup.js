import React from 'react';

function Popup({ onClose, isOpen, children, content }) {
  function checkIfPopupOverlayWasClicked(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  return (
    <div
      onClick={checkIfPopupOverlayWasClicked}
      className={`popup popup_content_${content} ${isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          className="button popup__exit-button"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
