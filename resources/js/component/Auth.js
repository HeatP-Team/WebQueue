import React from 'react';
import "../../style/Auth.less";
import Header from './Header'
import Footer from './Footer'
import Login from './Login';
import Register from './Register';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeMode = this.handleChangeMode.bind(this);

    this.state = {mode: "login"};
  }

  handleChangeMode(newMode) {
    this.setState({
      mode: newMode
    });
  }

  render() {
    const mode = this.state.mode;

    return (
      <>
        <Header />
        <div className="auth">
          {mode == "login" && <Login onChangeMode={this.handleChangeMode} />}
          {mode == "register" && <Register onChangeMode={this.handleChangeMode} />}
        </div>
        <Footer />
      </>
    );
  }
}
