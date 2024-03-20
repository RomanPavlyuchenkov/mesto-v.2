import Popup from "./Popup";

export default class PopupWithDeleteCard extends Popup {
  constructor(_popupSelector, handleFormSubmit) {
    super(_popupSelector);
    this._form = this._popupSelector.querySelector(".popup__form");
    this._handleFomSubmit = handleFormSubmit;
  }

  setEventListeners(card) {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFomSubmit(card);
    });
  }
}
