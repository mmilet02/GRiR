import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, registerC } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link } from 'react-router-dom';
import FloorPlanCreating from '../Boss/FloorPlanCreating/FloorPlanCreating.js';
import { saveFloorPlan } from '../../actions/floorPlanAction.js';
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
      Password: '',
      Type: '',
      Location: '',
      step: 0,
      user: '',
      floorPlanList: [],
      typeDropDownList: [
        'Morsko',
        'Sve',
        'Pizze',
        'Vegeterijansko',
        'Gluten free',
        'Seljački',
      ],
      locationDropDownList: [
        'Split',
        'Zagreb',
        'Osijek',
        'Zadar',
        'Dubrovnik',
        'Rijeka',
        'Dugopolje',
        'Stobreć',
        'Hvar',
      ],
    };
  }

  handleSaveFloorPLan = (floorPlanList) => {
    console.log(floorPlanList);
    // this.props.saveFloorPlan(this.state.floorPlanList);
    this.setState({
      floorPlanList: floorPlanList,
    });
  };
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

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  formSubmit = (e) => {
    e.preventDefault();
    this.props.clearErrors();
    if (this.state.user === 'restaurant') {
      const {
        Name,
        Email,
        Description,
        Type,
        Location,
        WorkingHours,
        RestorauntPage,
        Phone,
        Password,
      } = this.state;

      const newRestoraunt = {
        Name,
        Email,
        Description,
        Type,
        Location,
        WorkingHours,
        RestorauntPage,
        Phone,
        Viewes: 0,
        ImgName: 'hello',
        Password,
      };
      this.props.register(newRestoraunt, this.state.floorPlanList);
    } else {
      const { Name, Email, Phone, Password } = this.state;

      const newCustomer = {
        Name,
        Email,
        Phone,
        Password,
      };
      this.props.registerC(newCustomer);
    }
  };
  handleUser = (user) => {
    if (user === 'r') {
      this.setState({
        step: 1,
        user: 'restaurant',
      });
    } else if (user === 'g') {
      this.setState({
        step: 1,
        user: 'guest',
      });
    }
  };
  render() {
    let a = 0,
      b = 0;
    let tddList = this.state.typeDropDownList.map((ele) => {
      a++;
      return (
        <option value={ele} key={a}>
          {ele}
        </option>
      );
    });

    let lddList = this.state.locationDropDownList.map((ele) => {
      b++;
      return (
        <option value={ele} key={b}>
          {ele}
        </option>
      );
    });

    let step = '';
    if (this.state.step === 0) {
      step = (
        <div className='choiseUser'>
          <div className='step1Heading'>
            <h1>CHOICE ONE</h1>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
              height: '100%',
            }}
          >
            <div className='choice' onClick={() => this.handleUser('r')}>
              <p>RESTAURANT</p>
            </div>
            <div className='choice' onClick={() => this.handleUser('g')}>
              <p>GUEST</p>
            </div>
          </div>
        </div>
      );
    } else if (this.state.step === 1 && this.state.user === 'restaurant') {
      step = (
        <div className='reg_form'>
          <h1>REGISTER</h1>
          <div className='form_wrapper_reg'>
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
                <select
                  className='userInput'
                  placeholder='What is the type of food that you make'
                  value={this.state.Type}
                  onChange={this.handleChange}
                  name='Type'
                >
                  <option value='' disabled defaultValue hidden>
                    What is the type of food that you make
                  </option>
                  <option value=''>-</option>
                  {tddList}
                </select>
              </label>
              <label>
                <select
                  className='userInput'
                  placeholder='Enter your location'
                  value={this.state.Location}
                  onChange={this.handleChange}
                  name='Location'
                >
                  <option value='' disabled defaultValue hidden>
                    What is your location
                  </option>
                  <option value=''>-</option>
                  {lddList}
                </select>
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
                  type='password'
                  placeholder='Password'
                  name='Password'
                  value={this.state.Password}
                  onChange={this.handleChange}
                />
              </label>
              {this.state.msg ? (
                <div className='errBox'>
                  <p style={{ color: 'red' }}>{this.state.msg}</p>
                </div>
              ) : null}
              <button
                className='reg_button'
                onClick={this.formSubmit}
                style={{
                  marginTop: this.state.msg !== null ? '30px' : '60px',
                }}
              >
                REGISTER
              </button>
              <div className='signup'>
                <Link to='/login' className='signup'>
                  Already a member? Login !
                </Link>
              </div>
            </form>
          </div>
          <FloorPlanCreating
            handleSaveFloorPLan={this.handleSaveFloorPLan}
          ></FloorPlanCreating>
        </div>
      );
    } else if (this.state.step === 1 && this.state.user === 'guest') {
      step = (
        <div className='reg_form'>
          <h1>REGISTER</h1>
          <div className='form_wrapper_reg'>
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
                  placeholder='Enter your phone'
                  name='Phone'
                  value={this.state.Phone}
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
                <div className='errBox'>
                  <p style={{ color: 'red' }}>{this.state.msg}</p>
                </div>
              ) : null}
              <button
                className='reg_button'
                onClick={this.formSubmit}
                style={{
                  marginTop: this.state.msg !== null ? '30px' : '60px',
                }}
              >
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
      );
    }
    return <div className='reg_page'>{step}</div>;
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, {
  register,
  clearErrors,
  registerC,
  saveFloorPlan,
})(Register);
