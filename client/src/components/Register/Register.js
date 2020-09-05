import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, registerC } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link, withRouter } from 'react-router-dom';
import { saveFloorPlan, uploadImage } from '../../actions/floorPlanAction.js';
import { getTableTypes } from '../../actions/tableTypesActions.js';
import NumericInput from 'react-numeric-input';
import {
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableDescriptionList: [],
      TableID: 'Identifikacijski broj stola',
      TableType: '',
      TableSize: 'Veličina stola',
      NOP: 'Maksimalan broj osoba',
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      FloorPlanImg: 'Niste izabrali tlocrt',
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
      Image: 'Niste izabrali sliku',
      file1: '',
      file2: '',
      TableSizeW: 'Širina stola',
      TableSizeH: 'Dužina stola',
      upLoaded: false,
      upLoaded2: false,
      floorPlanList: [],
      isMsg2: false,
      msg2: 'Niste unijeli sva polja',
      typeDropDownList: [
        'Restoran',
        'Gostionica',
        'Zdravljak',
        'Zalogajnica',
        'Pečenjarnica',
        'Pizzeria',
        'Bistro',
        'Slastičarna',
        'Pivnica',
        'Konoba',
        'Klet',
        'Krčma',
      ],
      locationDropDownList: [],
      ht: 0,
      desType: 0,
    };
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getTableTypes();
    window.scrollTo(0, 0);

    let newArray = [
      'Baška voda',
      'Bol',
      'Brela',
      'Cres',
      'Daruvar',
      'Murter',
      'Ogulin',
      'Supetar',
      'Trogir',
      'Vinkovci',
      'Virovitica',
      'Umag',
      'Split',
      'Zagreb',
      'Osijek',
      'Zadar',
      'Dubrovnik',
      'Rijeka',
      'Dugopolje',
      'Stobreć',
      'Hvar',
    ];
    newArray.sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });

    this.setState({
      tableDescriptionList: [],
      TableID: 'Identifikacijski broj stola',
      TableType: '',
      TableSize: 'Veličina stola',
      NOP: 'Maksimalan broj osoba',
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      FloorPlanImg: 'Niste izabrali tlocrt',
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
      Image: 'Niste izabrali sliku',
      file1: '',
      file2: '',
      TableSizeW: 'Širina stola',
      TableSizeH: 'Dužina stola',
      upLoaded: false,
      upLoaded2: false,
      floorPlanList: [],
      isMsg2: false,
      msg2: 'Niste unijeli sva polja',
      locationDropDownList: newArray,
    });
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      //Check for reg error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      }
      // else {
      //   this.setState({ msg: null });
      // }
    }
    if (this.props.user) {
      this.props.history.push('/');
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
    if (e.target.name === 'FloorPlanImg') {
      this.setState({
        ...this.state,
        file2: e.target.files[0],
        FloorPlanImg: e.target.files[0].name,
        upLoaded2: true,
      });
    } else if (e.target.name === 'Image') {
      this.setState({
        ...this.state,
        file1: e.target.files[0],
        Image: e.target.files[0].name,
        upLoaded: true,
      });
    }
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
        startW,
        endW,
        RestorauntPage,
        Phone,
        Image,
        Password,
        FloorPlanImg,
        tableDescriptionList,
      } = this.state;

      if (!Email.includes('@')) {
        this.setState({
          msg: 'Email mora sadržavati @ znamenku',
        });
      } else if (Phone === '' || Phone.match(/^[0-9]*$/) == null) {
        this.setState({
          msg: 'Mobitel mora sadržavati samo brojeve',
        });
      } else if (Password.length < 4) {
        this.setState({
          msg: 'Password mora imati minimalno 4 znamenke',
        });
      } else {
        let formData = new FormData();
        formData.append('file1', this.state.file1);
        formData.append('file2', this.state.file2);

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
        this.props.register(newRestoraunt);
        this.props.uploadImage(formData);
      }
    } else {
      const { Name, Email, Phone, Password } = this.state;
      if (!Email.includes('@')) {
        this.setState({
          msg: 'Email mora sadržavati @ znamenku',
        });
      } else if (Phone === '' || Phone.match(/^[0-9]*$/) == null) {
        this.setState({
          msg: 'Mobitel mora sadržavati samo brojeve',
        });
      } else if (Password.length < 4) {
        this.setState({
          msg: 'Password mora imati minimalno 4 znamenke',
        });
      } else {
        const newCustomer = {
          Name,
          Email,
          Phone,
          Password,
        };
        this.props.registerC(newCustomer);
      }
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
  handleDeleteRow = (n) => {
    let id = this.state.tableDescriptionList[n].TableID;
    this.setState({
      tableDescriptionList: this.state.tableDescriptionList.filter(
        (td) => td.TableID !== id
      ),
    });
  };
  closeModal = () => {
    this.setState({
      isOpen: false,
      TableID: 'Identifikacijski broj stola',
      TableSize: 'Veličina stola',
      NOP: 'Maksimalan broj osoba',
      isMsg2: false,
    });
  };
  closeModal1 = () => {
    this.setState({
      isOpen1: false,
      isMsg2: false,
      TableID: 'Identifikacijski broj stola',
      TableSizeW: 'Širina stola',
      TableSizeH: 'Dužina stola',
      NOP: 'Maksimalan broj osoba',
    });
  };
  closeModal2 = () => {
    this.setState({ isOpen2: false });
  };
  closeModalAndAdd = () => {
    if (
      this.state.TableID === 'Identifikacijski broj stola' ||
      this.state.TableSize === 'Veličina stola' ||
      this.state.NOP === 'Maksimalan broj osoba' ||
      this.state.TableID === '' ||
      this.state.TableSize === '' ||
      this.state.NOP === ''
    ) {
      this.setState({
        isMsg2: true,
        msg2: 'Niste unijeli sva polja',
      });
    } else if (
      this.state.tableDescriptionList.find(
        (tab) => tab.TableID === this.state.TableID
      )
    ) {
      this.setState({
        isMsg2: true,
        msg2: 'Stol sa tim ID-em već postoji',
      });
    } else {
      let temp = {
        TableID: this.state.TableID,
        TableType: this.state.TableType,
        TableSize: this.state.TableSize,
        NOP: this.state.NOP,
      };
      this.setState({
        tableDescriptionList: [...this.state.tableDescriptionList, temp],
        isOpen: false,
        TableID: '',
        TableType: '',
        NOP: '',
        TableSize: '',
      });
    }
  };
  closeModalAndAdd1 = () => {
    if (
      this.state.TableID === 'Identifikacijski broj stola' ||
      this.state.TableSizeW === 'Širina stola' ||
      this.state.TableSizeH === 'Dužina stola' ||
      this.state.NOP === 'Maksimalan broj osoba' ||
      this.state.TableID === '' ||
      this.state.TableSizeW === '' ||
      this.state.TableSizeH === '' ||
      this.state.NOP === ''
    ) {
      this.setState({
        isMsg2: true,
        msg2: 'Niste unijeli sva polja',
      });
    } else if (
      this.state.tableDescriptionList.find(
        (tab) => tab.TableID === this.state.TableID
      )
    ) {
      this.setState({
        isMsg2: true,
        msg2: 'Stol sa tim ID-em već postoji',
      });
    } else {
      let temp = {
        TableID: this.state.TableID,
        TableType: this.state.TableType,
        TableSizeW: this.state.TableSizeW,
        TableSizeH: this.state.TableSizeH,
        NOP: this.state.NOP,
      };
      this.setState({
        tableDescriptionList: [...this.state.tableDescriptionList, temp],
        isOpen1: false,
        TableID: '',
        TableType: '',
        NOP: '',
        TableSizeW: '',
        TableSizeH: '',
      });
    }
  };
  handleAddRowPopUp = () => {
    this.setState({
      isOpen: true,
    });
  };
  hadnleTypeClick = (t) => {
    if (t === 'circle') {
      this.setState({
        TableType: t,
        isOpen: true,
        desType: 1,
      });
    } else if (t === 'square') {
      this.setState({
        TableType: t,
        isOpen: true,
        desType: 2,
      });
    } else if (t === 'rectangle') {
      this.setState({
        TableType: t,
        isOpen1: true,
        desType: 3,
      });
    } else if (t === 'elipse') {
      this.setState({
        TableType: t,
        isOpen1: true,
        desType: 4,
      });
    }
  };
  handleDescriptionMessage1 = () => {
    this.setState({
      isOpen2: true,
      ht: 1,
    });
  };
  handleDescriptionMessage2 = () => {
    this.setState({
      isOpen2: true,
      ht: 2,
    });
  };
  reset = () => {
    this.setState({
      tableDescriptionList: [],
      TableID: 'Identifikacijski broj stola',
      TableType: '',
      TableSize: 'Veličina stola',
      NOP: 'Maksimalan broj osoba',
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      FloorPlanImg: 'Niste izabrali tlocrt',
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
      Image: 'Niste izabrali sliku',
      file1: '',
      file2: '',
      TableSizeW: 'Širina stola',
      TableSizeH: 'Dužina stola',
      upLoaded: false,
      upLoaded2: false,
      floorPlanList: [],
      isMsg2: false,
      msg2: 'Niste unijeli sva polja',
    });
  };
  render() {
    let a = 0,
      b = 0;
    let howTo;
    let desType;
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

    let n = -1;
    let tableDescription = this.state.tableDescriptionList.map((td) => {
      let x = {};
      n++;
      if (td.TableType === 'circle' || td.TableType === 'square') {
        x = (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: '5px 0px',
            }}
            key={td.TableID}
          >
            <p>{td.TableID}</p>
            <p>{td.TableType}</p>
            <p>
              {td.TableSize}X{td.TableSize}
            </p>
            <p>{td.NOP}</p>
            <div
              style={{
                cursor: 'pointer',
                padding: '5px',
                border: '1px solid #5f5f5f',
                color: ' #5f5f5f',
                borderRadius: '8px',
                backgroundColor: 'white',
              }}
              onClick={() => this.handleDeleteRow(n)}
            >
              Delete
            </div>
          </div>
        );
      } else if (td.TableType === 'rectangle' || td.TableType === 'elipse') {
        x = (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: '5px 0px',
            }}
            key={td.TableID}
          >
            <p>{td.TableID}</p>
            <p>{td.TableType}</p>
            <p>
              {td.TableSizeW}X{td.TableSizeH}
            </p>
            <p>{td.NOP}</p>
            <div
              style={{
                cursor: 'pointer',
                padding: '5px',
                border: '1px solid #5f5f5f',
                color: ' #5f5f5f',
                borderRadius: '8px',
                backgroundColor: 'white',
              }}
              onClick={() => this.handleDeleteRow(n)}
            >
              Delete
            </div>
          </div>
        );
      }
      return x;
    });

    let tableTypes = this.props.types.map((table) => {
      return (
        <img
          key={table._id}
          onClick={() => this.hadnleTypeClick(table.TableType)}
          src={'http://localhost:3000/images/' + table.ImageName}
          alt=''
          style={{
            marginLeft: '5px',
            width:
              table.TableType === 'circle' || table.TableType === 'square'
                ? '10%'
                : '20%',
            height: 'auto',
            cursor: 'pointer',
          }}
        />
      );
    });
    let step = '';
    if (this.state.step === 0) {
      step = (
        <div className='choiseUser'>
          <div className='step1Heading'>
            <h1>IZABERI JEDNO</h1>
          </div>
          <div className='choiceCon'>
            <div className='choice' onClick={() => this.handleUser('r')}>
              <p>RESTORAN</p>
            </div>
            <div className='choice' onClick={() => this.handleUser('g')}>
              <p>GOST</p>
            </div>
          </div>
        </div>
      );
    } else if (this.state.step === 1 && this.state.user === 'restaurant') {
      if (this.state.ht === 1) {
        howTo = (
          <p style={{ paddingTop: '40px' }}>
            Slika Restorana - izaberite JEDNU sliku koja će najbolje predstaviti
            vaš restoran, ta slika će se moći vidjeti na vašem profilu.
          </p>
        );
      } else if (this.state.ht === 2) {
        howTo = (
          <p style={{ paddingTop: '40px' }}>
            Tlocrt restorana - podrazumijeva sliku koju šaljete adminu, slika
            mora biti tlocrt vašeg restorana i mora imati jasno označen svaki
            stol sa jedinstvenim ID broje koji mora odgovarati ID broju i
            njegovom odgovarajučem opisu u tablici ispod. Ako admin nebude mogao
            razumjeti jasno sliku zahtjev će se poništiti.
          </p>
        );
      }

      if (this.state.desType === 1) {
        desType = <p style={{ paddingTop: '25px' }}>Niski okrugli stol</p>;
      } else if (this.state.desType === 2) {
        desType = <p style={{ paddingTop: '25px' }}> Niski kockasti stol</p>;
      } else if (this.state.desType === 3) {
        desType = <p style={{ paddingTop: '25px' }}>Niski pravokutasti stol</p>;
      } else if (this.state.desType === 4) {
        desType = <p style={{ paddingTop: '25px' }}>Niski eliptični stol</p>;
      }

      step = (
        <div className='reg_form1'>
          <h1>REGISTRACIJA</h1>
          <div className='form_wrapper_reg'>
            <form className='form' onSubmit={this.formSubmit}>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Ime'
                  name='Name'
                  value={this.state.Name}
                  onChange={this.handleChange}
                />
              </label>
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
                <select
                  className='userInput'
                  placeholder='Tip'
                  value={this.state.Type}
                  onChange={this.handleChange}
                  name='Type'
                  style={{
                    color: '#5f5f5f',
                  }}
                >
                  <option value='' disabled defaultValue hidden>
                    Koji je tip vašeg restorana
                  </option>
                  {tddList}
                </select>
              </label>
              <label>
                <select
                  className='userInput'
                  placeholder='Lokacija'
                  value={this.state.Location}
                  onChange={this.handleChange}
                  name='Location'
                  style={{
                    color: '#5f5f5f',
                  }}
                >
                  <option value='' disabled defaultValue hidden>
                    Koja je lokacija vašeg restorana
                  </option>
                  {lddList}
                </select>
              </label>
              <label>
                <textarea
                  value={this.state.Description}
                  onChange={this.handleChange}
                  name='Description'
                  className='userInput'
                  rows='9'
                  cols='50'
                  placeholder='Opis'
                  style={{
                    height: '70px',
                    resize: 'none',
                    paddingRight: '15px',
                    paddingTop: '10px',
                  }}
                ></textarea>
                {/* <input
                  className='userInput'
                  type='text'
                  placeholder='Opis'
                  name='Description'
                  value={this.state.Description}
                  onChange={this.handleChange}
                /> */}
              </label>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Link vaše stranice'
                  name='RestorauntPage'
                  value={this.state.RestorauntPage}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Broj mobitela'
                  name='Phone'
                  value={this.state.Phone}
                  onChange={this.handleChange}
                />
              </label>
              <div className='radnoVrime'>
                <p>Početak rada restorana:</p>
                <NumericInput
                  onChange={(valueAsNumber) =>
                    this.updateNumberPicker1(valueAsNumber)
                  }
                  min={0}
                  max={23}
                  value={this.state.startW}
                  mobile
                  className='numberPicker'
                />
              </div>
              <div className='radnoVrime'>
                <p>Kraj rada restorana:</p>
                <NumericInput
                  className='numberPicker'
                  onChange={(valueAsNumber) =>
                    this.updateNumberPicker2(valueAsNumber)
                  }
                  min={0}
                  max={23}
                  value={this.state.endW}
                  mobile
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '30px',
                }}
              >
                <label className='labelReg'>
                  <div className='upload-btn-wrapper'>
                    <button className='btnReg' style={{ marginRight: '11px' }}>
                      Slika restorana
                    </button>

                    <input
                      type='file'
                      name='Image'
                      className='userInput'
                      onChange={this.handleChangeFile}
                      accept='image/png, image/jpeg, image/jpg'
                    />
                  </div>
                  {this.state.upLoaded ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ color: 'rgb(3, 168, 124)', marginRight: '30px' }}
                      size='lg'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: 'rgb(255, 32, 32)', marginRight: '30px' }}
                      size='lg'
                    />
                  )}
                </label>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ color: 'rgb(0, 0, 0)', marginTop: '9px' }}
                  size='lg'
                  onClick={() => this.handleDescriptionMessage1()}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '30px',
                }}
              >
                <label className='labelReg'>
                  <div className='upload-btn-wrapper'>
                    <button className='btnReg' style={{ marginRight: '5px' }}>
                      Tlocrt restorana
                    </button>

                    <input
                      type='file'
                      name='FloorPlanImg'
                      className='userInput'
                      onChange={this.handleChangeFile}
                      accept='image/png, image/jpeg, image/jpg'
                    />
                  </div>
                  {this.state.upLoaded2 ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ color: 'rgb(3, 168, 124)', marginRight: '30px' }}
                      size='lg'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: 'rgb(255, 32, 32)', marginRight: '30px' }}
                      size='lg'
                    />
                  )}
                </label>

                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ color: 'rgb(0, 0, 0)', marginTop: '9px' }}
                  size='lg'
                  onClick={() => this.handleDescriptionMessage2()}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'rgb(3, 168, 124)',
                  marginTop: '20px',
                }}
              >
                <h3>DODAJTE STOLOVE</h3>
              </div>
              <div className='popUpTableList'>{tableTypes}</div>
              <div
                style={{
                  width: '80%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  color: 'rgb(3, 168, 124)',
                  marginTop: '10px',
                  marginBottom: tableDescription.length > 0 ? '10px' : '50px',
                  fontWeight: '600',
                }}
              >
                <p>ID</p>
                <p>TYPE</p>
                <p>SIZE</p>
                <p>NOP</p>
              </div>
              <div
                style={{
                  width: '100%',
                }}
              >
                {tableDescription}
              </div>
              <label
                style={{
                  marginTop: tableDescription.length > 0 ? '30px' : '10px',
                }}
              >
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
                  marginTop: this.state.msg !== null ? '60px' : '30px',
                }}
              >
                SIGN UP
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
          <h1>REGISTRACIJA</h1>
          <div className='form_wrapper_reg'>
            <form className='form' onSubmit={this.formSubmit}>
              <label>
                <input
                  className='userInput'
                  type='text'
                  placeholder='Ime'
                  name='Name'
                  value={this.state.Name}
                  onChange={this.handleChange}
                />
              </label>
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
                  type='text'
                  placeholder='Broj mobitela'
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
                SIGN UP
              </button>
              <div className='signup'>
                <Link to='/login' className='signup'>
                  Već imate račun? Prijavi te se !
                </Link>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className='reg_page'>
        {this.state.step === 1 ? (
          <div className='goBack'>
            <FontAwesomeIcon
              onClick={() => this.reset()}
              icon={faArrowLeft}
              style={{
                marginTop: '2px',
                marginLeft: '20px',
                cursor: 'pointer',
                color: 'rgb(3, 168, 124)',
              }}
              size='lg'
            />
          </div>
        ) : null}
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
            {desType}
            <label>
              <input
                style={{ marginTop: '25px' }}
                className='userInput'
                type='text'
                placeholder={this.state.TableID}
                name='TableID'
                value={
                  this.state.TableID === 'Identifikacijski broj stola'
                    ? ''
                    : this.state.TableID
                }
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input
                className='userInput'
                type='text'
                placeholder={this.state.NOP}
                name='NOP'
                value={
                  this.state.NOP === 'Maksimalan broj osoba'
                    ? ''
                    : this.state.NOP
                }
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input
                className='userInput'
                type='text'
                placeholder={this.state.TableSize}
                name='TableSize'
                value={
                  this.state.TableSize === 'Veličina stola'
                    ? ''
                    : this.state.TableSize
                }
                onChange={this.handleChange}
              />
            </label>
            {this.state.isMsg2 ? (
              <div className='errBox'>
                <p style={{ color: 'red' }}>{this.state.msg2}</p>
              </div>
            ) : null}
            <button
              style={{ width: '30%', margin: '0 35%', padding: '5px' }}
              onClick={this.closeModalAndAdd}
            >
              OK
            </button>
          </div>
        </Popup>
        <Popup
          open={this.state.isOpen1}
          closeOnDocumentClick
          onClose={this.closeModal1}
        >
          <div className='modal'>
            <div className='closeRestoraunt' onClick={this.closeModal1}>
              +
            </div>
            {desType}
            <label>
              <input
                style={{ marginTop: '25px' }}
                className='userInput'
                type='text'
                placeholder={this.state.TableID}
                name='TableID'
                value={
                  this.state.TableID === 'Identifikacijski broj stola'
                    ? ''
                    : this.state.TableID
                }
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input
                className='userInput'
                type='text'
                placeholder={this.state.NOP}
                name='NOP'
                value={
                  this.state.NOP === 'Maksimalan broj osoba'
                    ? ''
                    : this.state.NOP
                }
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input
                className='userInput'
                type='text'
                placeholder={this.state.TableSizeW}
                name='TableSizeW'
                value={
                  this.state.TableSizeW === 'Širina stola'
                    ? ''
                    : this.state.TableSizeW
                }
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input
                className='userInput'
                type='text'
                placeholder={this.state.TableSizeH}
                name='TableSizeH'
                value={
                  this.state.TableSizeH === 'Dužina stola'
                    ? ''
                    : this.state.TableSizeH
                }
                onChange={this.handleChange}
              />
            </label>
            {this.state.isMsg2 ? (
              <div className='errBox' style={{ marginBottom: '20px' }}>
                <p style={{ color: 'red' }}>{this.state.msg2}</p>
              </div>
            ) : null}
            <button
              style={{ width: '30%', margin: '0 35%', padding: '5px' }}
              onClick={this.closeModalAndAdd1}
            >
              OK
            </button>
          </div>
        </Popup>
        <Popup
          open={this.state.isOpen2}
          closeOnDocumentClick
          onClose={this.closeModal2}
        >
          <div className='modal'>
            <div className='closeRestoraunt' onClick={this.closeModal2}>
              +
            </div>
            {howTo}
            <button
              style={{ width: '30%', margin: '0 35%', padding: '5px' }}
              onClick={this.closeModal2}
            >
              OK
            </button>
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
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  register,
  clearErrors,
  registerC,
  saveFloorPlan,
  uploadImage,
  getTableTypes,
})(withRouter(Register));
