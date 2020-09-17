import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
      Email: '',
      Password: '',
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  componentDidMount() {
    this.props.clearErrors();
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      //Check for reg error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.props.user) {
      this.props.history.push('/');
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.clearErrors();
    const { Email, Password } = this.state;
    const user = {
      Email,
      Password,
    };
    this.props.login(user);
  };

  render() {
    return (
      <div className='login_page'>
        <div className='login_form'>
          <div className='login_formh1'>
            <h1>PRIJAVA</h1>
          </div>

          <div className='form_wrapper'>
            <form className='form' onSubmit={this.formSubmit}>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Email'
                  name='Email'
                  value={this.state.Email}
                  onChange={this.handleChange}
                />
              </label>

              <label>
                <input
                  className='userInput'
                  type='password'
                  placeholder='Šifra'
                  name='Password'
                  value={this.state.Password}
                  onChange={this.handleChange}
                />
              </label>
              {this.state.msg ? (
                <div className='errBoxL'>
                  <p style={{ color: 'red' }}>{this.state.msg}</p>
                </div>
              ) : null}
              <button
                className='login_button'
                onClick={this.formSubmit}
                style={{
                  marginTop: this.state.msg !== null ? '30px' : '60px',
                }}
              >
                PRIJAVA
              </button>
              <div className='signup'>
                <Link to='/reg' className='signup'>
                  Nemate račun? Registriraj te se!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error,
});
export default connect(mapStateToProps, { login, clearErrors })(
  withRouter(Login)
);
