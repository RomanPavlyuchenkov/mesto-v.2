const editInfoButton = document.querySelector(".profile__edit-info");
const closePopupButton = document.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popup = document.querySelector(".popup");
const formElement = popup.querySelector(".popup__form");
const nameInput = formElement.querySelector("#input-name");
const jobInput = formElement.querySelector("#input-job");

// открытие попапа
function handleOpenPopup() {
  popup.classList.add("popup__opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
editInfoButton.addEventListener("click", handleOpenPopup);
// закрытие попа
function handleClosePopup() {
  popup.classList.remove("popup__opened");
}
closePopupButton.addEventListener("click", handleClosePopup);
//Обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClosePopup();
}
formElement.addEventListener("submit", handleFormSubmit);
