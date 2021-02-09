import '../auth-form/css/auth-err.css';
import axios from 'axios';
import { isLogIn } from '../auth-form/js/auth-form';
import { modalBackDrop } from '../modal-window/logic-modal';
import signInErr from '../auth-form/templates/sign-in-err.hbs';
import signUpErr from '../auth-form/templates/sign-up-err.hbs';

// axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const API_URL = 'https://api-project-575025675995.firebaseio.com';
const API_KEY = 'AIzaSyBagS6Xzts8IVgIgwZ3ER5WfdgPqLtF_DA';
const newUrl = 'https://callboard-backend-en.goit.global';

export const getUserInfo = userId => {
  return axios.get(`${newUrl}/user/${userId}`);
};

export const signInUser = signInUser => {
  return axios
    .post(`${newUrl}/auth/login`, {
      ...signInUser,
    })
    .then(async res => {
      let filteredFavorites = [];
      if (res.data.user.favourites[0]) {
        for (let i = 0; i < res.data.user.favourites.length; i++) {
          const call = await axios({
            method: 'GET',
            url: `${newUrl}/call/${res.data.user.favourites[i]._id}`,
            headers: { Authorization: res.data.token },
          });
          if (call.data.success) {
            filteredFavorites.push(res.data.user.favourites[i]);
          }
        }
      }
      localStorage.setItem(
        'user-info',
        JSON.stringify({
          userId: res.data.user.id,
          email: res.data.email,
          token: res.data.token,
          favorites: filteredFavorites,
          adv: res.data.user.calls.map(item => item._id),
        }),
      );
      isLogIn();
    })
    .catch(err => {
      setTimeout(() => {
        console.log(err);
        const closeModalErr = modalBackDrop(signInErr());
        document
          .querySelector('.auth-modal-err__close-btn')
          .addEventListener('click', closeModalErr);
      }, 300);
    });
};

export const signUpUser = ({
  firstName,
  secondName,
  email,
  phone,
  password,
}) => {
  return axios
    .post(`${newUrl}/auth/register`, {
      email,
      password,
      firstName,
      secondName,
      phone,
    })
    .catch(err => {
      setTimeout(() => {
        const closeModalErr = modalBackDrop(signUpErr());
        document
          .querySelector('.auth-modal-err__close-btn')
          .addEventListener('click', closeModalErr);
      }, 300);
    });
};

export const signOutUser = () => {
  axios({
    method: 'POST',
    url: `${newUrl}/auth/logout`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('user-info')).token,
    },
  });
  localStorage.clear();
};

export const updateUserAvatar = (id, obj, token) => {
  // return axios.patch(`${API_URL}/user/${id}.json?auth=${token}`, {
  return axios.patch(`${API_URL}/user/${id}.json`, {
    avatar: obj,
  });
};

// export const addUserAdv = (userId, advId, token) => {
//   // return axios.patch(`${API_URL}/user/${userId}/adv.json?auth=${token}`, {
//   return axios.patch(`${API_URL}/user/${userId}/adv.json`, {
//     [advId]: 'key',
//   });
// };

export const addUserFavourite = (userId, advId) => {
  // return axios.patch(`${API_URL}/user/${userId}/favourite.json?auth=${token}`, {
  return axios({
    method: 'POST',
    url: `${newUrl}/call/favourite/${advId}`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('user-info')).token,
    },
  });
};

export const deleteUserFavourite = (userId, advId, token) => {
  return axios({
    method: 'DELETE',
    url: `${newUrl}/call/favourite/${advId}`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('user-info')).token,
    },
  });
};

export const deleteUserAdv = (userId, advId, token) => {
  return axios({
    method: 'DELETE',
    url: `${newUrl}/call/${advId}`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('user-info')).token,
    },
  });
};
