import PopupWithForm from "./PopupWithForm";

export default class PopupWithDeleteCard extends PopupWithForm {
  constructor(_popupSelector) {
    super(_popupSelector);
  }
  //При открытии попапа с удалением карточки мы записали функцию
  /* () => {
  apiCardDelete(card);
} */
  // в this._handleFormSubmit из класаса PopupWithForm и метод setEventListeners выполняет теперь новую функцию
  open(onSubmit) {
    super.open();
    this._handleFormSubmit = onSubmit;
  }
}
