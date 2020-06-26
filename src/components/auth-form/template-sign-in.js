const templateSignIn = () => {
  return `
            <div class="auth-form-sign-in">
              <h4>Для авторизации можете использовать Google Account:</h4>
              <button type="submit" class="cancel-button">Google</button>
              <h4>Или войдите в приложение используя e-mail и пароль:</h4>
              <form class="auth-form-sign-in">
                <input type="email" placeholder="E-mail" name="email" required />
                <input type="password" placeholder="Пароль" name="password" required />
                <button type="submit" class="sign-in-button">Войти</button>
                <button type="submit" class="to-reg-button">Регистрация</button>
              </form>
            </div>`;
};

export default templateSignIn;
