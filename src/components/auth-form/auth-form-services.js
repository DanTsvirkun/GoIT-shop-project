import './auth-form.css';
import templateSignInForm from '../auth-form/template-auth-form-sign-in.js';
import templateSignUpForm from '../auth-form/template-auth-form-sign-up.js';

const burgerButton = document.querySelector('.mobile-burger');

const modalWindow = document.querySelector('.js-lightbox');
const authFormWrapper = document.querySelector('.auth-form');

// let myTarget;
let contentAuth = '';

function openModalSignIn(e) {
  e.preventDefault();
  // myTarget = e.target;

  modalWindow.classList.add('is-open');
  window.addEventListener('keydown', changeImageInModal);
  contentAuth = templateSignInForm();
  authFormWrapper.insertAdjacentHTML('afterbegin', contentAuth);

  document.querySelector('.close-modal').addEventListener('click', closeModal);
}

function openModalSignUp(e) {
  e.preventDefault();
  // myTarget = e.target;
  contentAuth = templateSignUpForm();
  modalWindow.classList.add('is-open');
  window.addEventListener('keydown', changeImageInModal);

  authFormWrapper.insertAdjacentHTML('afterbegin', contentAuth);

  document.querySelector('.close-modal').addEventListener('click', closeModal);
}

function closeModal() {
  modalWindow.classList.remove('is-open');
  window.removeEventListener('keydown', changeImageInModal);
  contentAuth = '';
}

function changeImageInModal(e) {
  switch (e.key) {
    case 'Escape':
      closeModal();
      break;
  }
}

const signInButton = document.querySelector('.header-auth__signin');
const signUpButton = document.querySelector('.header-auth__signup');

signInButton.addEventListener('click', openModalSignIn);
signUpButton.addEventListener('click', openModalSignUp);

const signInButtonForm = document.querySelector('.sign-in-button');
const toRegButton = document.querySelector('.to-reg-button');
const passwordInput = document.querySelector('[name=password-check]');
const emailInput = document.querySelector('[name=email-check]');

console.log(signInButtonForm);

const sendForm = () => {
  event.preventDefault();

  let user = {};
  user.email = emailInput.value;
  user.password = passwordInput.value;
  user.date = Date.now();
  console.log(user);
};

// signInButtonForm.addEventListener('click', sendForm);

let firstNameReg = document.querySelector('[name=first-name]');
let secondNameReg = document.querySelector('[name=second-name]');
let emailReg = document.querySelector('[name=email]');
let passwordReg = document.querySelector('[name=password]');
let regOkButton = document.querySelector('.reg-button');
let cancelButton = document.querySelector('.cancel-button');
// console.log(regOkButton);

class NewUser {
  constructor(name, surname, email, password, date) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.date = date;
  }
}

let usersArray = [];

const sendFormNewUser = () => {
  event.preventDefault();
  let user = new NewUser(
    `${firstNameReg.value}`,
    `${secondNameReg.value}`,
    `${emailReg.value}`,
    `${passwordReg.value}`,
    new Date(),
  );
  // user.name = firstNameReg.value;
  // user.surname = secondNameReg.value;
  // user.email = emailReg.value;
  // user.password = passwordReg.value;
  // user.date = new Date();
  console.log(user);
  usersArray[1] = user;
  console.log(usersArray);
};

// regOkButton.addEventListener('click', sendFormNewUser);
