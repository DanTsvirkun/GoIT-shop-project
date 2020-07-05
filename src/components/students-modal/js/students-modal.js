import '../css/student-modal.css';
import { getUserInfo } from '../../services/user-api';
import { modalBackDrop } from '../../modal-window/logic-modal';
import studentsModal from '../templates/students-modal.hbs';

const studentBtn = document.querySelector('.js-students');
studentBtn.addEventListener('click', hendelOpenStudentModal);

const studentsIdArr = [
  '-MBVvUgAVOv-sJXCNatj',
  '-MAzVEIwmTu4ISBtZLb0',
  '-MBUZwf0K60Wy-kHqEjk',
  '-MBVuSrZbrP9X3RcmmJQ',
  '-MBVzapb8n_MJ5huJils',
  '-MBJBYpyXEJ0CrXb0MFr',
  '-MBDO1nB-VietNJTY0Bl',
  '-MBW01ZoqwtDH2M2lsOm',
  '-MBIb-F-4YbB9w3Ti_wH',
];

function hendelOpenStudentModal(e) {
  getUserInfo('').then(res => {
    const allUserObj = Object.values(res.data);

    let findUser = [];

    for (let i = 0; i <= studentsIdArr.length - 1; i += 1) {
      findUser.push(allUserObj.find(user => user.userId === studentsIdArr[i]));
    }

    const closeModalErr = modalBackDrop(studentsModal(findUser));

    document
      .querySelector('.student-modal__close-btn')
      .addEventListener('click', closeModalErr);
  });
}
