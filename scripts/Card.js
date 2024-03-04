import {
  popupOpenedImage,
  closePopupOpenedImage,
  openPopup,
  closePopup,
} from "./index.js";
export default class Card {
  constructor(config, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = config.name;
    this._link = config.link;
  }
  _getTemplate() {
    const templeateElements = document.querySelector(
      this._templateSelector
    ).content;
    const cardElement = templeateElements
      .querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector(".elements__image");
    const cardName = this._element.querySelector(".elements__title");
    cardImg.src = this._link;
    cardImg.alt = this._name;
    cardName.textContent = this._name;
    this._handleDeleteCard();
    this._handleClickLike();
    this._handleClickImage();
    return this._element;
  }
  _handleDeleteCard() {
    const buttonDelete = this._element.querySelector(".elements__delete");
    buttonDelete.addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });
  }
  _handleClickLike() {
    const buttonLike = this._element.querySelector(".elements__like");
    buttonLike.addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
    });
  }
  _handleClickImage() {
    const img = this._element.querySelector(".elements__image");
    img.addEventListener("click", () => {
      openPopup(popupOpenedImage);
      popupOpenedImage.querySelector(".popup__image").src = this._link;
      popupOpenedImage.querySelector(".popup__image").alt = this._name;
      popupOpenedImage.querySelector(".popup__text").textContent = this._name;
    });
    closePopupOpenedImage.addEventListener("click", () => {
      closePopup(popupOpenedImage);
    });
  }
}
