import React, { Component } from 'react';
import './Restoraunt.css';
import { connect } from 'react-redux';
import FloorPlanExample from './FloorPlanExample/FloorPlanExample.js';
import {
  addGrade,
  getGrades,
  updateFavorite,
  getCustomers,
  turnValidatedBy,
} from '../../actions/floorPlanAction.js';
import { withRouter } from 'react-router';
import Popup from 'reactjs-popup';
import {
  faMapMarkerAlt,
  faClock,
  faUtensils,
  faStar,
  faHeart,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from './DayPicker.js';
import {
  getReservation,
  addReservation,
} from '../../actions/reservationsAction.js';

class Restoraunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rests: [],
      brLjudi: 0,
      nizStolova: [],
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      didGrade: false,
      favorite: false,
      Comment: '',
      Comment1: '',
      grade: 0,
      gradeComment: {},
      startDate: new Date(),
      startDate1: new Date(),
      floorPlanID: '',
      tableID: [],
      numberOfPeople: 0,
      count: 0,
      msg: null,
      msg1: null,
      res: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getCustomers();
    this.props.getReservation();
    let did = false;
    let gradeComment = {};
    if (this.props.user && this.props.user.customer) {
      for (let i = 0; i < this.props.grades.length; i++) {
        if (
          this.props.grades[i].RestaurantID === this.props.match.params.id &&
          this.props.grades[i].CustomerID === this.props.user.customer._id
        ) {
          did = true;
          gradeComment = this.props.grades[i];
        }
      }
    }

    this.setState({
      gradeComment: gradeComment,
      rests: this.props.restoraunts,
      didGrade: this.props.user
        ? this.props.user.customer
          ? did
            ? true
            : false
          : false
        : false,
      favorite:
        this.props.user && this.props.user.customer
          ? this.props.user.customer.Favorite.find(
              (fav) => fav === this.props.match.params.id
            )
            ? true
            : false
          : false,
    });

    window.scrollTo(0, 0);
  }
  calcGrade = (resto) => {
    let gradeComment = 0;
    for (let i = 0; i < this.props.grades.length; i++) {
      if (this.props.grades[i].RestaurantID === this.props.match.params.id) {
        gradeComment = this.props.grades[i];
      }
    }
    let filteredGrades = this.props.grades.filter(
      (g) => g.RestaurantID === resto._id
    );

    let gradeSum = 0;
    let sum = 0;
    let g = 0;
    let n = 0;
    let jedan = 0;
    let dva = 0;
    let tri = 0;
    let cetiri = 0;
    let pet = 0;
    if (filteredGrades.length > 0) {
      for (let i = 0; i < filteredGrades.length; i++) {
        if (filteredGrades[i].Grade === 1) {
          jedan++;
          sum++;
        } else if (filteredGrades[i].Grade === 2) {
          dva++;
          sum++;
        } else if (filteredGrades[i].Grade === 3) {
          tri++;
          sum++;
        } else if (filteredGrades[i].Grade === 4) {
          cetiri++;
          sum++;
        } else if (filteredGrades[i].Grade === 5) {
          pet++;
          sum++;
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
      gradeComment,
      sum,
    };
    return temp;
  };

  onStarClick = (grade, resto, comment) => {
    const { user } = this.props;

    if (user && user.customer) {
      this.props.addGrade(
        grade,
        comment,
        resto._id,
        user.customer._id,
        user.token
      );
      this.setState({
        didGrade: true,
        grade: 0,
        Comment: '',
      });
    } else {
      this.setState({ isOpen: true });
    }
  };

  onStarClick1 = (grade) => {
    this.setState({ grade: grade });
  };
  onStarClickO = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false, msg: null, Comment: '', grade: 0 });
  };
  closeModal1 = () => {
    this.setState({ isOpen1: false });
  };
  closeModal2 = () => {
    this.setState({ isOpen2: false });
  };
  closeModal3 = () => {
    this.setState({ isOpen3: false });
  };
  closeModal4 = () => {
    this.setState({ isOpen4: false });
  };
  openModal2 = () => {
    this.setState({ isOpen2: true });
  };
  openModal4 = () => {
    this.setState({ isOpen4: true });
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
      }
      // else if (grade < 1 && grade > 0) {
      //   grade--;
      //   stars.push(
      //     <FontAwesomeIcon key={i} icon={faStarHalf} className='halfStarL' />
      //   );
      //   stars.push(
      //     <FontAwesomeIcon key={i} icon={faStarHalf} className='halfStarR' />
      //   );
      // }
      else {
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

  updateFav = (id) => {
    if (!this.props.user || this.props.user.admin) {
      this.setState({
        isOpen1: true,
      });
    } else {
      if (this.props.user && this.props.user.customer) {
        const { _id, Favorite } = this.props.user.customer;
        const { token } = this.props.user;
        let or = false;

        for (let i = 0; i < Favorite.length; i++) {
          if (Favorite[i] === id) {
            or = true;
          }
        }
        let newFav = [];
        if (or) {
          newFav = Favorite.filter((fav) => fav !== id);
          this.setState({
            favorite: false,
          });
        } else {
          newFav = [...Favorite, id];
          this.setState({
            favorite: true,
          });
        }
        this.props.updateFavorite(_id, newFav, token);
      }
    }
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
  handleFloorPlan = (FloorPlanID, TableID, NumberOfPeople, x) => {
    if (x === 'plus') {
      this.setState({
        floorPlanID: FloorPlanID,
        tableID: [...this.state.tableID, TableID],
        numberOfPeople: this.state.numberOfPeople + NumberOfPeople,
      });
    } else {
      this.setState({
        floorPlanID: FloorPlanID,
        tableID: this.state.tableID.filter((tab) => tab !== TableID),
        numberOfPeople: this.state.numberOfPeople - NumberOfPeople,
      });
    }
  };
  handleReservation = (resto) => {
    let newDate = new Date();
    if (
      !this.props.user ||
      this.props.user.restoraunt ||
      this.props.user.admin
    ) {
      this.setState({
        isOpen3: true,
      });
    } else if (
      this.state.Comment1 === '' ||
      this.state.brLjudi === 0 ||
      (this.state.startDate1.getMinutes() !== 0 &&
        this.state.startDate1.getMinutes() !== 15 &&
        this.state.startDate1.getMinutes() !== 30 &&
        this.state.startDate1.getMinutes() !== 45) ||
      newDate > this.state.startDate
    ) {
      this.setState({
        msg1: 'Niste ispravno ispunili sva polja potrebna za rezervaciju',
      });
    } else {
      const { token } = this.props.user;
      let hour = `${this.state.startDate1.getHours()}:${this.state.startDate1.getMinutes()}`;
      let reservation = {
        RestorauntID: resto._id,
        FloorPlanID: this.state.floorPlanID,
        CustomerID: this.props.user.customer._id,
        TableID: this.state.tableID,
        Date: this.state.startDate,
        Hour: hour,
        Comment: this.state.Comment1,
        NumberOfPeople: this.state.brLjudi,
      };
      this.setState({
        msg1: null,
        startDate: newDate,
        startDate1: newDate,
        Comment1: '',
        nizStolova: [],
        tableID: [],
        count: 0,
        numberOfPeople: 0,
        brLjudi: 0,
        res: true,
      });
      this.props.addReservation(reservation, token);
      this.props.history.push('/');
    }
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  onSubmit = (resto) => {
    if (this.state.Comment === '' || this.state.grade === 0) {
      this.setState({
        msg: 'Niste unijeli sva polja',
      });
    } else {
      this.setState({
        msg: null,
      });
      this.closeModal();
      this.onStarClick(this.state.grade, resto, this.state.Comment);
    }
  };

  handleCount = (n, table) => {
    let niz = this.state.nizStolova;
    let isThere = niz.find((n) => n._id === table._id);

    if (isThere) {
      let x = 0;
      let list = niz.filter((n) => n._id !== table._id);
      for (let i = 0; i < list.length; i++) {
        x += parseInt(list[i].NumberOfPeople);
      }
      this.setState({
        count: n,
        nizStolova: list,
        brLjudi: x,
      });
    } else {
      let x = 0;
      let list = [...this.state.nizStolova, table];
      for (let i = 0; i < list.length; i++) {
        x += parseInt(list[i].NumberOfPeople);
      }
      this.setState({
        count: n,
        nizStolova: list,
        brLjudi: x,
      });
    }
  };
  handleDeleteTableID = (table) => {
    let niz = this.state.nizStolova;
    let isThere = niz.find((n) => n._id === table._id);
    if (isThere) {
      let x = 0;
      let list = niz.filter((n) => n._id !== table._id);
      for (let i = 0; i < list.length; i++) {
        x += parseInt(list[i].NumberOfPeople);
      }
      this.setState({
        count: list.length,
        tableID: this.state.tableID.filter((tid) => tid !== table._id),
        nizStolova: list,
        brLjudi: x,
      });
    }
  };
  render() {
    const { user } = this.props;
    let resto = {};
    for (const rest of this.state.rests) {
      if (rest._id === this.props.match.params.id) {
        resto = rest;
      }
    }
    let gcList = this.props.grades
      .filter((g) => g.RestaurantID === resto._id)
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
    let gradesObj = this.calcGrade(resto);
    let stars1 = {};
    let stars3 = {};
    let stars4 = {};
    stars3 = (
      <React.Fragment>
        {' '}
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black', cursor: 'pointer' }}
          onClick={this.onStarClickO}
          size='lg'
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black', cursor: 'pointer' }}
          onClick={this.onStarClickO}
          size='lg'
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black', cursor: 'pointer' }}
          onClick={this.onStarClickO}
          size='lg'
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black', cursor: 'pointer' }}
          onClick={this.onStarClickO}
          size='lg'
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black', cursor: 'pointer' }}
          onClick={this.onStarClickO}
          size='lg'
        />
      </React.Fragment>
    );
    stars1 = this.buildStars(gradesObj.grade);
    if (this.state.didGrade) {
      stars4 = this.buildStars(gradesObj.gradeComment.Grade);
    } else {
    }
    let stars2 = (
      <div className='zvijezde'>
        <h3 style={{ marginRight: '20px' }}>Ocjena: {this.state.grade}</h3>
        <FontAwesomeIcon
          className='s'
          icon={faStar}
          style={{ margin: '0px 5px', color: 'black' }}
          onClick={() => this.onStarClick1(1)}
        />
        <FontAwesomeIcon
          className='s'
          icon={faStar}
          style={{ margin: '0px 5px', color: 'black' }}
          onClick={() => this.onStarClick1(2)}
        />
        <FontAwesomeIcon
          className='s'
          icon={faStar}
          style={{ margin: '0px 5px', color: 'black' }}
          onClick={() => this.onStarClick1(3)}
        />
        <FontAwesomeIcon
          className='s'
          icon={faStar}
          style={{ margin: '0px 5px', color: 'black' }}
          onClick={() => this.onStarClick1(4)}
        />
        <FontAwesomeIcon
          className='s'
          icon={faStar}
          style={{ margin: '0px 5px', color: 'black' }}
          onClick={() => this.onStarClick1(5)}
        />
      </div>
    );
    let modalContent = {};
    let favModal = {};
    let resModal = {};

    if (user && user.restoraunt) {
      resModal = (
        <div className='modal'>
          <p className='modalP'>Kao restoran nemožete napraviti rezervaciju.</p>
          <button className='btnModul' onClick={this.closeModal3}>
            OK
          </button>
        </div>
      );
      modalContent = (
        <div className='modal'>
          <p className='modalP'>
            Kao restoran nemožete ocijeniti drugi restoran.
          </p>
          <button className='btnModul' onClick={this.closeModal}>
            OK
          </button>
        </div>
      );
      favModal = (
        <div className='modal'>
          <p className='modalP'>
            Kao restoran nemožete dodati restoran u favorite.
          </p>
          <button className='btnModul' onClick={this.closeModal1}>
            OK
          </button>
        </div>
      );
    } else if (user && user.admin) {
      favModal = (
        <div className='modal'>
          <p className='modalP'>
            Kao admin nemožete dodati restoran u favorite.
          </p>
          <button className='btnModul' onClick={this.closeModal1}>
            OK
          </button>
        </div>
      );
      resModal = (
        <div className='modal'>
          <p className='modalP'>Kao admin nemožete napraviti rezervaciju.</p>
          <button className='btnModul' onClick={this.closeModal3}>
            OK
          </button>
        </div>
      );
      modalContent = (
        <div className='modal'>
          <p className='modalP'>Kao admin nemožete ocijeniti restoran</p>
          <button className='btnModul' onClick={this.closeModal}>
            OK
          </button>
        </div>
      );
    } else if (!user) {
      resModal = (
        <div className='modal'>
          <p className='modalP'>
            Morate se prijaviti kako bi mogli napraviti rezervaciju.
          </p>
          <button className='btnModul' onClick={this.closeModal3}>
            OK
          </button>
        </div>
      );
      favModal = (
        <div className='modal'>
          <p className='modalP'>
            Morate se prijaviti kako bi mogli dodati restoran u favorite.
          </p>
          <button className='btnModul' onClick={this.closeModal1}>
            OK
          </button>
        </div>
      );
      modalContent = (
        <div className='modal'>
          <p className='modalP'>
            Morate se prijaviti kako bi mogli ocijeniti restoran.
          </p>
          <button className='btnModul' onClick={this.closeModal}>
            OK
          </button>
        </div>
      );
    } else {
      favModal = (
        <div className='modal'>
          <p className='modalP'>HELLLLOOOOOO</p>
          <button className='btnModul' onClick={this.closeModal1}>
            OK
          </button>
        </div>
      );
      modalContent = (
        <div className='modal'>
          <div className='closeRestoraunt' onClick={this.closeModal}>
            +
          </div>
          <div
            style={{
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
              padding: '0 10px',
            }}
          >
            {stars2}
            <label>
              <textarea
                value={this.state.Comment}
                onChange={this.handleChange}
                name='Comment'
                className='userInput'
                rows='9'
                cols='50'
                placeholder='Enter your comment'
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
                placeholder='Enter your comment'
                name='Comment'
                value={this.state.Comment}
                onChange={this.handleChange}
              /> */}
            </label>
            {this.state.msg ? (
              <div className='errBox' style={{ marginTop: '20px' }}>
                <p style={{ color: 'red' }}>{this.state.msg}</p>
              </div>
            ) : null}
            <button className='btnModul' onClick={() => this.onSubmit(resto)}>
              OK
            </button>
          </div>
        </div>
      );
      resModal = (
        <div className='modal'>
          <p className='modalP'>heloooooooooooo</p>
          <button className='btnModul' onClick={this.closeModal3}>
            OK
          </button>
        </div>
      );
    }
    let infoSelectedTable = (
      <div className='infoS'>
        <p>Broj stolova: 0</p>
        <p>Broj ljudi: 0</p>
      </div>
    );
    if (this.state.nizStolova.length > 0) {
      infoSelectedTable = (
        <div className='infoS'>
          <p>Broj stolova: {this.state.nizStolova.length}</p>
          <p>Broj ljudi: {this.state.brLjudi}</p>
        </div>
      );
    }

    return (
      <div className='containerEx'>
        <div className='restourantName'>
          <h1>{resto.Name}</h1>

          {this.props.user &&
          (this.props.user.restoraunt || this.props.user.admin) ? null : (
            <FontAwesomeIcon
              icon={faHeart}
              className={
                this.state.favorite ? 'favoriteHeart yesFav' : 'favoriteHeart'
              }
              onClick={() => this.updateFav(resto._id)}
            />
          )}
        </div>
        <div className='restourantInf'>
          <div className='restourantImages'>
            <img
              src={'http://localhost:3000/uploads/' + resto.ImgName}
              alt=''
              className='restourantImg'
            />
          </div>
          <div className='restourantText'>
            <div className='restourantInfo'>
              <div className='restourantInfo2'>
                <div className='restourantInfo1'>
                  {' '}
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>{resto.Location}</p>
                </div>
                <div className='restourantInfo1'>
                  <FontAwesomeIcon
                    icon={faUtensils}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>{resto.Type}</p>
                </div>
                <div className='restourantInfo1'>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>{resto.StartingHour}:00</p>
                    <p>-</p>
                    <p>{resto.EndingHour}:00</p>
                  </div>
                </div>
              </div>
              <div className='restourantInfo2'>
                <div className='restourantInfo1'>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>{resto.Email}</p>
                </div>
                <div className='restourantInfo1'>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>{resto.Phone}</p>
                </div>
              </div>
            </div>
            <div className='restourantDesc'>
              <p>{resto.Description}</p>
              <div className='restourantDesc1'>
                <p style={{ marginRight: '10px' }}>
                  Za više informacija o restoranu -{' '}
                </p>
                <a href={resto.RestorauntPage}>{resto.RestorauntPage}</a>
              </div>
            </div>
          </div>
        </div>
        <div className='bossDiv'>
          <div className='reserveInfo'>
            <div className='db'>
              <DatePicker
                restoraunt={resto}
                handleDayPickerChange={this.handleDayPickerChange}
                handleDayPickerChange1={this.handleDayPickerChange1}
                datum={this.state.startDate}
                vrime={this.state.startDate1}
              />
            </div>

            <label>
              <textarea
                value={this.state.Comment1}
                onChange={this.handleChange}
                name='Comment1'
                className='commentInput'
                rows='9'
                cols='50'
                placeholder='Enter your comment'
                style={{
                  height: '70px',
                  resize: 'none',
                  paddingRight: '15px',
                  paddingTop: '10px',
                }}
              ></textarea>
              {/* <input
                className='commentInput'
                type='text'
                placeholder='Enter your comment'
                name='Comment1'
                value={this.state.Comment1}
                onChange={this.handleChange}
              /> */}
            </label>
            {infoSelectedTable}
          </div>
          <div className='floorPlanContainerEx'>
            <FloorPlanExample
              restoraunt={resto}
              openModal={this.openModal4}
              handleFloorPlan={this.handleFloorPlan}
              datum={this.state.startDate}
              datum1={this.state.startDate1}
              handleCount={this.handleCount}
              count={this.state.count}
              d={true}
              handleDeleteTableID={this.handleDeleteTableID}
            ></FloorPlanExample>
          </div>
        </div>
        <div
          className='reserveBtn'
          onClick={() => this.handleReservation(resto)}
        >
          RESERVE
        </div>
        {this.state.msg1 ? (
          <div
            className='errBox'
            style={{
              width: '40%',
              margin: '20px auto 0px auto',
              padding: '5px 10px',
            }}
          >
            <p style={{ color: 'red' }}>{this.state.msg1}</p>
          </div>
        ) : null}
        <div className='recenzija'>
          <div className='ocjenite'>
            {this.state.didGrade ? (
              <div className='r4'>
                <div className='r5'>
                  <h1>Vaša recenzija</h1>
                </div>
                <div className='r1'>
                  <div className='r2'>
                    <img
                      src='http://localhost:3000/images/tim.jpg'
                      alt=''
                      className='rImage'
                    />
                  </div>

                  {this.props.user && this.props.user.customer ? (
                    <h3>{this.props.user.customer.Name}</h3>
                  ) : null}
                </div>
                <div className='r3'>
                  <div>{stars4}</div>
                  <p>{gradesObj.gradeComment.Comment}</p>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <h2>Ocijenite restoran</h2>
                <div className='starsOcjena'>{stars3}</div>
              </React.Fragment>
            )}
          </div>
          <div className='truntaOcjenaCon'>
            <div className='truntaOcjena'>
              <h1>{gradesObj.grade}</h1>
              <div>{stars1}</div>
              <h1>{gradesObj.sum}</h1>
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
                          : (gradesObj.pet / gradesObj.sum) * 100 + '%',
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
                          : (gradesObj.cetiri / gradesObj.sum) * 100 + '%',
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
                          : (gradesObj.tri / gradesObj.sum) * 100 + '%',
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
                          : (gradesObj.dva / gradesObj.sum) * 100 + '%',
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
                          : (gradesObj.jedan / gradesObj.sum) * 100 + '%',
                      backgroundColor: 'rgb(3, 168, 124)',
                      borderRadius: '30px',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Popup
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          {modalContent}
        </Popup>
        <Popup
          open={this.state.isOpen1}
          closeOnDocumentClick
          onClose={this.closeModal1}
        >
          {favModal}
        </Popup>
        <Popup
          open={this.state.isOpen2}
          closeOnDocumentClick
          onClose={this.closeModal2}
        >
          <div
            className='modal'
            style={{
              height: '500px',
              overflow: 'scroll',
              overflowX: 'hidden',
              overflowY: 'auto',
              padding: '10px 10px',
            }}
          >
            <div className='r5' style={{ marginBottom: '20px' }}>
              <h1>Sve recenzije</h1>
            </div>
            {gcList}
            <button className='btnModul' onClick={this.closeModal2}>
              OK
            </button>
          </div>
        </Popup>
        <Popup
          style={{ width: '500px' }}
          open={this.state.isOpen3}
          closeOnDocumentClick
          onClose={this.closeModal3}
        >
          {resModal}
        </Popup>
        <Popup
          open={this.state.isOpen4}
          closeOnDocumentClick
          onClose={this.closeModal4}
        >
          <div className='modal'>
            <p className='modalP'>
              Ako želite rezervirati više od 2 stola morate nazvati restoran.
            </p>
            <button className='btnModul' onClick={this.closeModal4}>
              OK
            </button>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  restoraunts: state.floorPlan.restoraunts,
  grades: state.floorPlan.grades,
  customers: state.floorPlan.customers,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  addGrade,
  getGrades,
  updateFavorite,
  addReservation,
  getReservation,
  getCustomers,
  turnValidatedBy,
})(withRouter(Restoraunt));
