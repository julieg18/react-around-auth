import React from 'react';
import Popup from './Popup';

function PopupWithForm({ title, name, isOpen, children, onClose, onSubmit }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} content={name}>
      <form onSubmit={onSubmit} className={`form form_type_${name}`}>
        <h1 className="form__heading">{title}</h1>
        {children}
      </form>
    </Popup>
  );
}

export default PopupWithForm;
