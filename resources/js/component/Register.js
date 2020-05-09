import React from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);

    this.state = {login: "", password: "", password_confirmation: ""};
  }

  reqsValidate() {
    const { login, password, password_confirmation } = this.state;

    if (login.length != 6 || /[^0-9]/.test(login)) {
      document.querySelector(".register__error").textContent = "Неверный формат логина";
      return false;
    }

    if (password.length < 6) {
      document.querySelector(".register__error").textContent = "Неверный формат пароля";
      return false;
    }

    if (password !== password_confirmation) {
      document.querySelector(".register__error").textContent = "Пароли не совпадают";
      return false;
    }
    
    return true;
  }

  handleChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleChangePasswordConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value
    });
  }

  handleClickBack() {
    this.props.onChangeMode("login");
  }

  handleClickRegister() {
    if (!this.reqsValidate())
      return;

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Registered") {
          const loginError = document.querySelector(".register__error");
          loginError.textContent = "Check your email";
          loginError.classList.add("register__message");
        }
        else
          document.querySelector(".register__error").textContent = data.message;
      })
      .catch(err => {
        document.querySelector(".register__error").textContent = "Server error";
      });
  }
  render() {
    return (
      <div className="auth__form register">
        <h3 className="auth__header">Регистрация</h3>
        <input className="auth__field" type="number" placeholder="Номер ИСУ" 
          onChange={this.handleChangeLogin}
          value={this.state.login}
        />
        <input className="auth__field" type="text" placeholder="Пароль" 
           onChange={this.handleChangePassword}
           value={this.state.password}
        />
        <input className="auth__field" type="text" placeholder="Подтвержение пароля" 
           onChange={this.handleChangePasswordConfirmation}
           value={this.state.password_confirmation}
        />
        <p className="auth__error register__error"></p>
        <div className="auth__btns">
          <button className="auth__button register__button-back"
            onClick={this.handleClickBack}
          >
            Назад
          </button>
          <button className="auth__button register__button-register"
            onClick={this.handleClickRegister}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    );
  }
}