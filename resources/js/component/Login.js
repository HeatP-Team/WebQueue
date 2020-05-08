import React from 'react';
import fetch from "../module/fetchCSRF";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickLogIn = this.handleClickLogIn.bind(this);

    this.state = {login: "", password: ""};
  }

  reqsValidate() {
    const {login} = this.state;

    if (login.length != 6 || /[^0-9]/.test(login))
      return false;

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

  handleClickRegister() {
    this.props.onChangeMode("register");
  }

  handleClickLogIn() {
    if (!this.reqsValidate())
      return;

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Authenticated")
          window.location.href = data.url;
        else
          document.querySelector(".login__error").textContent = data.message;
      })
      .catch(err => {
        document.querySelector(".login__error").textContent = "Server error";
      });
  }

  render() {
    return (
      <div className="auth__form login">
        <h3 className="auth__header">Вход в систему</h3>
        <input className="auth__field" type="number" placeholder="Номер ИСУ"
          onChange={this.handleChangeLogin}
          value={this.state.login}
        />
        <input className="auth__field" type="password" placeholder="Пароль"
          onChange={this.handleChangePassword}
          value={this.state.password}
        />
        <p className="auth__error login__error"></p>
        <button className="auth__button login__button-login"
          onClick={this.handleClickLogIn}
        >
          Войти
        </button>
        <div className="auth__refs">
          <span className="auth__refs-item" onClick={this.handleClickRegister}>Зарегистрироваться</span>
          <span className="auth__refs-item">Забыли пароль?</span>
        </div>
      </div>
    );
  }
}