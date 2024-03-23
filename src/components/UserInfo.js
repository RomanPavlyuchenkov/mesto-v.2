export default class UserInfo {
  constructor(config) {
    this._userName = document.querySelector(config.name);
    this._userInfo = document.querySelector(config.about);
    this._userAvatar = document.querySelector(config.avatar);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
    };
  }
  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._userInfo.textContent = user.about;
    this._userAvatar.src = user.avatar;
  }
  updateAvatar(avatar) {
    this._userAvatar.src = avatar.avatar;
  }
}
