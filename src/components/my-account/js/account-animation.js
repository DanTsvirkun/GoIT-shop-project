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

// ============================================================================

const animateCSS = () => {
  new Promise((resolve, reject) => {
    const userFavoritesList = document.querySelector('.selected-goods__item');

    userFavoritesList.classList.add(
      'animate__animated',
      'animate__backOutLeft',
    );

    function handleAnimationEnd() {
      userFavoritesList.classList.remove(
        'animate__animated',
        'animate__backOutLeft',
      );
      userFavoritesList.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    userFavoritesList.addEventListener('animationend', handleAnimationEnd);
  });
};

// ============================================================================

export {
  animationOpenModal,
  animationCloseModal,
  animationOpenFavorites,
  animationCloseFavorites,
  animationOpenMyAds,
  animationCloseMyAds,
  animateCSS,
};
