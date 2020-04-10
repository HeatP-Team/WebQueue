import React from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);

    this.state = {login: ""};
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

  handleClickBack() {
    this.props.onChangeMode("login");
  }

  handleClickRegister() {
    if (!this.reqsValidate())
      return;


  }

  render() {
    return (
      <div className="auth__form register">
        <h3 className="auth__header">Регистрация</h3>
        <input className="auth__field" type="number" placeholder="Номер ИСУ" 
          onChange={this.handleChangeLogin}
          value={this.state.login}
        />
        <p className="auth__error"></p>
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