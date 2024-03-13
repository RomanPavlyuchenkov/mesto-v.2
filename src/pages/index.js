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
import { initialElements } from "../scripts/elements-array.js";

//попап с открытым изображением
const openPopupWithImage = new PopupWithImage(".popup_type_opened-image");
openPopupWithImage.setEventListeners();

//Попап с информацией о пользователе
const userInfoOnPage = new UserInfo({
  name: ".profile__name",
  info: ".profile__job",
});
const popupWithProfileInfo = new PopupWithForm(
  ".popup_type_edit-profile",
  (item) => {
    userInfoOnPage.setUserInfo(item);
    popupWithProfileInfo.close();
  }
);
editProfileButton.addEventListener("click", () => {
  const userInfoData = userInfoOnPage.getUserInfo();
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.info;
  popupWithProfileInfo.open();
});
popupWithProfileInfo.setEventListeners();
//попап с добавленем карточек
const popupWithCard = new PopupWithForm(".popup_type_add-place", (item) => {
  renderer(item);
  popupWithCard.close();
});
popupWithCard.setEventListeners();
addCardButton.addEventListener("click", () => {
  popupWithCard.open();
});
///////////////////////Добавляем карточки на страницу
//фунцию renderer передаем в Section
const renderer = (element) => {
  const card = new Card(element, ".template-elements", (src, text) => {
    openPopupWithImage.open(src, text);
  });
  const newCard = card.createCard();
  renderCard.addItem(newCard);
};

const renderCard = new Section(
  {
    items: initialElements,
    renderer,
  },
  ".elements"
);
renderCard.renderItems();

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
