import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
      Email: '',
      Password: ''
    };
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  componentDidMount() {
    this.props.clearErrors();
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
  }

  formSubmit = e => {
    e.preventDefault();
    this.props.clearErrors();
    const { Email, Password } = this.state;
    const restoraunt = {
      Email,
      Password
    };
    this.props.login(restoraunt);
  };

  render() {
    return (
      <div className='login_page'>
        <div className='login_form'>
          <h1>Login form:</h1>
          <div className='form_wrapper'>
            <form className='form' onSubmit={this.formSubmit}>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Enter your email'
                  name='Email'
                  value={this.state.Email}
                  onChange={this.handleChange}
                />
              </label>

              <label>
                <input
                  className='userInput'
                  type='password'
                  placeholder='Password'
                  name='Password'
                  value={this.state.Password}
                  onChange={this.handleChange}
                />
              </label>
              {this.state.msg ? (
                <p style={{ color: 'red' }}>{this.state.msg}</p>
              ) : null}
              <button className='login_button' onClick={this.formSubmit}>
                LOGIN
              </button>
              <div className='signup'>
                <Link to='/reg' className='signup'>
                  Dont have an account? Sign up !
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(mapStateToProps, { login, clearErrors })(Login);
