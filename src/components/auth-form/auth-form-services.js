import '../auth-form/auth-form-styles.css';
document
  .querySelector('header')
  .insertAdjacentHTML('afterbegin', `<div class="authorization"></div>`);

import templateSignIn from '../auth-form/template-sign-in.js';
import templateSignUp from '../auth-form/template-sign-up.js';

document
  .querySelector('.authorization')
  .insertAdjacentHTML('afterbegin', templateSignIn());

let signInButton = document.querySelector('.sign-in-button');
let toRegButton = document.querySelector('.to-reg-button');
let passwordInput = document.querySelector('[name=password]');
let emailInput = document.querySelector('[name=email]');

const sendForm = e => {
  event.preventDefault(e);

  let user = {};
  user.email = emailInput.value;
  user.password = passwordInput.value;
  user.date = new Date();
  console.log(user);
};

signInButton.addEventListener('click', sendForm);

document
  .querySelector('.authorization')
  .insertAdjacentHTML('beforeend', templateSignUp());

let firstNameReg = document.querySelector('[name=firstName]');
let secondNameReg = document.querySelector('[name=secondName]');
let emailReg = document.querySelector('[name=email]');
let phoneReg = document.querySelector('[name=phone]');
let passwordReg = document.querySelector('[name=password]');
let regOkButton = document.querySelector('.reg-button');
let cancelButton = document.querySelector('.cancel-button');

class NewUser {
  constructor(name, surname, email, phone, password, date) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.date = date;
  }
}

export const createUser = () => {
  event.preventDefault();
  let userReg = new NewUser(
    `${firstNameReg.value}`,
    `${secondNameReg.value}`,
    `${emailReg.value}`,
    `${phoneReg.value}`,
    `${passwordReg.value}`,
    new Date(),
  );
  console.log(userReg);
};

regOkButton.addEventListener('click', createUser);
