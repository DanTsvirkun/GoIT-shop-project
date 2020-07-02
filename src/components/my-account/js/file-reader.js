import { refs } from './refs';

refs.fileInput.addEventListener('change', hendleChange);
refs.clearAvatarBtn.addEventListener('click', resetForDefault);

function hendleChange(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    document
      .querySelectorAll('.avatar')
      .forEach(img => (img.src = reader.result));
  };

  file ? reader.readAsDataURL(file) : (refs.avatarImg.src = '');
}

function resetForDefault() {
  const srcDefault = 'https://i.ibb.co/K7j3rZk/99-512.png'; // change default static img for server img
  document.querySelectorAll('.avatar').forEach(img => (img.src = srcDefault));
}

// =======================LOCALSTORAGE=======================

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
//     const localUserId = JSON.parse(localStorage.getItem('user-info')).userId;
//     updateUserAvatar(localUserId, data);
//   });
// };

// fileForm.addEventListener('submit', createbase);

// function userInfo() {
//   if (localStorage.getItem('user-info')) {
//     const localUserId = JSON.parse(localStorage.getItem('user-info')).userId;
//     getUserInfo(localUserId).then(res => showUserInfo(res.data));
//   }
// }
// userInfo();

// function showUserInfo(obj) {
//   userInfoHtml.innerHTML = `Здравствуйте: ${obj.firstName} ${obj.secondName}. Эмейл: ${obj.email}. Телефон: ${obj.phone}`;
//   if (obj.avatar) {
//     resultIMG.src = obj.avatar;
//   }
// }

// localStorage.setItem(
//   'user-info',
//   JSON.stringify({
//     userId: foundUser.userId,
//     email: res.data.email,
//     // token: res.data.idToken,
//   }),
// );

// testLog();
// function testLog() {
//   setTimeout(() => {
//     if (localStorage.getItem('user-info')) {
//       console.log('i am login');
//     } else {
//       console.log('i am not login');
//     }
//   }, 1000);
// }
