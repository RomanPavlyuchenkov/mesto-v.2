const editProfileButton = document.querySelector(".profile__edit-info");
const addCardButton = document.querySelector(".profile__add-card");
const closePopupEditProfile = document.querySelector(
  ".popup__close_type_edit-profile"
);
const closePopupAddCard = document.querySelector(
  ".popup__close_type_add-place"
);
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popup = document.querySelector(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const formElementEditProfile = popupEditProfile.querySelector(
  ".popup__form_type_edit-profile"
);
const nameInput = formElementEditProfile.querySelector("#input-name");
const jobInput = formElementEditProfile.querySelector("#input-job");
const formElementAddplace = popupAddPlace.querySelector(
  ".popup__form_type_add-place"
);
const namePlaceInput = popupAddPlace.querySelector("#input-name-place");
const urlInput = popupAddPlace.querySelector("#input-url");
const elmentsContainer = document.querySelector(".elements");
const popupOpenedImage = document.querySelector(".popup_type_opened-image");
const closePopupOpenedImage = popupOpenedImage.querySelector(
  ".popup__close_type_opened-image"
);
// открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
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
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
closePopupEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
closePopupAddCard.addEventListener("click", () => {
  closePopup(popupAddPlace);
});
closePopupOpenedImage.addEventListener("click", () => {
  closePopup(popupOpenedImage);
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
initialCards.reverse().forEach((element) => {
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
  //открытие попапа  с картинкой
  cardImg.addEventListener("click", () => {
    popupOpenedImage.classList.add("popup_opened");
    popupOpenedImage.querySelector(".popup__image").src = card.link;
    popupOpenedImage.querySelector(".popup__image").alt = card.name;
    popupOpenedImage.querySelector(".popup__text").textContent = card.name;
  });
  renderCard(cardElement);
}

function renderCard(card) {
  elmentsContainer.prepend(card);
}
