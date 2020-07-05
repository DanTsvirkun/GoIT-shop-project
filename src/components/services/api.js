import axios from 'axios';
import data from './data';
import {
  getUserInfo,
  signInUser,
  signUpUser,
  signOutUser,
  updateUserAvatar,
  addUserAdv,
} from './user-api';

const apiKey = 'AIzaSyAW3Ioxj9_QV0Lp_UnBQgdSuz4VSGA5UOo';
const mainUrl = 'https://goit-shop-from-21st-bootcamp.firebaseio.com';

export const nameAllCategories = [
  'electronics',
  'property',
  'transport',
  'work',
  'business-and-services',
  'recreation-and-sports',
  'for-free',
  'exchange',
];
const requestedArray = [];
// Название категорий:
// 'property' --- Недвижимость,
// 'transport' --- Транспорт,
// 'work' --- работа,
// 'electronics' --- Электроника,
// 'business-and-services' --- Бизнес и услуги,
// 'recreation-and-sports' --- Отдых и спорт,
// 'for-free' --- Отдам бесплатно,
// 'exchange' --- Обмен
// 'advertisement --- Реклама

export const api = {
  // Запрос для категорий. Нужно передать название категории как аргумент.
  getCategory(category) {
    if (data[category]) {
      if (data[category].length > 0) {
        return new Promise(resolve => {
          resolve(data[category]);
        });
      }
      return axios
        .get(`${mainUrl}/categories/${category}.json`)
        .then(res => {
          const result = this.transformCategory(res.data);
          if (!requestedArray.includes(category)) {
            requestedArray.push(category);
          }
          if (data[category].length === 0) {
            data.allCategories = [...data.allCategories, ...result];
            data[category] = [...result];
          }

          return result;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return new Promise((res, rej) => {
        rej('not category');
      });
    }
  },
  // advertisement Метод для поиска рекламы
  // >>>>>>>>>>>>>> ничего передавать не надо, просто вызвать функцию.
  getAdvertisement() {
    if (data.advertisement) {
      if (data.advertisement.length > 0) {
        return new Promise(resolve => {
          resolve(data.advertisement);
        });
      }
      return axios
        .get(`${mainUrl}/advertisement.json`)
        .then(res => {
          const result = this.transformCategory(res.data);
          const randomArray = this.shuffleGoods(result);
          data.advertisement = [...randomArray];
          return randomArray;
        })
        .catch(err => {
          console.log(err);
          alert(
            'Выключите AdBlock и перезагрузите страницу для корректной работы сайта!',
          );
        });
    } else {
      return new Promise((res, rej) => {
        rej('not category');
      });
    }
  },

  // Поиск всех категорий. Метод нужен для поиска одного или нескольких товаров.
  // ----! Принимает значение инпута.
  searchGoods(searchWord) {
    if (searchWord) {
      if (
        data.allCategories.length > 0 &&
        requestedArray.length === nameAllCategories.length
      ) {
        return new Promise(resolve => {
          resolve(this.filterWords(searchWord));
        });
      }
      return new Promise(res => {
          res('res');
        })
        .then(res => {
          if (requestedArray.length < nameAllCategories.length) {
            return this.addCategory().then(arr => {
              const allCategories = arr.map(item => {
                return this.getCategory(item);
              });
              return Promise.all(allCategories).then(array => {
                const result = this.filterWords(searchWord);

                return result;
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return new Promise((res, rej) => {
        rej('not valid request');
      });
    }
  },
  transformCategory(keys) {
    const data = Object.keys(keys).map(id => {
      return {
        id,
        ...keys[id],
      };
    });
    return data;
  },
  transformAllCategories(values) {
    const allObjects = Object.values(values);
    const arrayObjects = allObjects.flatMap(item => {
      const transform = this.transformCategory(item);
      return transform;
    });
    const randomArray = this.shuffleGoods(arrayObjects);
    data.allCategories = [...randomArray];

    return randomArray;
  },
  filterWords(searchWord) {
    searchWord.toLowerCase();
    const filteredArray = data.allCategories.filter(item => {
      return item.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    return filteredArray;
  },

  // Избранное --- Ира нажимает и это летит к контретному юзеру, динамично передаю название папки(не папик) юзера
  // Ира нажимает на карточку и ей приходит объект по id. Нужен метод для отправки юзеру в избранное.
  searchId(id) {
    if (id) {
      return new Promise((res, rej) => {
        const objId = data.allCategories.find(item => item.id === id);
        res(objId);
      });
    } else {
      return new Promise((res, rej) => {
        rej('there is not such id');
      });
    }
  },
  // Метод для работы с localStorage
  getUserInfo() {},
  // Метод для отправки объявления ----! Принимает два аргумента (название категории, объект)
  postAdv(category, obj) {
    return axios
      .post(`${mainUrl}/categories/${category}.json`, obj)
      .then(res => {
        // отправляю юзеру на бэк
        const user = JSON.parse(localStorage.getItem('user-info'));
        const userId = user.userId;
        const userToken = user.token;
        addUserAdv(userId, res.data.name, userToken);
        data.allCategories = [
          ...data.allCategories,
          {
            ...obj,
            id: res.data.name,
          },
        ];
        data[category] = [
          ...data[category],
          {
            ...obj,
            id: res.data.name,
          },
        ];
        return res.data;
      })
      .catch(err => console.log(err));
  },
  //    Метод для получение всех товаров. Все товары приходят радномно при вызове метода.
  // Метод нужен для рекламы или популярных товаров.
  //  Например можно брать первые первые 6 для популярных товаров и
  // при каждой загрузке страницы они будут разные.

  getAllGoods() {
    if (
      data.allCategories.length > 0 &&
      requestedArray.length === nameAllCategories.length
    ) {
      return new Promise(resolve => {
        resolve(data.allCategories);
      });
    }
    return new Promise(res => {
        res('res');
      })
      .then(res => {
        if (requestedArray.length < nameAllCategories.length) {
          return this.addCategory().then(arr => {
            const allCategories = arr.map(item => {
              return this.getCategory(item);
            });
            return Promise.all(allCategories).then(array => {
              return data.allCategories;
            });
          });
        }
        // this.transformAllCategories(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  addCategory() {
    let array = [];
    for (let i = 0; i < nameAllCategories.length; i++) {
      if (!requestedArray.includes(nameAllCategories[i])) {
        // requestedArray.push(nameAllCategories[i]);
        array.push(nameAllCategories[i]);
      }
    }
    return new Promise(res => res(array));
  },

  shuffleGoods(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  // Можно ли менять избранное юзера до возвращения промиса?
  // Вначале должен отработать бэк, а только после менять локалСторейдж
  removeFavorites(array) {
    const user = JSON.parse(localStorage.getItem('user-info')).id;
    // function(user,array)
  },
  // Вернуть промис
  setFavorites(id) {
    const user = JSON.parse(localStorage.getItem('user-info'));
    //   function(id)
    // запрос на сервер конкретного юзера если он есть, но влюбом случае записываем id  в локал сторейдж
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...user.favorites, id],
      }),
    );
  },
  getFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem('user-info')).favorites;
    return favorites.includes(id);
  },
  // Методом для кабинета принимает два аргумента, 1 - массив избранных, 2 - массив объявлений.
  filterMyAccount(favArr) {
    if (
      data.allCategories.length > 0 &&
      requestedArray.length === nameAllCategories.length
    ) {
      return new Promise(resolve => {
        const arrFavAdv = this.filterFavAdv(favArr);
        resolve(arrFavAdv);
      });
    }
    return new Promise(res => {
        res('res');
      })
      .then(res => {
        if (requestedArray.length < nameAllCategories.length) {
          return this.addCategory().then(arr => {
            const allCategories = arr.map(item => {
              return this.getCategory(item);
            });
            return Promise.all(allCategories).then(array => {
              const arrFavAdv = this.filterFavAdv(favArr);
              return arrFavAdv;
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  filterFavAdv(favArr) {
    const favourites = data.allCategories.filter(item => {
      return favArr.includes(item.id);
    });
    return favourites;
  },

  deleteAdv(category, id) {
    return axios
      .delete(`${mainUrl}/categories/${category}/${id}.json`)
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err);
      });
  },
};
