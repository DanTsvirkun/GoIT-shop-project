const authFormCheck = () => {
  const checkForm = document.querySelector('auth-form');
  checkForm.addEventListener('submit', checkValue);
  function checkValue(e) {
    const emailCheck = e.currentTarget.elements.email.value;
    if (!(emailCheck.includes('@') && valueEmail.includes('.'))) {
      alert('Неправильно введен e-mail!');
      return;
    }

    const passwordCheck = e.currentTarget.elements.password.value;

    if (passwordCheck.length < 6) {
      alert('Пароль должен содержать минимум 6 символов!');
    }
    e.currentTarget.reset();
  }
};

export default authFormCheck;
