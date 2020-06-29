export const templateSignUpForm = () => {
  return `   
  <div class="auth-form-registration">
            <form class="auth-form-sign-up">
              <h4>Введите данные для завершения регистрации:</h4>
              <label for="first-name"></label>
              <input
                type="text"
                placeholder="Введите Ваше имя"
                name="first-name"
                required
              />
              <label for="second-name"></label>
              <input
                type="text"
                placeholder="Введите Вашу фамилию"
                name="second-name"
                required
              />
              <label for="email"></label>
              <input
                type="text"
                placeholder="Введите Ваш e-mail"
                name="email"
                required
              />
              <label for="password"></label>
              <input
                type="password"
                placeholder="Введите пароль"
                name="password"
                required
              />
              <label for="password-repeat"></label>
              <input
                type="password"
                placeholder="Повторите ввод пароля"
                name="password-repeat"
                required
              />
              <button type="submit" class="reg-button">
                Регистрация
              </button>
              <button type="submit" class="cancel-button">Отмена</button>
              <button type="submit" class="close-modal">X</button>
            </form>
            </div>
   
`;
};

export default templateSignUpForm;
