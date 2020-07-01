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

const apiKey = 'AIzaSyCmN93oWbbIjStR6IIQAEvdec9qcNLRA_E';
const mainUrl = 'https://project-88172.firebaseio.com/olx';

const nameAllCategories = [
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
          console.log('DATA CATEGORY');
          resolve(data[category]);
        });
      }
      return axios
        .get(`${mainUrl}/categories/${category}.json`)
        .then(res => {
          console.log('AXIOS CATEGORY');
          const result = this.transformCategory(res.data);
          if (!requestedArray.includes(category)) {
            requestedArray.push(category);
          }
          if (data[category].length === 0) {
            data.allCategories = [...data.allCategories, ...result];
            data[category] = [...result];
            console.log(`Category`, data[category]);
          }
          console.log('ALL CATEGORIES', data.allCategories);
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
          console.log('DATA advertisement');
          resolve(data.advertisement);
        });
      }
      return axios
        .get(`${mainUrl}/categories/advertisement.json`)
        .then(res => {
          console.log('AXIOS CATEGORY advertisement');
          const result = this.transformCategory(res.data);
          const randomArray = this.shuffleGoods(result);
          data.advertisement = [...randomArray];
          return randomArray;
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

  // Поиск всех категорий. Метод нужен для поиска одного или нескольких товаров.
  // ----! Принимает значение инпута.
  searchGoods(searchWord) {
    if (searchWord) {
      if (
        data.allCategories.length > 0 &&
        requestedArray.length === nameAllCategories.length
      ) {
        return new Promise(resolve => {
          console.log('DATA SEARCH WORD');
          resolve(this.filterWords(searchWord));
        });
      }
      return new Promise(res => {
          res('res');
        })
        .then(res => {
          console.log('AXIOS SEARCH WORD');
          if (requestedArray.length < nameAllCategories.length) {
            return this.addCategory().then(arr => {
              const allCategories = arr.map(item => {
                return this.getCategory(item);
              });
              return Promise.all(allCategories).then(array => {
                // console.log(array);
                const result = this.filterWords(searchWord);
                // console.log(data.allCategories);
                return result;
              });
              // console.log(ar);
            });
          }
          // this.transformAllCategories(res.data);
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
  // Метод для поиска по  id  ----! принимает id как аргумент
  //   searchId(id) {
  //     const res = data.allCategories.find((item) =>
  //       item.id === id
  //     )
  //   },
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
        console.log(res.data.name);
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
        console.log('DATA ALL-GOODS');
        resolve(data.allCategories);
      });
    }
    return new Promise(res => {
        res('res');
      })
      .then(res => {
        console.log('AXIOS ALL_GOODS');
        if (requestedArray.length < nameAllCategories.length) {
          return this.addCategory().then(arr => {
            const allCategories = arr.map(item => {
              return this.getCategory(item);
            });
            return Promise.all(allCategories).then(array => {
              // console.log(array);

              // console.log(data.allCategories);
              return data.allCategories;
            });
            // console.log(ar);
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

  // ----------------------------------------easy option
  // filterCategoryData(arrayAllCat) {
  //   console.log(arrayAllCat);
  //   arrayAllCat.map(item => {
  //     console.log(item);
  //     // console.log(item.category);
  //     console.log(data[item.category.length]);
  //     if (data[item.category.length] < 0) {
  //       data[item.category] = [...data[item.category], item];
  //       console.log(data[item.category]);
  //     }
  //   });
  // },

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
  filterFavAdv(favArr, advArr) {
    if (
      data.allCategories.length > 0 &&
      requestedArray.length === nameAllCategories.length
    ) {
      return new Promise(resolve => {
        console.log('DATA filterFavAdv');
        const arrFavAdv = this.filterFavAdv(favArr, advArr)
        resolve(arrFavAdv)
      });
    }
    return new Promise(res => {
        res('res');
      })
      .then(res => {
        console.log('AXIOS filterFavAdv');
        if (requestedArray.length < nameAllCategories.length) {
          return this.addCategory().then(arr => {
            const allCategories = arr.map(item => {
              return this.getCategory(item);
            });
            return Promise.all(allCategories).then(array => {
              const arrFavAdv = this.filterFavAdv(favArr, advArr)
              return arrFavAdv
            });

          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  filterFavAdv(favArr, advArr) {
    const favourites = data.allCategories.filter((item) => {
      return favArr.includes(item.id)
    })
    const advertisement = data.allCategories.filter((item) => {
      return advArr.includes(item.id)
    })
    // const arrFavAdv = [filteredFavArr, filteredAdvArr]
   const  arrFavAdv = {
      favourites,
      advertisement
    }
    return arrFavAdv
  },
}


// const fn = function () {
//   api.searchGoods('к').then(data => console.log(data));
// };
// const fn2 = function () {
//   api.getAllGoods().then(data => console.log(data));
// };
// api.getAllGoods().then((data) => {
//   console.log(data);
// console.log(data.length);
// const fav = []
//   const adv = []
//   for (let i = 0; i < data.length; i++){
//     if (!(i % 2)) {
//       fav.push(data[i].id)
//       console.log('2');
//     }
//     if (!(i % 3)) {
//       adv.push(data[i].id)
//       console.log('3');
//     }
//   }
//   console.log(fav);
//   console.log(adv);
//   const res = api.filterFavAdv(fav, adv)
//   console.log(res);
// })

// api.filterFavAdv()


// api.getCategory('work')
// api.getCategory('property')
// api.getCategory('transport')
// // fn()
// setTimeout(fn, 2000)
// setTimeout(fn2, 5000)
// setTimeout(fn, 2000)
// localStorage.setItem(
//   'user-info',
//   JSON.stringify({
//     email: 'Alxe@asdlasd.com',
//     token: 'asdasgkk4444',
//     id: '-MAkWY0ZZG5Ji2ge1Ndu',
//     favorites: ['ggjjkkj4j4214124mdmfg', 'ifi124u12uo2428fhj', '129412094jsf'],
//   }),
// );
// api.setFavorites('fkkgkgakkgakgakg')

// console.log(api.getFavorites('ifi124u12uo2428fhj'));

// api.getAllGoods()

// getCategoryTest() {
//   axios.get('https://project-88172.firebaseio.com/olx/categories.json').then((res) => {
//     const allKeys = Object.keys(res.data)
//     const array = allKeys.map((item) => {
//       return {
//         [item]: res.data[item]
//       }
//     })
//     console.log(array);
//   }).then((data) => console.log(data))
// },

//  getAllGoods() {
//    if (data.allCategories.length > 0 &&
//      requestedArray.length === nameAllCategories.length) {
//      return new Promise(resolve => {
//        console.log('DATA ALL-GOODS');
//        resolve(data.allCategories);
//      });
//    }
//    return axios
//      .get(`${mainUrl}/categories.json`)
//      .then(res => {
//        console.log('AXIOS ALL-GOODS');
//        const arrayObjects = this.transformAllCategories(res.data);
//        this.filterCategoryData(arrayObjects);
//        console.log(arrayObjects);
//        return arrayObjects;
//      })
//      .catch(err => console.log(err));
//  },



// console.log(localStorage.getItem('user-info'));

// api.getAdvertisement().then((data) => {
//   console.log(data);
// })
