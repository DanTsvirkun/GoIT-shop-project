import './css/main.css';
import {
  getUserInfo,
  signInUser,
  signUpUser,
  signOutUser,
  updateUserAvatar,
  addUserAdv,
  addUserFavourite,
} from './components/services/user-api';

import signIn from './components/auth-form/templates/sign-in.hbs';
import signUp from './components/auth-form/templates/sign-up.hbs';
import signInUp from './components/auth-form/templates/sign-in-up.hbs';

const signInUpBtn = document.querySelector('.sign-in-up');
const authForm = document.querySelector('.auth-form');
const signInUpDiv = document.querySelector('.sign-in-up');

let signInForm;
let signUpForm;

signInUpBtn.addEventListener('click', hendelClickSignInUp);

function hendelClickSignInUp(e) {
  if (e.target.nodeName === 'BUTTON') {
    murkupAuthForm(e.target.textContent);
  }
}

function murkupAuthForm(btnText) {
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

function isLogIn() {
  setTimeout(() => {
    if (localStorage.getItem('user-info')) {
      console.log('i am login');
      signInUpDiv.innerHTML = ``;
    } else {
      console.log('i am not login');
      signInUpDiv.innerHTML = `${signInUp()}`;
    }
  }, 500);
}
isLogIn();

const userInfoHtml = document.querySelector('.user-info');
const resultIMG = document.querySelector('.resultIMG');
const signOutForm = document.querySelector('.auth-form-sign-out');

signOutForm.addEventListener('click', hendelSignOut);

const inputData = {
  userSignIn: {},
  userSignUp: {},
};

function hendelInputSave(e) {
  inputData[e.currentTarget.name][e.target.name] = e.target.value;
}

function hendelSubmitSignIn(e) {
  e.preventDefault();
  signInUser(inputData.userSignIn);

  authForm.innerHTML = ``;
  isLogIn();
}

function hendelSubmitSignUp(e) {
  e.preventDefault();
  signUpUser(inputData.userSignUp);

  authForm.innerHTML = ``;
  isLogIn();
}

function hendelSignOut(e) {
  signOutUser();

  authForm.innerHTML = ``;
  isLogIn();
}

function userInfo() {
  if (localStorage.getItem('user-info')) {
    const localUserId = JSON.parse(localStorage.getItem('user-info')).userId;
    getUserInfo(localUserId).then(res => showUserInfo(res.data));
  }
}
userInfo();

function showUserInfo(obj) {
  userInfoHtml.innerHTML = `Здравствуйте: ${obj.firstName} ${obj.secondName}. Эмейл: ${obj.email}. Телефон: ${obj.phone}`;
  if (obj.avatar) {
    resultIMG.src = obj.avatar;
  }
}

// AVATAR
const fileForm = document.forms.fileForm;

function toDataURL(element) {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(element.files[0]);
  });
}

const createbase = e => {
  e.preventDefault();

  const element = fileForm.elements.fileFormInput;

  toDataURL(element).then(data => {
    const localUserId = JSON.parse(localStorage.getItem('user-info')).userId;
    updateUserAvatar(localUserId, data);
  });
};

fileForm.addEventListener('submit', createbase);
