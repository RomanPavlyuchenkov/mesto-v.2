export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me `, {
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }

  updateUserInfo(info) {
    return fetch(`${this._url}/users/me `, {
      method: "PATCH",
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(avatar),
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-type": "application/json",
      },
    }).then(this._handleResponse);
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка:${res.status}`);
    }
  }
}
