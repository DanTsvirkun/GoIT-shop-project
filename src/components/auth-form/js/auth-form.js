import '../css/auth-style.css';
import '../css/auth-form.css';

import { getUserInfo, signInUser, signUpUser } from '../../services/user-api';

import refs from '../../header-main/js/refs';
import signIn from '../templates/sign-in.hbs';
import signUp from '../templates/sign-up.hbs';
import signInUp from '../templates/sign-in-up.hbs';
import accMenu from '../templates/acc-menu.hbs';
import { openAcc, openAccMob } from '../../my-account/js/my-modal-window';
import { modalBackDrop } from '../../modal-window/logic-modal';

let closeAuthModal;
let repeatPass;
let signInForm;
let goToRegister;
let signUpForm;

const signInUpDiv = refs.authBlock;
const signInUpDivMob = refs.authBlockMobile;

signInUpDiv.addEventListener('click', hendelClickSignInUp);
signInUpDivMob.addEventListener('click', hendelClickSignInUp);

function hendelClickSignInUp(e) {
  if (!localStorage.getItem('user-info')) {
    if (
      e.target.dataset.btn === 'signin' ||
      e.target.dataset.btn === 'signup'
    ) {
      murkupAuthForm(e.target.dataset.btn);
    }
  }
}

export function murkupAuthForm(dataset) {
  if (dataset === 'signin') {
    const closeModal = modalBackDrop(signIn());
    closeAuthModal = document.querySelector('.auth-modal__close-btn');
    closeAuthModal.addEventListener('click', closeModal);

    signInForm = document.querySelector('.auth-form-sign-in');
    signInForm.addEventListener('input', hendelInputSave);
    signInForm.addEventListener('submit', e =>
      hendelSubmitSignIn(e, closeModal),
    );
    goToRegister = document.querySelector('.js-go-to-register');
    goToRegister.addEventListener('click', hendelGoToRegister);
  } else {
    const closeModal = modalBackDrop(signUp());
    repeatPass = document.querySelector('.auth-modal__input-repeat');
    closeAuthModal = document.querySelector('.auth-modal__close-btn');
    closeAuthModal.addEventListener('click', closeModal);

    signUpForm = document.querySelector('.auth-form-sign-up');
    signUpForm.addEventListener('input', hendelInputSave);
    signUpForm.addEventListener('submit', e =>
      hendelSubmitSignUp(e, closeModal),
    );
  }
}

export function isLogIn() {
  if (localStorage.getItem('user-info')) {
    const localUserId = JSON.parse(localStorage.getItem('user-info')).userId;

    getUserInfo(localUserId).then(res => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        signInUpDivMob.innerHTML = `${accMenu(res.data)}`;
        openAccMob(res.data);
      } else {
        signInUpDiv.innerHTML = `${accMenu(res.data)}`;
        openAcc(res.data);
      }
    });
  } else {
    signInUpDiv.innerHTML = `${signInUp()}`;
    signInUpDivMob.innerHTML = `${signInUp()}`;
  }
}
isLogIn();

const inputData = {
  userSignIn: {},
  userSignUp: {
    avatar: 'https://i.ibb.co/K7j3rZk/99-512.png',
  },
};

function hendelInputSave(e) {
  inputData[e.currentTarget.name][e.target.name] = e.target.value;

  if (!(inputData.userSignUp.passwordRepeat === undefined)) {
    inputData.userSignUp.password === inputData.userSignUp.passwordRepeat
      ? (repeatPass.style.border = '1px solid green')
      : (repeatPass.style.border = '1px solid red');
  }
}

function hendelGoToRegister() {
  murkupAuthForm('signup');
}

function hendelSubmitSignIn(e, closeModal) {
  e.preventDefault();
  signInUser(inputData.userSignIn).then(() => closeModal());
}

function hendelSubmitSignUp(e, closeModal) {
  e.preventDefault();

  const inputs = document.querySelectorAll('.auth-modal__input');
  inputs[0].style.border = '1px solid rgb(206, 210, 209)';
  inputs[1].style.border = '1px solid rgb(206, 210, 209)';
  inputs[2].style.border = '1px solid rgb(206, 210, 209)';
  inputs[3].style.border = '1px solid rgb(206, 210, 209)';
  inputs[4].style.border = '1px solid rgb(206, 210, 209)';

  if (inputData.userSignUp.firstName.trim() === '') {
    inputs[0].style.border = '1px solid red';
    return;
  }

  if (inputData.userSignUp.secondName.trim() === '') {
    inputs[1].style.border = '1px solid red';
    return;
  }

  if (inputData.userSignUp.email.trim() === '') {
    inputs[2].style.border = '1px solid red';
    return;
  }

  if (inputData.userSignUp.phone.trim() === '') {
    inputs[3].style.border = '1px solid red';
    return;
  }

  if (inputData.userSignUp.password.trim() === '') {
    inputs[4].style.border = '1px solid red';
    return;
  }

  inputData.userSignUp.firstName = inputData.userSignUp.firstName.trim();
  inputData.userSignUp.secondName = inputData.userSignUp.secondName.trim();
  inputData.userSignUp.email = inputData.userSignUp.email.trim();
  inputData.userSignUp.phone = inputData.userSignUp.phone.trim();
  inputData.userSignUp.password = inputData.userSignUp.password.trim();

  if (inputData.userSignUp.password === inputData.userSignUp.passwordRepeat) {
    signUpUser(inputData.userSignUp).then(() => closeModal());
  }
}
