import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link } from 'react-router-dom';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
      Name: '',
      Email: '',
      Description: '',
      WorkingHours: '',
      RestorauntPage: '',
      Phone: '',
      MaxNumbOfSeats: '',
      MaxNumbOfTables: '',
      Password: ''
    };
  }
  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      //Check for reg error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  formSubmit = e => {
    e.preventDefault();
    this.props.clearErrors();
    const {
      Name,
      Email,
      Description,
      WorkingHours,
      RestorauntPage,
      Phone,
      MaxNumbOfSeats,
      MaxNumbOfTables,
      Password
    } = this.state;

    const newRestoraunt = {
      Name,
      Email,
      Description,
      WorkingHours,
      RestorauntPage,
      Phone,
      MaxNumbOfSeats: parseInt(MaxNumbOfSeats),
      MaxNumbOfTables: parseInt(MaxNumbOfTables),
      Password
    };
    this.props.register(newRestoraunt);
  };

  render() {
    return (
      <div className='login_page'>
        <div className='login_form'>
          <h1>Register form:</h1>
          <div className='form_wrapper'>
            <form className='form' onSubmit={this.formSubmit}>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Enter your name'
                  name='Name'
                  value={this.state.Name}
                  onChange={this.handleChange}
                />
              </label>
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
                  type='text'
                  placeholder='Enter your description'
                  name='Description'
                  value={this.state.Description}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Enter your working hours'
                  name='WorkingHours'
                  value={this.state.WorkingHours}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Enter your link to restoraunt page'
                  name='RestorauntPage'
                  value={this.state.RestorauntPage}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Enter your phone'
                  name='Phone'
                  value={this.state.Phone}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Enter your maximal number of seats'
                  name='MaxNumbOfSeats'
                  value={this.state.MaxNumbOfSeats}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Enter your maximal number of tables'
                  name='MaxNumbOfTables'
                  value={this.state.MaxNumbOfTables}
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
                REGISTER
              </button>
              <div className='signup'>
                <Link to='/login' className='signup'>
                  Already a member? Login !
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
export default connect(mapStateToProps, { register, clearErrors })(Register);
