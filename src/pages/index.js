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
  avatarButton,
} from "../utils/constants.js";
import { renderLoading } from "../utils/utils.js";
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

//Попап обновить аватар
const popupUpadateAvatar = new PopupWithForm(
  ".popup_type_update-avatar",
  (newAvatar) => {
    renderLoading(".popup_type_update-avatar", true);
    api
      .updateAvatar(newAvatar)
      .then((newAvatar) => userInfoOnPage.updateAvatar(newAvatar))
      .then(popupUpadateAvatar.close())
      .catch((err) => console.log(`catch: ${err}`))
      .finally(() => {
        renderLoading(".popup_type_update-avatar", false);
      });
  }
);
popupUpadateAvatar.setEventListeners();
avatarButton.addEventListener("click", () => {
  popupUpadateAvatar.open();
});
//Попап с информацией о пользователе
const userInfoOnPage = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
  avatar: ".profile__avatar-img",
});
const popupWithProfileInfo = new PopupWithForm(
  ".popup_type_edit-profile",
  (info) => {
    renderLoading(".popup_type_edit-profile", true);
    api
      .updateUserInfo(info)
      .then((info) => userInfoOnPage.setUserInfo(info))
      .then(popupWithProfileInfo.close())
      .catch((err) => console.log(`catch: ${err}`))
      .finally(() => {
        renderLoading(".popup_type_edit-profile", false);
      });
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
  renderLoading(".popup_type_add-place", true);
  api
    .postCard(item)
    .then((item) => renderer(item))
    .then(popupWithCard.close())
    .catch((err) => console.log(`catch: ${err}`))
    .finally(() => {
      renderLoading(".popup_type_add-place", false, "Создать");
    });
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
    myId, /////////Удаляем карточку
    (card) => {
      popupWithDeleteCard.open(() => {
        apiCardDelete(card);
      });
    }, ////////Обработчик лайков
    (card) => {
      if (card.isLiked) {
        api
          .deleteLike(card._id)
          .then((data) => card.updateLikes(data.likes))
          .catch((err) => console.log(`catch: ${err}`));
      } else {
        api
          .addLike(card._id)
          .then((data) => card.updateLikes(data.likes))
          .catch((err) => console.log(`catch: ${err}`));
      }
    }
  );
  const newCard = card.createCard();
  renderCard.addItem(newCard);
};
const renderCard = new Section(renderer, ".elements");
//Попап с удалением карточки
const popupWithDeleteCard = new PopupWithDeleteCard(
  ".popup_type_delete-card",
  apiCardDelete
);
popupWithDeleteCard.setEventListeners();

//Api удалить карточку
function apiCardDelete(card) {
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

const validationUpdateAvatar = new FormValidator(
  enableValidation,
  ".popup__form_type_update-avatar"
);
validationUpdateAvatar.enableValidation();
