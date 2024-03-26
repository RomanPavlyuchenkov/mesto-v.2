import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(_popupSelector, handleFormSubmit) {
    super(_popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._buttonSumbit = this._form.querySelector(".popup__button");
  }
  _getInputValues() {
    const inputObject = {};
    this._inputList.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
  renderLoading(isLoading, text = "Сохранить") {
    if (isLoading) {
      this._buttonSumbit.textContent = "Сохранение...";
    } else {
      this._buttonSumbit.textContent = text;
    }
  }
}
