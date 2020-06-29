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

const userInfoHtml = document.querySelector('.user-info');
const resultIMG = document.querySelector('.resultIMG');
const signInForm = document.querySelector('.auth-form-sign-in');
const signUpForm = document.querySelector('.auth-form-sign-up');
const signOutForm = document.querySelector('.auth-form-sign-out');

signInForm.addEventListener('input', hendelInputSave);
signInForm.addEventListener('submit', hendelSubmitSignIn);

signUpForm.addEventListener('input', hendelInputSave);
signUpForm.addEventListener('submit', hendelSubmitSignUp);

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

  testLog();
}

function hendelSubmitSignUp(e) {
  e.preventDefault();
  signUpUser(inputData.userSignUp);

  testLog();
}

function hendelSignOut(e) {
  signOutUser();

  testLog();
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

testLog();
function testLog() {
  setTimeout(() => {
    if (localStorage.getItem('user-info')) {
      console.log('i am login');
    } else {
      console.log('i am not login');
    }
  }, 1000);
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
