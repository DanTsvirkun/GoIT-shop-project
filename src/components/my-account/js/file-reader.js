import { refs } from './refs';
import { updateUserAvatar } from '../../services/user-api';
import { isLogIn } from '../../auth-form/js/auth-form';

refs.fileInput.addEventListener('change', hendleChange);
refs.clearAvatarBtn.addEventListener('click', resetForDefault);

function hendleChange(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    document
      .querySelectorAll('.avatar')
      .forEach(img => (img.src = reader.result));

    const localUserObj = JSON.parse(localStorage.getItem('user-info'));
    updateUserAvatar(localUserObj.userId, reader.result, localUserObj.token);
  };

  file ? reader.readAsDataURL(file) : (refs.avatarImg.src = '');
}

function resetForDefault() {
  const srcDefault = 'https://i.ibb.co/K7j3rZk/99-512.png';

  document.querySelectorAll('.avatar').forEach(img => (img.src = srcDefault));
  const localUserObj = JSON.parse(localStorage.getItem('user-info'));
  updateUserAvatar(localUserObj.userId, srcDefault, localUserObj.token);

  isLogIn();
}
