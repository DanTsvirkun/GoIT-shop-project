import '../css/student-modal.css';
import { getUserInfo } from '../../services/user-api';
import { modalBackDrop } from '../../modal-window/logic-modal';
import studentsModal from '../templates/students-modal.hbs';

const studentBtn = document.querySelector('.js-students');
// studentBtn.addEventListener('click', hendelOpenStudentModal);

// function hendelOpenStudentModal(e) {
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

// getUserInfo('').then(res => {
//   const allUserObj = Object.values(res.data);

//   let findUser;

//   for (const id of studentsIdArr) {
//     for (const user in allUserObj) {
//       if (id === allUserObj[user].userId) {
//         findUser += allUserObj[user];
//       }
//     }
//   }
//   console.log(findUser);
// });

// setTimeout(() => {
//   // modalBackDrop(studentsModal(findUser));
// }, 5000);
// }
