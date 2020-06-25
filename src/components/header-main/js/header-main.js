import '../css/header-main.css';
import refs from './refs.js';
import authBlock from '../templates/auth-block.hbs';

const authBlockMarkup = authBlock();
refs.authBlock.insertAdjacentHTML('beforeend', authBlockMarkup);
