const templateSignUp = () => {
  return `<div class="auth-form-sign-up">
              <form>
                <h4>Введите данные для завершения регистрации:</h4>
                <input type="text" placeholder="Введите Ваше имя" name="first-name" required />
                <input type="text" placeholder="Введите Вашу фамилию" name="second-name" required />
                <input type="email" placeholder="Введите Ваш e-mail" name="email" required />
                <input type="password" placeholder="Введите пароль" name="password" required />
                <input type="password" placeholder="Повторите ввод пароля" name="password-repeat" required />
                <button type="submit" class="reg-button">
                  Регистрация
                </button>
                <button type="submit" class="cancel-button">Отмена</button>
              </form>
`;
};

export default templateSignUp;
