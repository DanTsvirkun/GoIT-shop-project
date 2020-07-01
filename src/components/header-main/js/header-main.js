import '../css/header-main.css';
import refs from './refs.js';
import categoriesList from '../templates/categories.hbs';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

const testArrayFromBack = [
  'Недвижимость',
  'Транспорт',
  'Работа',
  'Электроника',
  'Бизнес и услуги',
  'Отдых и спорт',
  'Отдам бесплатно',
  'Обмен',
];

function markupAuthForm(btnText) {
  if (btnText === 'Вход') {
    authForm.innerHTML = `${signIn()}`;
    signInForm = document.querySelector('.auth-form-sign-in');
    signInForm.addEventListener('input', hendelInputSave);
    signInForm.addEventListener('submit', hendelSubmitSignIn);
  } else {
    authForm.innerHTML = `${signUp()}`;
    signUpForm = document.querySelector('.auth-form-sign-up');
    signUpForm.addEventListener('input', hendelInputSave);
    signUpForm.addEventListener('submit', hendelSubmitSignUp);
  }
}

const categoriesMarkup = categoriesList(testArrayFromBack);

refs.categories.insertAdjacentHTML('beforeend', categoriesMarkup);

// const authBlockMarkup = loginRegister();
// const authBlockMarkup = cabinet();

// refs.authBlockMobile.insertAdjacentHTML('beforeend', authBlockMarkup);
// refs.authBlock.insertAdjacentHTML('beforeend', authBlockMarkup);

refs.categories.addEventListener('click', activeCategory);
refs.categoriesMobile.addEventListener('click', activeCategory);
refs.categoriesTablet.addEventListener('click', activeCategory);

refs.clearBlock.addEventListener('click', clearActiveCategory);
refs.clearBlockMobile.addEventListener('click', clearActiveCategory);

refs.mobileFiltersBtn.addEventListener('click', showMobileFilters);
refs.mobileBurger.addEventListener('click', showMobileMenu);
refs.mobileSearch.addEventListener('click', showMobileInput);

refs.cross.addEventListener('click', closeMobileMenu);

refs.tabletFiltersBtn.addEventListener('click', showTabletFilters);

function activeCategory(e) {
  if (e.target.nodeName === 'BUTTON') {
    clearActiveCategory();
    if (e.target.classList.contains('active-category')) {
      return;
    }
    e.target.classList.add('active-category');
  }
}

function clearActiveCategory() {
  if (document.querySelector('.active-category')) {
    let activeCategoryATM = document.querySelector('.active-category');
    activeCategoryATM.classList.remove('active-category');
  }
}

function showMobileFilters() {
  if (refs.categoriesMobile.innerHTML === '') {
    refs.categoriesMobile.innerHTML = categoriesMarkup;
  } else {
    refs.categoriesMobile.innerHTML = '';
  }
}

function showMobileMenu() {
  refs.body.style.overflow = 'hidden';
  refs.mobileMenuClosed.classList.add('mobile-menu-opened');
}

function closeMobileMenu() {
  refs.body.style.overflow = 'unset';
  refs.mobileMenuClosed.classList.remove('mobile-menu-opened');
}

function showMobileInput() {
  refs.mobileInput.classList.add('mobile-input');
  refs.inputSearch.style.display = 'unset';
  refs.inputCross.style.display = 'unset';
  refs.inputCross.addEventListener('click', closeMobileInput);
}

function closeMobileInput() {
  refs.mobileInput.classList.remove('mobile-input');
  refs.inputSearch.style.display = 'none';
  refs.inputCross.style.display = 'none';
  refs.inputCross.removeEventListener('click', closeMobileInput);
}

function showTabletFilters() {
  if (refs.categoriesTablet.innerHTML === '') {
    refs.categoriesTablet.style.display = 'flex';
    refs.categoriesTablet.innerHTML = categoriesMarkup;
  } else {
    refs.categoriesTablet.innerHTML = '';
    refs.categoriesTablet.style.display = 'none';
  }
}

window.addEventListener(
  'resize',
  throttle(() => {
    refs.categoriesTablet.style.display = 'none';
  }, 1000),
);

const touchStart = throttle(handleTouchStart, 500);
const touchMove = throttle(handleTouchMove, 500);

if (window.matchMedia('(max-width: 767px)').matches) {
  refs.header.addEventListener('touchstart', touchStart);
  document.addEventListener('touchmove', touchMove);
}

window.addEventListener(
  'resize',
  debounce(() => {
    refs.header.removeEventListener('touchstart', touchStart);
    document.removeEventListener('touchmove', touchMove);

    if (window.matchMedia('(max-width: 767px)').matches) {
      refs.header.addEventListener('touchstart', touchStart);
      document.addEventListener('touchmove', touchMove);
    }
  }, 500),
);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      closeMobileMenu();
    } else {
      showMobileMenu();
    }
  } else {
    if (yDiff > 0) {
      return;
    } else {
      return;
    }
  }
  xDown = null;
  yDown = null;
}
