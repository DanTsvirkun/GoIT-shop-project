import { refs } from './refs';

function animationOpenModal() {
  refs.accountWrapper.classList.add('animate__animated', 'animate__fadeInDown');
}

function animationCloseModal() {
  refs.accountWrapper.classList.remove(
    'animate__animated',
    'animate__fadeInDown',
  );
}

function animationOpenFavorites() {
  refs.selectedGoodsInner.classList.add(
    'animate__animated',
    'animate__backInDown',
  );
}

function animationCloseFavorites() {
  refs.selectedGoodsInner.classList.remove(
    'animate__animated',
    'animate__backInDown',
  );
}

function animationOpenMyAds() {
  refs.myAdsInner.classList.add('animate__animated', 'animate__backInDown');
}

function animationCloseMyAds() {
  refs.myAdsInner.classList.remove('animate__animated', 'animate__backInDown');
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
