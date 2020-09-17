import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserProfile.css';
import { withRouter } from 'react-router';
import { logout } from '../../actions/authActions.js';
import {
  getGrades,
  turnValidatedBy,
  getRestoraunts,
} from '../../actions/floorPlanAction.js';
import equal from 'fast-deep-equal';
import {
  faMapMarkerAlt,
  faClock,
  faUtensils,
  faUserTie,
  faEnvelope,
  faPhone,
  faStar,
  faPencilAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from '../Restoraunt/DayPicker.js';
import FloorPlanExample from '../Restoraunt/FloorPlanExample/FloorPlanExample.js';
import { getReservation } from '../../actions/reservationsAction.js';
import Popup from 'reactjs-popup';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpen2: false,
      isOpen3: false,
      resto: {},
      startDate: new Date(),
      startDate1: new Date(),
      restos: [],
      mounteY: false,
      reservations: [],
      reser: {},
      datum3: '',
      restoName: '',
    };
  }
  componentDidMount() {
    this.props.getReservation();
    this.props.getRestoraunts();
    this.props.getGrades();
    this.setState({
      restos: this.props.restoraunts,
      reservations: this.props.reservations,
    });
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/login');
    }
    if (this.state.mounteY) {
      this.props.getRestoraunts();
      if (!equal(this.state.restos, this.props.restoraunts)) {
        this.setState({
          restos: this.props.restoraunts,
          mounteY: false,
        });
      }
    }
  }

  openModal = (resto) => {
    this.setState({
      isOpen: true,
      resto: resto,
    });
  };
  openModal2 = (resto) => {
    this.setState({
      isOpen2: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      resto: {},
    });
  };

  closeModal2 = () => {
    this.setState({
      isOpen2: false,
    });
  };

  closeModal3 = () => {
    this.setState({
      isOpen3: false,
      reser: {},
      datum3: '',
      restoName: '',
    });
  };
  calcGrade = () => {
    let filteredGrades = this.props.grades.filter(
      (g) => g.RestaurantID === this.props.user.restoraunt._id
    );
    let gradeSum = 0;
    let n = 0;
    let g = 0;
    let jedan = 0;
    let dva = 0;
    let tri = 0;
    let cetiri = 0;
    let pet = 0;
    if (0 < filteredGrades.length) {
      for (let i = 0; i < filteredGrades.length; i++) {
        if (filteredGrades[i].Grade === 1) {
          jedan++;
        } else if (filteredGrades[i].Grade === 2) {
          dva++;
        } else if (filteredGrades[i].Grade === 3) {
          tri++;
        } else if (filteredGrades[i].Grade === 4) {
          cetiri++;
        } else if (filteredGrades[i].Grade === 5) {
          pet++;
        }
        gradeSum += filteredGrades[i].Grade;
        n++;
      }
      g = gradeSum / n;
      g = g.toFixed(2);
    } else {
      g = '0.00';
    }
    let temp = {
      grade: g,
      jedan,
      dva,
      tri,
      cetiri,
      pet,
    };
    return temp;
  };
  buildStars = (grade) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (grade >= 1) {
        grade--;
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            style={{ margin: '0px 5 px', color: 'yellow', cursor: 'pointer' }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            style={{ margin: '0px 5 px', color: 'black' }}
          />
        );
      }
    }
    return stars;
  };
  handleDayPickerChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleDayPickerChange1 = (date) => {
    this.setState({
      startDate1: date,
    });
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleTurnOnOff = (x, id) => {
    this.props.turnValidatedBy(id, x);
    this.setState({
      mounteY: true,
    });
  };

  handleResDivClick = (res) => {
    let datum = new Date(res.Date);
    let resto = '';
    for (let i = 0; i < this.props.restoraunts.length; i++) {
      if (this.props.restoraunts[i]._id === res.RestorauntID) {
        resto = this.props.restoraunts[i].Name;
      }
    }
    this.setState({
      reser: res,
      isOpen3: true,
      datum3: `${datum.getDate()}/${datum.getMonth()}/${datum.getFullYear()}`,
      restoName: resto,
    });
  };
  render() {
    let gradesObj = 0;
    let filteredGrades = {};
    let numberOfGrades = 0;
    let stars = [];
    const { user } = this.props;
    let korisnik = '';
    let favList = [];
    let favo = {};
    let adminNoneLista = [];
    let adminYesList = [];
    let resList = [];
    let tablica = <p>Hee</p>;
    if (
      this.state.resto !== {} &&
      this.state.resto &&
      this.state.resto.TableList
    ) {
      tablica = this.state.resto.TableList.map((td) => {
        let x = {};
        if (
          td.TableType === 'Niski okrugli' ||
          td.TableType === 'Niski kockasti'
        ) {
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
            </div>
          );
        } else if (
          td.TableType === 'Niski stol' ||
          td.TableType === 'Niski eliptični'
        ) {
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
            </div>
          );
        }
        return x;
      });
    }
    let gcList = {};

    if (user && user.customer) {
      if (user.customer.Favorite.length === 0) {
        favList = (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 0px',
            }}
          >
            <p>Ovdje će se pojaviti restoran kad ga dodate u Favorite</p>
          </div>
        );
      } else {
        favList = user.customer.Favorite.map((fav) => {
          for (let i = 0; i < this.props.restoraunts.length; i++) {
            if (this.props.restoraunts[i]._id === fav)
              favo = this.props.restoraunts[i];
          }
          return (
            <div key={favo._id}>
              <div className='favRestoCon'>
                <Link to={'/restoraunt/' + favo._id} style={{ width: '100%' }}>
                  <img
                    src={'http://localhost:3000/uploads/' + favo.ImgName}
                    alt=''
                    className='favRestoImg'
                  />
                  <div className='absDiv'>{favo.Name}</div>
                </Link>
              </div>
            </div>
          );
        });
      }

      if (this.state.reservations.length === 0) {
        resList = (
          <p style={{ margin: '0 auto', padding: '10px 0px' }}>
            Ovdje će se dodavati vaše rezervacije.
          </p>
        );
      } else {
        resList = this.state.reservations
          .filter((r) => r.CustomerID === user.customer._id)
          .map((res) => {
            let datum = new Date(res.Date);
            return (
              <div
                key={res._id}
                className='resDiv'
                onClick={() => this.handleResDivClick(res)}
              >
                <p>
                  {datum.getDate()}/{datum.getMonth()}/{datum.getFullYear()}
                </p>
              </div>
            );
          });
        if (resList.length === 0) {
          resList = (
            <p style={{ margin: '0 auto', padding: '10px 0px' }}>
              Ovdje će se dodavati vaše rezervacije.
            </p>
          );
        }
      }

      korisnik = (
        <div className='userProfileCustomerConn'>
          <div className='nesto'>
            <div className='userProfileCustomerImgCon'>
              <img
                src='http://localhost:3000/images/tim.jpg'
                alt=''
                className='userProfileCustomerImg'
              />
            </div>
            <div className='userProfileCustomerInfoCon'>
              <div className='userProfileCustomerInfo'>
                <FontAwesomeIcon
                  icon={faUserTie}
                  style={{ marginRight: '5px', marginTop: '2px' }}
                />
                <p>{user.customer.Name}</p>
              </div>
              <div className='userProfileCustomerInfo'>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ marginRight: '5px', marginTop: '2px' }}
                />
                <p>{user.customer.Phone}</p>
              </div>{' '}
              <div className='userProfileCustomerInfo'>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ marginRight: '5px', marginTop: '2px' }}
                />
                <p>{user.customer.Email}</p>
              </div>
            </div>
          </div>
          <div className='kopija'>
            <div
              style={{
                color: 'rgb(3, 168, 124)',
                width: '100%',
                marginTop: '10px',
              }}
            >
              <h2>FAVORITE</h2>
            </div>
            <div className='userProfilaCustomerFavList'>{favList}</div>
          </div>
          <div className='kopija'>
            <div
              style={{
                color: 'rgb(3, 168, 124)',
                width: '100%',
                marginTop: '10px',
              }}
            >
              <h2>REZERVACIJE</h2>
            </div>
            <div className='userProfilaCustomerFavList'>{resList}</div>
          </div>
        </div>
      );
    } else if (user && user.restoraunt) {
      gradesObj = this.calcGrade();
      if (gradesObj.grade === '0.00') {
        stars = this.buildStars(0);
      } else {
        stars = this.buildStars(gradesObj.grade);
      }

      filteredGrades = this.props.grades.filter(
        (g) => g.RestaurantID === this.props.user.restoraunt._id
      );
      numberOfGrades = filteredGrades.length;
      gcList = this.props.grades
        .filter((g) => g.RestaurantID === this.props.user.restoraunt._id)
        .map((gc) => {
          let stars = this.buildStars(gc.Grade);
          let c = '';
          for (let i = 0; i < this.props.customers.length; i++) {
            if (this.props.customers[i]._id === gc.CustomerID) {
              c = this.props.customers[i].Name;
            }
          }
          return (
            <div key={gc._id} className='r4' style={{ marginBottom: '20px' }}>
              <div className='r1'>
                <div className='r2'>
                  <img
                    src='http://localhost:3000/images/tim.jpg'
                    alt=''
                    className='rImage'
                  />
                </div>
                <p>{c}</p>
              </div>
              <div className='r3'>
                <div>{stars}</div>
                <p>{gc.Comment}</p>
              </div>
            </div>
          );
        });
      korisnik = (
        <React.Fragment>
          <div className='userName'>
            <h1>{user.restoraunt.Name}</h1>
          </div>
          <div className='restourantInf'>
            <div className='restourantImages'>
              <img
                src={'http://localhost:3000/uploads/' + user.restoraunt.ImgName}
                alt=''
                className='restourantImg'
              />
            </div>
            <div className='restourantText'>
              <div className='restourantInfo'>
                <div className='restourantInfo2'>
                  <div className='restourantInfo1'>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <p>{user.restoraunt.Location}</p>
                  </div>
                  <div className='restourantInfo1'>
                    <FontAwesomeIcon
                      icon={faUtensils}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <p>{user.restoraunt.Type}</p>
                  </div>
                  <div className='restourantInfo1'>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <p>{user.restoraunt.StartingHour}:00</p>
                      <p>-</p>
                      <p>{user.restoraunt.EndingHour}:00</p>
                    </div>
                  </div>
                </div>
                <div className='restourantInfo2'>
                  <div className='restourantInfo1'>
                    {' '}
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <p>{user.restoraunt.Email}</p>
                  </div>
                  <div className='restourantInfo1'>
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <p>{user.restoraunt.Phone}</p>
                  </div>
                </div>
              </div>
              <div className='restourantDesc'>
                <p>{user.restoraunt.Description}</p>
                <div className='restourantDesc1'>
                  <p style={{ marginRight: '10px' }}>
                    Za više informacija o restoranu -{' '}
                  </p>

                  <a href={user.restoraunt.RestorauntPage}>
                    {user.restoraunt.RestorauntPage}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='bossDiv'>
            {user.restoraunt.ValidatedBy === 'none' ? (
              <div
                style={{
                  width: '90%',
                  padding: '10px 30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0px auto 30px auto',
                  color: 'rgb(87 39 243)',
                  backgroundColor: 'rgb(235 232 255)',
                  border: '1px blue solid',
                }}
              >
                <p>
                  Admin još nije obradio Vaš zahtjev za registracijom. U slučaju
                  da ste pogrešne podatke poslali Vaš zahtjev će biti poništen
                  te će te morati ponoviti postupak. Adminu je potrebno 2 do 3
                  dana da obradi zahtjev stoga Vas molim na strpljenju. Hvala na
                  korištenju naše stranice :)
                </p>
              </div>
            ) : (
              <React.Fragment>
                <div className='reserveInfo'>
                  <div className='db'>
                    <DatePicker
                      restoraunt={user.restoraunt}
                      handleDayPickerChange={this.handleDayPickerChange}
                      handleDayPickerChange1={this.handleDayPickerChange1}
                      datum={this.state.startDate}
                      vrime={this.state.startDate1}
                    />
                  </div>
                </div>
                <div className='floorPlanContainerEx'>
                  <FloorPlanExample
                    restoraunt={user.restoraunt}
                    datum={this.state.startDate}
                    datum1={this.state.startDate1}
                    d={false}
                  ></FloorPlanExample>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className='recenzija'>
            <div className='truntaOcjenaCon'>
              <div className='truntaOcjena'>
                <h1>{gradesObj.grade}</h1>
                <div>{stars}</div>
                <h1>{numberOfGrades}</h1>
                <button className='btnSeeAll' onClick={this.openModal2}>
                  Pogledaj sve
                </button>
              </div>
              <div className='numOfOcijena'>
                <div className='postotak'>
                  <h3>5 </h3>
                  <div className='posBar'>
                    <div
                      style={{
                        height: '100%',
                        width:
                          gradesObj.pet === 0
                            ? '0px'
                            : (gradesObj.pet / numberOfGrades) * 100 + '%',
                        backgroundColor: 'rgb(3, 168, 124)',
                        borderRadius: '30px',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='postotak'>
                  <h3>4 </h3>
                  <div className='posBar'>
                    <div
                      style={{
                        height: '100%',
                        width:
                          gradesObj.cetiri === 0
                            ? '0px'
                            : (gradesObj.cetiri / numberOfGrades) * 100 + '%',
                        backgroundColor: 'rgb(3, 168, 124)',
                        borderRadius: '30px',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='postotak'>
                  <h3>3 </h3>
                  <div className='posBar'>
                    <div
                      style={{
                        height: '100%',
                        width:
                          gradesObj.tri === 0
                            ? '0px'
                            : (gradesObj.tri / numberOfGrades) * 100 + '%',
                        backgroundColor: 'rgb(3, 168, 124)',
                        borderRadius: '30px',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='postotak'>
                  <h3>2 </h3>
                  <div className='posBar'>
                    <div
                      style={{
                        height: '100%',
                        width:
                          gradesObj.dva === 0
                            ? '0px'
                            : (gradesObj.dva / numberOfGrades) * 100 + '%',
                        backgroundColor: 'rgb(3, 168, 124)',
                        borderRadius: '30px',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='postotak'>
                  <h3>1 </h3>
                  <div className='posBar'>
                    <div
                      style={{
                        height: '100%',
                        width:
                          gradesObj.jedan === 0
                            ? '0px'
                            : (gradesObj.jedan / numberOfGrades) * 100 + '%',
                        backgroundColor: 'rgb(3, 168, 124)',
                        borderRadius: '30px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (user && user.admin) {
      adminNoneLista = this.state.restos.filter(
        (resto) => resto.ValidatedBy === 'none'
      );

      if (adminNoneLista.length === 0) {
        adminNoneLista = (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 0px',
              color: '#5f5f5f',
            }}
          >
            <p>Ovdje će se pojaviti zahtjevi restorana.</p>
          </div>
        );
      } else {
        adminNoneLista = adminNoneLista.map((resto) => {
          return (
            <div
              style={{ display: 'flex', flexDirection: 'row' }}
              key={resto._id}
            >
              <div className='favRestoCon1'>
                <Link to={'/restoraunt/' + resto._id} style={{ width: '100%' }}>
                  <img
                    src={'http://localhost:3000/uploads/' + resto.ImgName}
                    alt=''
                    className='favRestoImg1'
                  />

                  <div className='absDiv1'>{resto.Name}</div>
                </Link>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '20px',
                }}
              >
                <FontAwesomeIcon
                  onClick={() => this.openModal(resto)}
                  icon={faInfoCircle}
                  style={{ cursor: 'pointer' }}
                />
                <Link
                  to={'/fpc/' + resto._id}
                  style={{ color: 'rgb(3, 168, 124)', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    style={{ marginTop: '5px' }}
                  />
                </Link>
              </div>
            </div>
          );
        });
      }

      adminYesList = this.state.restos.filter(
        (resto) =>
          resto.ValidatedBy === user.admin._id || resto.ValidatedBy === 'off'
      );
      if (adminYesList.length === 0) {
        adminYesList = (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 0px',
              color: '#5f5f5f',
            }}
          >
            <p>Ovdje će se pojaviti restorani kad ih odobrite</p>
          </div>
        );
      } else {
        adminYesList = adminYesList.map((resto) => {
          return (
            <div
              style={{ display: 'flex', flexDirection: 'row' }}
              key={resto._id}
            >
              <div className='favRestoCon1'>
                <Link to={'/restoraunt/' + resto._id} style={{ width: '100%' }}>
                  <img
                    src={'http://localhost:3000/uploads/' + resto.ImgName}
                    alt=''
                    className='favRestoImg1'
                  />
                  {resto.ValidatedBy === 'off' ? (
                    <svg
                      height='30'
                      width='35'
                      style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                      }}
                    >
                      <line
                        x1='6'
                        y1='0'
                        x2='35'
                        y2='22'
                        style={{
                          stroke: 'rgb(255,0,0)',
                          strokeWidth: '6',
                        }}
                      />
                    </svg>
                  ) : null}
                  <div className='absDiv1'>{resto.Name}</div>
                </Link>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '20px',
                }}
              >
                <FontAwesomeIcon
                  onClick={() => this.openModal(resto)}
                  icon={faInfoCircle}
                  style={{
                    marginRight: '20px',
                    marginTop: '2px',
                    cursor: 'pointer',
                  }}
                />
                <div
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={
                    resto.ValidatedBy !== 'off'
                      ? () => this.handleTurnOnOff('off', resto._id)
                      : () => this.handleTurnOnOff(user.admin._id, resto._id)
                  }
                >
                  {resto.ValidatedBy !== 'off' ? (
                    <p style={{ color: 'rgb(3, 168, 124)' }}>OPEN</p>
                  ) : (
                    <p style={{ color: 'rgb(3, 168, 124)' }}>CLOSED</p>
                  )}
                </div>
              </div>
            </div>
          );
        });
      }

      korisnik = (
        <div className='userProfileCustomerConn1'>
          <div className='nesto1'>
            <div className='userProfileCustomerImgCon1'>
              <img
                src='http://localhost:3000/images/tim.jpg'
                alt=''
                className='userProfileCustomerImg1'
              />
            </div>
            <div className='userProfileCustomerInfoCon1'>
              <div className='userProfileCustomerInfo1'>
                <h2>{user.admin.Email}</h2>
              </div>
            </div>
          </div>
          <div className='adminRestoList'>
            <div className='listaCon'>
              <div className='hh2' style={{ width: '100%' }}>
                <h2>PRIHVAČENI</h2>
              </div>
              <div className='adminRestoListColumn'>{adminYesList}</div>
            </div>
            <div className='listaCon'>
              <div className='hh2' style={{ width: '100%' }}>
                <h2>LISTA ČEKANJA</h2>
              </div>
              <div className='adminRestoListColumn'>{adminNoneLista}</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='userCon'>
        {korisnik}
        <button className='logout_button' onClick={this.props.logout}>
          ODJAVA
        </button>
        <Popup
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={() => this.closeModal()}
        >
          <div className='modalUserProfile'>
            <div className='rInfo'>
              <div className='rInfoC1'>
                <p>
                  <b className='green'>Ime:</b> {this.state.resto.Name}
                </p>
                <p>
                  <b className='green'>Email:</b> {this.state.resto.Email}
                </p>
                <p>
                  <b className='green'>Tip:</b> {this.state.resto.Type}
                </p>
                <p>
                  <b className='green'>Lokacija:</b> {this.state.resto.Location}
                </p>
                <p>
                  <b className='green'>Radno vrijeme:</b>{' '}
                  {this.state.resto.StartingHour}:00-
                  {this.state.resto.EndingHour}:00
                </p>
                <p>
                  <b className='green'>Web stranica:</b>{' '}
                  {this.state.resto.RestorauntPage}
                </p>
                <p>
                  <b className='green'>Mobitel:</b> {this.state.resto.Phone}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <p>
                    <b className='green'>Tlocrt:</b>{' '}
                  </p>
                  <a
                    href={
                      'http://localhost:3000/uploads/' +
                      this.state.resto.ImgName
                    }
                    download
                  >
                    <button className='btnDow'>Download</button>
                  </a>
                </div>
              </div>
              <div
                className='marin1'
                style={{
                  margin: '10px auto 30px auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  className='marin2'
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    color: 'rgb(3, 168, 124)',
                    marginTop: '10px',
                    marginBottom: '10px',
                    fontWeight: '600',
                  }}
                >
                  <p>ID</p>
                  <p>TIP</p>
                  <p>VELIČINA</p>
                  <p>NOP</p>
                </div>
                <div className='rInfoC2'>{tablica}</div>
              </div>
            </div>
            <button className='btnmodul' onClick={() => this.closeModal()}>
              OK
            </button>
          </div>
        </Popup>
        <Popup
          open={this.state.isOpen2}
          closeOnDocumentClick
          onClose={() => this.closeModal2()}
        >
          <div
            className='modal'
            style={{
              height: '500px',
              overflow: 'scroll',
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            <div className='r5'>
              <h1>Sve recenzije</h1>
            </div>
            {gcList}
            <button className='btnModul' onClick={() => this.closeModal2()}>
              OK
            </button>
          </div>
        </Popup>
        <Popup
          open={this.state.isOpen3}
          closeOnDocumentClick
          onClose={() => this.closeModal3()}
        >
          <div className='modal'>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <h1 style={{ margin: '0 auto' }}>{this.state.restoName}</h1>
              <p style={{ marginLeft: '20px' }}>
                <b>Datum: </b> {this.state.datum3}
              </p>
              <p style={{ marginLeft: '20px' }}>
                <b>Sat dolaska: </b>
                {this.state.reser.Hour}
              </p>
              <p style={{ marginLeft: '20px' }}>
                <b>Komentar: </b> {this.state.reser.Comment}
              </p>
              {this.state.reser.NumberOfPeople <= 4 ? (
                <p style={{ marginLeft: '20px' }}>
                  Za {this.state.reser.NumberOfPeople} osobe
                </p>
              ) : (
                <p style={{ marginLeft: '20px' }}>
                  Za {this.state.reser.NumberOfPeople} osoba
                </p>
              )}
            </div>
            <button className='btnModul' onClick={() => this.closeModal3()}>
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
  user: state.auth.user,
  grades: state.floorPlan.grades,
  restoraunts: state.floorPlan.restoraunts,
  customers: state.floorPlan.customers,
  reservations: state.reservation.reservations,
});
export default connect(mapStateToProps, {
  logout,
  getGrades,
  turnValidatedBy,
  getRestoraunts,
  getReservation,
})(withRouter(UserProfile));
