import { api } from '../services/api';
import { modalBackDrop } from '../modal-window/logic-modal.js';
import markupModal from './templates/markup-adv-modal.hbs';
import '../modal-window/styles.css';
import './adv-styles.css';
import { murkupAuthForm } from '../auth-form/js/auth-form';
const refs = {
  button: document.querySelectorAll('.modal-btn'),
};

refs.button.forEach(item => item.addEventListener('click', createAdCheck));

function anonymousRegister() {
  murkupAuthForm('signin');
}

function createAdCheck() {
  if (localStorage.getItem('user-info')) {
    refs.button.forEach(item =>
      item.removeEventListener('click', anonymousRegister),
    );
    refs.button.forEach(item => item.addEventListener('click', createModal()));
  } else {
    refs.button.forEach(item => item.removeEventListener('click', createModal));
    refs.button.forEach(item =>
      item.addEventListener('click', anonymousRegister()),
    );
  }
}

let imgLoaderArea;
let advForm;
let productImage;
let createData;

function createModal() {
  const closeModal = modalBackDrop(markupModal());
  const closeBtn = document.querySelector('.adv-modal__close-btn');
  closeBtn.addEventListener('click', closeModal);
  
  imgLoaderArea = document.querySelector('.adv-modal__product-photos');
  advForm = document.forms.advForm;
  advForm.addEventListener('change', saveData);
  advForm.addEventListener('submit', submitForm);
  imgLoaderArea.addEventListener('click', chooseImgBlock);
  imgLoaderArea.addEventListener('change', previewImg);
}
function saveData(event) {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const productName = event.currentTarget.elements.productName;
  const productDescription = event.currentTarget.elements.productDescription;
  const productPrice = event.currentTarget.elements.productPrice.value;
  const productCategory = event.currentTarget.elements.productCategory;
  createData = {
    author: userInfo.userId,
    name: productName.value,
    mainImg: '',
    image: [],
    category: productCategory.value === 'category' ? '' : productCategory.value,
    description: productDescription.value,
    price: Number(productPrice).toLocaleString(),
  };
  const productPriceWrap = document.querySelector('.input-wrapper__price');
  event.target.value === 'for-free'
    ? productPriceWrap.classList.add('hide-price')
    : productPriceWrap.classList.remove('hide-price');
  event.target.value === 'for-free'
    ? productPriceWrap.classList.remove('input-wrapper')
    : productPriceWrap.classList.add('input-wrapper');    
}

//==================================
function chooseImgBlock(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  if (!event.target.dataset.active) {
    return;
  }
  const imgTarget = event.target;
  imgTarget.setAttribute('type', 'file');
}
//====================================
function submitForm(event) {
  event.preventDefault();
  if (createData.category === '') {
    return;
  }
  let allImg = event.currentTarget.querySelectorAll('img');
  allImg = Array.from(allImg);
  const allImgArr = allImg
    .filter(item => {
      const src = item.dataset.img;
      return src;
    })
    .map(item => item.src);
  createData.image = allImgArr;
  createData.mainImg = allImgArr[0];
  function clearImages(arr) {
    arr.map(item => (item.src = ''));
  }
  let allLabelArr = document.querySelectorAll('.input-label');
  allLabelArr = Array.from(allLabelArr);
  function returnMarkToStart(arr) {
    arr
      .filter(item => item.classList.contains('choose-this'))
      .map(item => item.classList.remove('choose-this'));
    allLabelArr[0].classList.add('choose-this');
  }
  let allPhotoInputs = document.querySelectorAll('.photo-input');
  allPhotoInputs = Array.from(allPhotoInputs);
  function removeInputFile(arr) {
    arr
      .filter(item => item.attributes.type)
      .map(item => item.removeAttribute('type'));
    arr
      .filter(item => item.dataset.active)
      .map(item => (item.dataset.active = ''));
    arr[0].dataset.active = true;
  }
  //===============================================
  api.postAdv(createData.category, createData)
  .then(data => {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const idAdv = data.name; 
    console.log(idAdv);  
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        adv: [...user.adv, idAdv],
      }),
    );
  })
  //===============================================
  advForm.reset();
  clearImages(allImg);
  returnMarkToStart(allLabelArr);
  removeInputFile(allPhotoInputs);
  console.log(createData);
}
//=================================
function previewImg(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  changeImgBlock(event);
  if (event.target.dataset.id) {
    const file = event.target.files[0];
    const inputID = event.target.dataset.id;
    const img = document.querySelector(`.input-label__img--${inputID}`);
    const reader = new FileReader();
    reader.onloadend = () => {
      img.src = reader.result;
      productImage = reader.result;
      img.setAttribute('data-img', productImage);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      img.src = '';
    }
  }
}
//======================
function changeImgBlock(event) {
  const imgTarget = event.target;
  imgTarget.nextElementSibling.classList.remove('choose-this');
  let imgId = Number(event.target.dataset.id);
  imgId += 1;
  if (imgId > 6) {
    return;
  }
  const nextImg = document.querySelector(`[data-id="${imgId}"]`);
  nextImg.dataset.active = true;
  nextImg.nextElementSibling.classList.add('choose-this');
}
