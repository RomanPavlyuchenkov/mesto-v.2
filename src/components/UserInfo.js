export default class UserInfo {
  constructor(config) {
    this._userName = document.querySelector(config.name);
    this._userInfo = document.querySelector(config.about);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }
}
