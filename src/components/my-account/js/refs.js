export const refs = {
  btnOpenModal: document.querySelector('.account-btn'),
  hbsUserAvatar: document.querySelector('.js-avatar'),
  hbsUserInfo: document.querySelector('.user-info'),
  userFavoritesList: document.querySelector('.selected-goods__list'),
  userAdsList: document.querySelector('.my-ads__list'),

  openFavorites: document.querySelector('.account-list__favorites'),
  openMyAds: document.querySelector('.account-list__advertisement'),

  modalBackdropMyAccount: document.querySelector(
    '.moodal-backdrop__my-account',
  ),
  modalBackdropFavorites: document.querySelector('.moodal-backdrop__favorites'),
  modalBackdropMyAds: document.querySelector('.moodal-backdrop__my-ads'),

  closeBtnAccount: document.querySelector('.close__my-account'),
  closeBtnFavorites: document.querySelector('.close__favorites'),
  closeBtnMyAds: document.querySelector('.close__my-ads'),

  logoutAccount: document.querySelector('.account-logout'),

  accountWrapper: document.querySelector('.account-wrapper'),
  selectedGoodsInner: document.querySelector('.selected-goods__inner'),
  myAdsInner: document.querySelector('.my-ads__inner'),

  fileInput: document.querySelector('.user-avatar__file-input'),
  // avatarImg: document.querySelectorAll('.avatar'),
  addAvatarBtn: document.querySelector('.user-avatar__add-btn'),
  clearAvatarBtn: document.querySelector('.user-avatar__clear-btn'),

  favoritesValue: document.querySelector('.js-counter__heart'),
  myAdsValue: document.querySelector('.js-counter__add'),
};
