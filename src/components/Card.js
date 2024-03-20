export default class Card {
  constructor(
    config,
    templateSelector,
    handleCardClick,
    myId,
    handleDeleteCard
  ) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._name = config.name;
    this._link = config.link;
    this._likes = config.likes;
    this._ownerId = config.owner._id;
    this._myId = myId._id;
    this._id = config._id;
    this._handleDeleteCard = handleDeleteCard;
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
    this._cardImg = this._element.querySelector(".elements__image");
    this._cardName = this._element.querySelector(".elements__title");
    this._likes = this._element.querySelector(
      ".elements__like-container span "
    );
    this._buttonDelete = this._element.querySelector(".elements__delete");
    this._likes.textContent = this._likes.length;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardName.textContent = this._name;
    this._initDeleteCard();
    this._handleClickLike();
    this._handleClickImage();

    return this._element;
  }
  deleteElement() {
    this._element.remove();
    this._element = null;
  }
  _initDeleteCard() {
    if (this._ownerId !== this._myId) {
      this._buttonDelete.style.display = "none";
    }
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteCard(this);
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
      this._handleCardClick(this._link, this._name);
    });
  }
}
