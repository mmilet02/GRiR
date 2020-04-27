import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, registerC } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link } from 'react-router-dom';
import { saveFloorPlan, uploadImage } from '../../actions/floorPlanAction.js';
import { getTableTypes } from '../../actions/tableTypesActions.js';
import NumericInput from 'react-numeric-input';
import Popup from 'reactjs-popup';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableDescriptionList: [],
      TableID: '',
      TableType: '',
      isOpen: false,
      FloorPlanImg: 'Floor plan image',
      startW: 0,
      endW: 0,
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
      Image: 'Izaberi sliku',
      file: '',
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

  componentDidMount() {
    this.props.clearErrors();
    this.props.getTableTypes();
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

  updateNumberPicker1 = (e) => {
    this.setState({ startW: e });
  };
  updateNumberPicker2 = (e) => {
    this.setState({ endW: e });
  };

  handleChangeFile = (e) => {
    this.setState({
      ...this.state,
      file: e.target.files[0],
      Image: e.target.files[0].name,
    });
  };

  formSubmit = (e) => {
    e.preventDefault();

    this.props.clearErrors();
    if (this.state.user === 'restaurant') {
      let formData = new FormData();
      formData.append('file', this.state.file);
      console.log(formData);
      const {
        Name,
        Email,
        Description,
        Type,
        Location,
        startW,
        endW,
        RestorauntPage,
        Phone,
        Image,
        Password,
        FloorPlanImg,
        tableDescriptionList,
      } = this.state;

      const newRestoraunt = {
        Name,
        Email,
        Description,
        Type,
        Location,
        StartingHour: startW,
        EndingHour: endW,
        RestorauntPage,
        Phone,
        Viewes: 0,
        ImgName: Image,
        TableList: tableDescriptionList,
        FloorPlanImgName: FloorPlanImg,
        ValidatedBy: 'none',
        Password,
      };
      //this.props.register(newRestoraunt, this.state.floorPlanList);
      this.props.register(newRestoraunt);
      this.props.uploadImage(formData);
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
  handleDeleteRow = (tableId) => {
    this.setState({
      tableDescriptionList: this.state.tableDescriptionList.filter(
        (td) => td.tableID !== tableId
      ),
    });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };
  closeModalAndAdd = () => {
    let temp = {
      TableID: this.state.TableID,
      TableType: this.state.TableType,
    };
    this.setState({
      tableDescriptionList: [...this.state.tableDescriptionList, temp],
      isOpen: false,
      TableID: '',
      TableType: '',
    });
  };
  handleAddRowPopUp = () => {
    this.setState({
      isOpen: true,
    });
  };
  hadnleTypeClick = (t) => {
    this.setState({
      TableType: t,
    });
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
    let tableDescription = this.state.tableDescriptionList.map((td) => {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
          key={td.TableID}
        >
          <p>{td.TableID}</p>
          <p>{td.TableType}</p>
          <div
            style={{
              cursor: 'pointer',
              border: '1px solid #333',
              padding: '5px',
            }}
            onClick={() => this.handleDeleteRow(td.tableID)}
          >
            Delete
          </div>
        </div>
      );
    });
    let tableTypes = this.props.types.map((table) => {
      return (
        <img
          key={table._id}
          onClick={() => this.hadnleTypeClick(table.TableType)}
          src={'http://localhost:3000/images/' + table.ImageName}
          alt=''
          style={{
            width: '10%',
            height: 'auto',
          }}
        />
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
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <NumericInput
                  onChange={(valueAsNumber) =>
                    this.updateNumberPicker1(valueAsNumber)
                  }
                  min={0}
                  max={23}
                  value={this.state.startW}
                  mobile
                />
                <NumericInput
                  onChange={(valueAsNumber) =>
                    this.updateNumberPicker2(valueAsNumber)
                  }
                  min={0}
                  max={23}
                  value={this.state.endW}
                  mobile
                />
              </div>
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
                  type='file'
                  name='Image'
                  className='userInput'
                  onChange={this.handleChangeFile}
                  accept='image/png, image/jpeg, image/jpg'
                />
                {this.state.Image}
              </label>
              <label>
                <input
                  type='file'
                  name='FloorPlanImg'
                  className='userInput'
                  onChange={this.handleChangeFile}
                  accept='image/png, image/jpeg, image/jpg'
                />
                {this.state.FloorPlanImg}
              </label>
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      cursor: 'pointer',
                      border: '1px solid #333',
                      padding: '5px',
                    }}
                    onClick={() => this.handleAddRowPopUp()}
                  >
                    Add table
                  </div>
                </div>
                {tableDescription}
              </div>
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
    return (
      <div className='reg_page'>
        {step}
        <Popup
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className='modal'>
            <div className='closeRestoraunt' onClick={this.closeModal}>
              +
            </div>
            <label>
              <input
                className='userInput'
                type='text'
                placeholder='Enter your table id'
                name='TableID'
                value={this.state.TableID}
                onChange={this.handleChange}
              />
            </label>
            <div className='popUpTableList'>{tableTypes}</div>
            <button onClick={this.closeModalAndAdd}>OK</button>
          </div>
        </Popup>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  types: state.tableTypes.tableTypes,
  error: state.error,
});
export default connect(mapStateToProps, {
  register,
  clearErrors,
  registerC,
  saveFloorPlan,
  uploadImage,
  getTableTypes,
})(Register);
