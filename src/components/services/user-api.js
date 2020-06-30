import axios from 'axios';

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const API_URL = 'https://api-project-575025675995.firebaseio.com';
const API_KEY = 'AIzaSyBagS6Xzts8IVgIgwZ3ER5WfdgPqLtF_DA';

export const getUserInfo = userId => {
  return axios.get(`${API_URL}/user/${userId}.json`);
};

export const signInUser = signInUser => {
  axios
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

          localStorage.setItem(
            'user-info',
            JSON.stringify({
              userId: foundUser.userId,
              email: res.data.email,
              token: res.data.idToken,
            }),
          );
        });
      }
    })
    .catch(err => console.log(err));
};

export const signUpUser = signUpUser => {
  const { firstName, secondName, email, phone, password } = signUpUser;

  axios
    .post(`:signUp?key=${API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    .then(res => {
      if (res.status === 200) {
        axios
          .post(`${API_URL}/user.json`, {
            firstName: firstName,
            secondName: secondName,
            email: email,
            phone: phone,
          })
          .then(resId =>
            localStorage.setItem(
              'user-info',
              JSON.stringify({
                userId: resId.data.name,
                email: res.data.email,
                token: res.data.idToken,
              }),
              axios.patch(`${API_URL}/user/${resId.data.name}.json`, {
                userId: resId.data.name,
              }),
            ),
          );
        console.log('register');
      }
    })
    .catch(err => console.log(err));
};

export const signOutUser = () => {
  localStorage.clear();
};

export const updateUserAvatar = (id, token, obj) => {
  return axios.patch(`${API_URL}/user/${id}.json?auth=${token}`, {
    avatar: obj,
  });
};

export const addUserAdv = (userId, advId, token) => {
  return axios.patch(`${API_URL}/user/${userId}/adv.json?auth=${token}`, {
    [advId]: 'key',
  });
};

export const addUserFavourite = (userId, advId) => {
  return axios.patch(`${API_URL}/user/${userId}/favourite.json?auth=${token}`, {
    [advId]: 'key',
  });
};

export const deleteUserFavourite = (userId, advId) => {
  return axios.delete(
    `${API_URL}/user/${userId}/favourite/${advId}.json?auth=${token}`,
  );
};

// deleteData('-MAkWY0ZZG5Ji2ge1Ndu', '-MZZsadgagsai2ge1Ndd')
//   .then(res => console.log('test', res))
//   .catch(err => console.log(err));
