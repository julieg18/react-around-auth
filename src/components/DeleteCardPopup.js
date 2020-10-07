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
      isLoading={isLoading}
      isFormValid={true}
      submitBtnText="Yes"
    />
  );
}

export default DeleteCardPopup;
