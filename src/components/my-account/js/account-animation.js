function animationOpenModal() {
  const accountWrapper = document.querySelector('.account-wrapper');
  accountWrapper.classList.add('animate__animated', 'animate__fadeInDown');
}

function animationCloseModal() {
  const accountWrapper = document.querySelector('.account-wrapper');
  accountWrapper.classList.remove('animate__animated', 'animate__fadeInDown');
}

function animationOpenFavorites() {
  const selectedGoodsInner = document.querySelector('.selected-goods__inner');
  selectedGoodsInner.classList.add('animate__animated', 'animate__backInDown');
}

function animationCloseFavorites() {
  const selectedGoodsInner = document.querySelector('.selected-goods__inner');
  selectedGoodsInner.classList.remove(
    'animate__animated',
    'animate__backInDown',
  );
}

function animationOpenMyAds() {
  const myAdsInner = document.querySelector('.my-ads__inner');
  myAdsInner.classList.add('animate__animated', 'animate__backInDown');
}

function animationCloseMyAds() {
  const myAdsInner = document.querySelector('.my-ads__inner');
  myAdsInner.classList.remove('animate__animated', 'animate__backInDown');
}

export {
  animationOpenModal,
  animationCloseModal,
  animationOpenFavorites,
  animationCloseFavorites,
  animationOpenMyAds,
  animationCloseMyAds,
};
