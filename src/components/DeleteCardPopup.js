import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    onDeleteCard().then(() => {
      setIsLoading(false);
    });
  }

  return (
    <PopupWithForm
      name="delete-cart-form"
      title="Are you sure?"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <button className="form__submit-button form__submit-button_type_delete-card">
        {isLoading ? 'Saving...' : 'Yes'}
      </button>
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
