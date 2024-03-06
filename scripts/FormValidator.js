export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = document.querySelector(formSelector);
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
  }
  enableValidation() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
    });
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }
  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }
}
