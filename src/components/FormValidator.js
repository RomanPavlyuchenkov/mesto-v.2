export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = document.querySelector(formSelector);
    this._inputList = Array.from(
      this._formSelector.querySelectorAll(config.inputSelector)
    );
    this._submitButtonSelector = this._formSelector.querySelector(
      config.submitButtonSelector
    );
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
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
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
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButtonSelector.setAttribute("disabled", "");
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButtonSelector.removeAttribute("disabled");
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
