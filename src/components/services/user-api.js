import axios from 'axios';
import { isLogIn } from '../auth-form/js/auth-form';

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const API_URL = 'https://api-project-575025675995.firebaseio.com';
const API_KEY = 'AIzaSyBagS6Xzts8IVgIgwZ3ER5WfdgPqLtF_DA';

export const getUserInfo = userId => {
  return axios.get(`${API_URL}/user/${userId}.json`);
};

export const signInUser = signInUser => {
  return axios
    .post(`:signInWithPassword?key=${API_KEY}`, {
      ...signInUser,
      returnSecureToken: true,
    })
    .then(res => {
      if (res.status === 200) {
        getUserInfo('').then(userArr => {
          const foundUser = Object.values(userArr.data).find(
            user => user.email === res.data.email,
          );

          let favArray = [];
          let advArray = [];

          if (foundUser.favourite) {
            favArray = Object.keys(foundUser.favourite);
          }

          if (foundUser.adv) {
            advArray = Object.keys(foundUser.adv);
          }

          localStorage.setItem(
            'user-info',
            JSON.stringify({
              userId: foundUser.userId,
              email: res.data.email,
              token: res.data.idToken,
              favorites: favArray,
              adv: advArray,
            }),
          );
          isLogIn();
        });
      }
    })
    .catch(err => console.log(err));
};

export const signUpUser = ({
  firstName,
  secondName,
  email,
  phone,
  password,
  avatar,
}) => {
  return axios
    .post(`:signUp?key=${API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    .then(res => {
      if (res.status === 200) {
        axios
          .post(`${API_URL}/user.json?auth=${res.data.idToken}`, {
            firstName,
            secondName,
            email,
            phone,
            avatar,
          })
          .then(resId =>
            localStorage.setItem(
              'user-info',
              JSON.stringify({
                userId: resId.data.name,
                email: res.data.email,
                token: res.data.idToken,
                favorites: [],
                adv: [],
              }),
              axios
                .patch(
                  `${API_URL}/user/${resId.data.name}.json?auth=${res.data.idToken}`,
                  {
                    userId: resId.data.name,
                  },
                )
                .then(() => isLogIn()),
            ),
          );
      }
    })
    .catch(err => console.log(err));
};

export const signOutUser = () => {
  localStorage.clear();
};

export const updateUserAvatar = (id, obj, token) => {
  return axios.patch(`${API_URL}/user/${id}.json?auth=${token}`, {
    avatar: obj,
  });
};

export const addUserAdv = (userId, advId, token) => {
  return axios.patch(`${API_URL}/user/${userId}/adv.json?auth=${token}`, {
    [advId]: 'key',
  });
};

export const addUserFavourite = (userId, advId, token) => {
  return axios.patch(`${API_URL}/user/${userId}/favourite.json?auth=${token}`, {
    [advId]: 'key',
  });
};

export const deleteUserFavourite = (userId, advId, token) => {
  return axios.delete(
    `${API_URL}/user/${userId}/favourite/${advId}.json?auth=${token}`,
  );
};
