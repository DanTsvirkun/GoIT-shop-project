import axios from 'axios';
import '../css/student-modal.css';
import { getUserInfo } from '../../services/user-api';
import { modalBackDrop } from '../../modal-window/logic-modal';
import studentsModal from '../templates/students-modal.hbs';

axios.defaults.baseURL = 'https://callboard-backend-en.goit.global';

const studentBtn = document.querySelector('.js-students');
studentBtn.addEventListener('click', hendelOpenStudentModal);

function hendelOpenStudentModal() {
  axios
    .get('/user/creators')
    .then(res => {
      const closeModalErr = modalBackDrop(studentsModal(res.data));
      document
        .querySelector('.student-modal__close-btn')
        .addEventListener('click', closeModalErr);
    })
    .catch(err => console.log(err));
}
