import '../css/auth-style.css';
import '../css/auth-form.css';

import {
  getUserInfo,
  signInUser,
  signUpUser,
  signOutUser,
} from '../../services/user-api';

import refs from '../../header-main/js/refs';
import signIn from '../templates/sign-in.hbs';
import signUp from '../templates/sign-up.hbs';
import signInUp from '../templates/sign-in-up.hbs';
import { modalBackDrop } from '../../modal-window/logic-modal';
import { markupIncomeBtn } from '../../my-account/js/markup-account';

const signInUpDiv = refs.authBlock;
const signInUpDivMob = refs.authBlockMobile;

let closeAuthModal;
let repeatPass;
let signInForm;
let signUpForm;
let signOutForm;

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
      markupIncomeBtn(res.data);

      signOutForm = document.querySelector('.auth-form-sign-out');
      signOutForm.addEventListener('click', hendelSignOut);
      // signOutForm[1].addEventListener('click', hendelSignOut);
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

function hendelSubmitSignIn(e, closeModal) {
  e.preventDefault();
  signInUser(inputData.userSignIn).then(() => closeModal());
}

function hendelSubmitSignUp(e, closeModal) {
  e.preventDefault();

  if (inputData.userSignUp.password === inputData.userSignUp.passwordRepeat) {
    signUpUser(inputData.userSignUp).then(() => closeModal());
  }
}

function hendelSignOut(e) {
  signOutUser();
  isLogIn();
}
