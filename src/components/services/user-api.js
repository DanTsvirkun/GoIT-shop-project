import axios from 'axios';

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const API_URL = 'https://api-project-575025675995.firebaseio.com';
const API_KEY = 'AIzaSyBagS6Xzts8IVgIgwZ3ER5WfdgPqLtF_DA';

export const getUserInfo = () => {
  return axios.get(`${API_URL}/user.json`);
};

export const signInUser = signInUser => {
  axios
    .post(`:signInWithPassword?key=${API_KEY}`, {
      ...signInUser,
      returnSecureToken: true,
    })
    .then(res => {
      localStorage.setItem(
        'user-info',
        JSON.stringify({
          email: res.data.email,
          token: res.data.idToken,
        }),
      );
    })
    .catch(err => console.log(err));
};

export const signUpUser = signUpUser => {
  const {
    firstName,
    secondName,
    email,
    phone,
    password
  } = signUpUser;

  axios
    .post(`:signUp?key=${API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    .then(res => {
      localStorage.setItem(
        'user-info',
        JSON.stringify({
          email: res.data.email,
          token: res.data.idToken,
        }),
      );

      if (res.status === 200) {
        axios.post(`${API_URL}/user.json`, {
          firstName: firstName,
          secondName: secondName,
          email: email,
          phone: phone,
        });
        console.log('register');
      }
    })
    .catch(err => console.log(err));
};

export const signOutUser = () => {
  localStorage.clear();
};

export const updateUserAvatar = (id, obj) => {
  return axios.patch(`${API_URL}/user/${id}.json`, {
    avatar: obj
  });
};
export const addUserAdv = (userId, advId) => {
  return axios.patch(`${API_URL}/user/${userId}/adv.json`, {
    [advId]: 'key'
  });
}
// addUserAdv('-MAkWY0ZZG5Ji2ge1Ndu', '-MZZdsdsagsai2ge1Ndd');

// DELETE MODULE

// export const deleteData = id => {
//   return axios.delete(
//     `${API_URL}/user/${id}.json`,
//   );
// };
// deleteData('-MAkDzDFtVAT-Xj68UNP')
//   .then(res => console.log('test', res))
//   .catch(err => console.log(err));
