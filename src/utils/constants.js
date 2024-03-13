//кнопки
export const editProfileButton = document.querySelector(".profile__edit-info");
export const addCardButton = document.querySelector(".profile__add-card");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const formElementEditProfile = popupEditProfile.querySelector(
  ".popup__form_type_edit-profile"
);
export const nameInput = formElementEditProfile.querySelector("#input-name");
export const jobInput = formElementEditProfile.querySelector("#input-job");
export const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
