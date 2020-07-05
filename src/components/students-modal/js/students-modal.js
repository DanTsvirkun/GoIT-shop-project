import '../css/student-modal.css';
import { getUserInfo } from '../../services/user-api';
import { modalBackDrop } from '../../modal-window/logic-modal';
import studentsModal from '../templates/students-modal.hbs';

const studentBtn = document.querySelector('.js-students');
// studentBtn.addEventListener('click', hendelOpenStudentModal);

const studentsIdArr = [
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MAzVEIwmTu4ISBtZLb0',
];

// function hendelOpenStudentModal(e) {
getUserInfo('').then(res => {
  const allUserObj = Object.values(res.data);

  let findUser = [];

  for (let i = 0; i <= studentsIdArr.length - 1; i += 1) {
    findUser.push(allUserObj.find(user => user.userId === studentsIdArr[i]));
  }

  modalBackDrop(studentsModal(findUser));
});
// }
