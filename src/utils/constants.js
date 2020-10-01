const profileAddButton = document.querySelector('.profile__button_type_add');
const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileChangeAvatarButton = document.querySelector(
  '.profile__change-avatar-button',
);
const forms = Array.from(document.querySelectorAll('.form'));
const settingsObject = {
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

export {
  profileAddButton,
  profileEditButton,
  profileChangeAvatarButton,
  forms,
  settingsObject,
};
