export function renderLoading(selector, isLoading, text = "Сохранить") {
  const popup = document.querySelector(selector);
  if (isLoading) {
    popup.querySelector(".popup__button").textContent = "Сохранение...";
  } else {
    popup.querySelector(".popup__button").textContent = text;
  }
}
