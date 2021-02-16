import axios from 'axios';
import { updateUserAvatar } from '../../services/user-api';

const mainUrl = 'https://callboard-backend-pl.goit.global';

export function avatarManipulation() {
  const fileInput = document.querySelector('.user-avatar__file-input');
  const clearAvatarBtn = document.querySelector('.user-avatar__clear-btn');

  fileInput.addEventListener('change', hendleChange);
  clearAvatarBtn.addEventListener('click', resetForDefault);
}

function hendleChange(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  const formData = new FormData();
  formData.append('file', file);
  const imgSearche = document.querySelectorAll('.avatar');
  reader.onloadend = async () => {
    imgSearche.forEach(img => (img.src = reader.result));
    await axios({
      method: 'PATCH',
      url: `${mainUrl}/user/avatar`,
      data: formData,
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user-info')).token,
      },
    });
    // const localUserObj = JSON.parse(localStorage.getItem('user-info'));
    // updateUserAvatar(localUserObj.userId, reader.result, localUserObj.token);
  };

  file ? reader.readAsDataURL(file) : resetForDefault();
}

async function resetForDefault() {
  const srcDefault = 'https://i.ibb.co/K7j3rZk/99-512.png';
  await axios({
    method: 'PATCH',
    url: `${mainUrl}/user/default-avatar`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('user-info')).token,
    },
  });
  document.querySelectorAll('.avatar').forEach(img => (img.src = srcDefault));
  const localUserObj = JSON.parse(localStorage.getItem('user-info'));
  // updateUserAvatar(localUserObj.userId, srcDefault, localUserObj.token);
}
