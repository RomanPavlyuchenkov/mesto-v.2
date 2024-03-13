import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(_popupSelector) {
    super(_popupSelector);
    this._image = this._popupSelector.querySelector(".popup__image");
    this._text = this._popupSelector.querySelector(".popup__text");
  }
  open(src, text) {
    super.open();
    this._image.src = src;
    this._image.alt = text;
    this._text.textContent = text;
  }
}
