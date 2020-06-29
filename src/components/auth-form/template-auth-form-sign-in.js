const templateSigInForm = () => {
  return `   
          <div class="auth-form-sign-in">
            <h4>Для авторизации можете использовать Google Account:</h4>
            <h4>Или войдите в приложение используя e-mail и пароль:</h4>
            <form class="auth-form-sign-in">
              <label for="email-auth"></label>
              <input
                type="text"
                placeholder="E-mail"
                name="first-name"
                required
              />
              <label for="password-auth"></label>
              <input
                type="text"
                placeholder="Пароль"
                name="second-name"
                required
              />
              <button type="submit" class="sign-in-button">Войти</button>
              <button type="submit" class="to-reg-button">Регистрация</button>
              <button type="submit" class="close-modal">X</button>
            </form>
          </div>
          
`;
};

export default templateSigInForm;
