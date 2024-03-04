import Card from "./Card.js";
import { enableValidation, initialElements } from "./elements-array.js";

//кнопки
const editProfileButton = document.querySelector(".profile__edit-info");
const addCardButton = document.querySelector(".profile__add-card");
const closePopupEditProfile = document.querySelector(
  ".popup__close_type_edit-profile"
);
const closePopupAddCard = document.querySelector(
  ".popup__close_type_add-place"
);
//Поля на странице
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
//Попапы
const popup = document.querySelector(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const formElementEditProfile = popupEditProfile.querySelector(
  ".popup__form_type_edit-profile"
);
const nameInput = formElementEditProfile.querySelector("#input-name");
const jobInput = formElementEditProfile.querySelector("#input-job");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const formElementAddplace = popupAddPlace.querySelector(
  ".popup__form_type_add-place"
);
const namePlaceInput = popupAddPlace.querySelector("#input-name-place");
const urlInput = popupAddPlace.querySelector("#input-url");
export const popupOpenedImage = document.querySelector(
  ".popup_type_opened-image"
);
export const closePopupOpenedImage = popupOpenedImage.querySelector(
  ".popup__close_type_opened-image"
);
const elmentsContainer = document.querySelector(".elements");

const popupList = Array.from(document.querySelectorAll(".popup"));
// открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener("click", closePopupOverlay);
}
editProfileButton.addEventListener("click", () => {
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
addCardButton.addEventListener("click", () => {
  openPopup(popupAddPlace);
});
// закрытие попа
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  document.removeEventListener("click", closePopupOverlay);
}
//закрытие попапа на оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    popupList.forEach((popup) => {
      closePopup(popup);
    });
  }
}
//закрытие попапа на Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((popup) => {
      closePopup(popup);
    });
  }
}
closePopupEditProfile.addEventListener("click", (evt) => {
  closePopup(popupEditProfile);
  closePopupOverlay(evt, popupEditProfile);
  console.log(evt);
});
closePopupAddCard.addEventListener("click", () => {
  closePopup(popupAddPlace);
  urlInput.value = "";
  namePlaceInput.value = "";
});

//Обработчик отправки формы
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formElementEditProfile.addEventListener("submit", handleFormSubmitProfile);

///////////////////////Добавляем карточки на страницу
initialElements.reverse().forEach((element) => {
  renderCard(element);
});
formElementAddplace.addEventListener("submit", handleFormSubmitCard);
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const newPlace = {
    name: namePlaceInput.value,
    link: urlInput.value,
  };
  renderCard(newPlace);
  closePopup(popupAddPlace);
  urlInput.value = "";
  namePlaceInput.value = "";
}

function renderCard(element) {
  const card = new Card(element, ".template-elements");
  const newCard = card.createCard();
  elmentsContainer.prepend(newCard);
}

/* initialCards.reverse().forEach((element) => {
  createCard(element);
});

formElementAddplace.addEventListener("submit", handleFormSubmitCard);
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const newPlace = {
    name: namePlaceInput.value,
    link: urlInput.value,
  };
  createCard(newPlace);
  closePopup(popupAddPlace);
  urlInput.value = "";
  namePlaceInput.value = "";
}

function createCard(card) {
  const cardTemplate = document.querySelector(".template-elements").content;
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImg = cardElement.querySelector(".elements__image");
  const cardName = cardElement.querySelector(".elements__title");
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardName.textContent = card.name;
  //обработчик лайка
  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
    });
  //удаление карточки
  cardElement
    .querySelector(".elements__delete")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });
  //открытие и закрытие попапа  с картинкой
  cardImg.addEventListener("click", () => {
    openPopup(popupOpenedImage);
    popupOpenedImage.querySelector(".popup__image").src = card.link;
    popupOpenedImage.querySelector(".popup__image").alt = card.name;
    popupOpenedImage.querySelector(".popup__text").textContent = card.name;
  });
  closePopupOpenedImage.addEventListener("click", () => {
    closePopup(popupOpenedImage);
  });
  renderCard(cardElement);
}

function renderCard(card) {
  elmentsContainer.prepend(card);
} */
