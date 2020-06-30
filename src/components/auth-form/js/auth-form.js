import {
  getUserInfo,
  signInUser,
  signUpUser,
  signOutUser,
  updateUserAvatar,
  addUserAdv,
  addUserFavourite,
} from '../../services/user-api';

import refs from '../../header-main/js/refs';
import signIn from '../templates/sign-in.hbs';
import signUp from '../templates/sign-up.hbs';
import signInUp from '../templates/sign-in-up.hbs';
import accMenu from '../templates/acc-menu.hbs';
import signOut from '../templates/sign-out.hbs';
import { modalBackDrop } from '../../modal-window/logic-modal';

const signInUpDiv = refs.authBlock;
const signInUpDivMob = refs.authBlockMobile;
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
      murkupAuthForm(e.target.textContent);
    }
  }
}

function murkupAuthForm(btnText) {
  if (btnText === 'Вход') {
    const closeModal = modalBackDrop(signIn());

    signInForm = document.querySelector('.auth-form-sign-in');
    signInForm.addEventListener('input', hendelInputSave);
    signInForm.addEventListener('submit', e =>
      hendelSubmitSignIn(e, closeModal),
    );
  } else {
    const closeModal = modalBackDrop(signUp());

    signUpForm = document.querySelector('.auth-form-sign-up');
    signUpForm.addEventListener('input', hendelInputSave);
    signUpForm.addEventListener('submit', e =>
      hendelSubmitSignUp(e, closeModal),
    );
  }
}

function isLogIn() {
  setTimeout(() => {
    if (localStorage.getItem('user-info')) {
      console.log('i am login');

      const localUserId = JSON.parse(localStorage.getItem('user-info')).userId;
      getUserInfo(localUserId).then(res => {
        signInUpDiv.innerHTML = `${accMenu(res.data)}${signOut()}`;
        signInUpDivMob.innerHTML = `${accMenu(res.data)}${signOut()}`;
        signOutForm = document.querySelector('.auth-form-sign-out');
        signOutForm.addEventListener('click', hendelSignOut);
      });
    } else {
      console.log('i am not login');
      signInUpDiv.innerHTML = `${signInUp()}`;
      signInUpDivMob.innerHTML = `${signInUp()}`;
    }
  }, 1000);
}
isLogIn();

const inputData = {
  userSignIn: {},
  userSignUp: {
    avatar:
      'data:image/jpeg;base64,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',
  },
};

function hendelInputSave(e) {
  inputData[e.currentTarget.name][e.target.name] = e.target.value;
}

function hendelSubmitSignIn(e, closeModal) {
  e.preventDefault();
  signInUser(inputData.userSignIn).then(() => closeModal());

  isLogIn();
}

function hendelSubmitSignUp(e, closeModal) {
  e.preventDefault();
  signUpUser(inputData.userSignUp).then(() => closeModal());

  isLogIn();
}

function hendelSignOut(e) {
  signOutUser();
  isLogIn();
}

// const userInfoHtml = document.querySelector('.user-info');
// const resultIMG = document.querySelector('.resultIMG');

// function userInfo() {
//   if (localStorage.getItem('user-info')) {
//     const localUserId = JSON.parse(localStorage.getItem('user-info')).userId;
//     getUserInfo(localUserId).then(res => showUserInfo(res.data));
//   }
// }
// userInfo();

// function showUserInfo(obj) {
//   userInfoHtml.innerHTML = `Здравствуйте: ${obj.firstName} ${obj.secondName}. Эмейл: ${obj.email}. Телефон: ${obj.phone}`;
// }

// AVATAR
// const fileForm = document.forms.fileForm;

// function toDataURL(element) {
//   return new Promise(resolve => {
//     const reader = new FileReader();

//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(element.files[0]);
//   });
// }

// const createbase = e => {
//   e.preventDefault();

//   const element = fileForm.elements.fileFormInput;

//   toDataURL(element).then(data => {
//     const localUserObj = JSON.parse(localStorage.getItem('user-info'));
//     updateUserAvatar(localUserObj.userId, data, localUserObj.token);
//   });
// };

// fileForm.addEventListener('submit', createbase);
