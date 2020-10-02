import React from 'react';
import Popup from './Popup';

function ImagePopup({ onClose, isOpen, card: { link, name } }) {
  return (
    <Popup onClose={onClose} isOpen={isOpen} content="picture">
      <div className="picture">
        <img alt={name} src={link} className="picture__image" />
        <p className="picture__title">{name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
