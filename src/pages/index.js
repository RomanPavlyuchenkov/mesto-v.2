import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  editProfileButton,
  addCardButton,
  nameInput,
  jobInput,
  enableValidation,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js";
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "ced33b28-8405-4e3c-9739-0f2a35abfd60",
  },
});

let myId = {};
Promise.all([
  api.getCards(), // Запрашиваем массив карточек с сервера
  api.getUserInfo(), // Запрашиваем данные юзера
])
  .then(([cards, user]) => {
    myId = user; // наполняем объект свойствами
    renderCard.renderItems(cards.reverse());
    userInfoOnPage.setUserInfo(user);
  })
  .catch((err) => console.log(`catch: ${err}`));

//Попап с информацией о пользователе
const userInfoOnPage = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
});
const popupWithProfileInfo = new PopupWithForm(
  ".popup_type_edit-profile",
  (info) => {
    api
      .updateUserInfo(info)
      .then((info) => userInfoOnPage.setUserInfo(info))
      .catch((err) => console.log(`catch: ${err}`));

    popupWithProfileInfo.close();
  }
);
editProfileButton.addEventListener("click", () => {
  const userInfoData = userInfoOnPage.getUserInfo();
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.about;
  popupWithProfileInfo.open();
});
popupWithProfileInfo.setEventListeners();
//попап с добавленем карточек
const popupWithCard = new PopupWithForm(".popup_type_add-place", (item) => {
  api
    .postCard(item)
    .then((item) => renderer(item))
    .catch((err) => console.log(`catch: ${err}`));

  popupWithCard.close();
});
popupWithCard.setEventListeners();
addCardButton.addEventListener("click", () => {
  popupWithCard.open();
});
///////////////////////Добавляем карточки на страницу
//фунцию renderer передаем в Section
const renderer = (element) => {
  const card = new Card(
    element,
    ".template-elements",
    (src, text) => {
      openPopupWithImage.open(src, text);
    },
    myId,
    (card) => {
      /////////Удаляем карточку
      popupWithDeleteCard.open();
      popupWithDeleteCard.setEventListeners(card);
    }
  );
  const newCard = card.createCard();
  renderCard.addItem(newCard);
};

const popupWithDeleteCard = new PopupWithDeleteCard(
  ".popup_type_delete-card",
  handleDeleteCard
);

//Api удалить карточку
function handleDeleteCard(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deleteElement();
    })
    .then(() => {
      popupWithDeleteCard.close();
    })
    .catch((err) => console.log(`catch: ${err}`));
}

const renderCard = new Section(renderer, ".elements");

//попап с открытым изображением
const openPopupWithImage = new PopupWithImage(".popup_type_opened-image");
openPopupWithImage.setEventListeners();

//Валидация форм
const validationEditprofile = new FormValidator(
  enableValidation,
  ".popup__form_type_edit-profile"
);
validationEditprofile.enableValidation();

const validationAddCard = new FormValidator(
  enableValidation,
  ".popup__form_type_add-place"
);
validationAddCard.enableValidation();
