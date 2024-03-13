export default class UserInfo {
  constructor(config) {
    this._userName = document.querySelector(config.name);
    this._userInfo = document.querySelector(config.info);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };
  }
  setUserInfo({ name, info }) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}
