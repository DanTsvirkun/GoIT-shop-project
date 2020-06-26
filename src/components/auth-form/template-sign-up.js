const templateSignUp = () => {
  return `<div class="auth-form-sign-up">
              <form class="auth-form-sign-up">
                <h4>Введите данные для завершения регистрации:</h4>
                <input type="text" placeholder="Введите Ваше имя" name="firstName" required />
                <input type="text" placeholder="Введите Вашу фамилию" name="secondName" required />
                <input type="email" placeholder="Введите Ваш e-mail" name="email" required />
                <input type="phone" placeholder="Введите номер телефона" name="phone" required />
                <input type="password" placeholder="Введите пароль" name="password" required />
                <input type="password" placeholder="Повторите ввод пароля" name="passwordRepeat" required />
                <button type="submit" class="reg-button">
                  Регистрация
                </button>
                <button type="submit" class="cancel-button">Отмена</button>
              </form>
`;
};

export default templateSignUp;
