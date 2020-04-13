import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './UserProfile.css';
import { logout } from '../../actions/authActions.js';
import { getGrades } from '../../actions/floorPlanAction.js';
import {
  faMapMarkerAlt,
  faClock,
  faUtensils,
  faUserTie,
  faEnvelope,
  faPhone,
  faStar,
  faStarHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getGrades();
  }
  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/login');
    }
  }
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
      g = 'Sorry no grades';
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

  render() {
    let gradesObj = 0;
    let filteredGrades = {};
    let numberOfGrades = 0;
    let stars = [];
    const { user } = this.props;
    let korisnik = '';
    let favList = [];
    let favo = {};
    if (user && user.customer) {
      favList = user.customer.Favorite.map((fav) => {
        for (let i = 0; i < this.props.restoraunts.length; i++) {
          if (this.props.restoraunts[i]._id === fav)
            favo = this.props.restoraunts[i];
        }
        return (
          <div className='favRestoCon'>
            <Link to={'/restoraunt/' + favo._id} style={{ width: '100%' }}>
              <img
                src={'http://localhost:3000/images/' + favo.ImgName}
                alt=''
                className='favRestoImg'
              />
            </Link>
          </div>
        );
      });
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
          <div className='userProfilaCustomerFavList'>{favList}</div>
        </div>
      );
    } else if (user && user.restoraunt) {
      gradesObj = this.calcGrade();
      if (typeof gradesObj.grade === 'string') {
        stars = this.buildStars(0);
      } else if (typeof gradesObj.grade === 'number') {
        stars = this.buildStars(gradesObj.grade);
      }

      filteredGrades = this.props.grades.filter(
        (g) => g.RestaurantID === this.props.user.restoraunt._id
      );
      numberOfGrades = filteredGrades.length;
      korisnik = (
        <React.Fragment>
          <div className='userName'>
            <h1>{user.restoraunt.Name}</h1>
            <h1>{numberOfGrades}</h1>
            <h1>{gradesObj.grade}</h1>
            <h1>{gradesObj.jedan}</h1>
            <h1>{gradesObj.dva}</h1>
            <h1>{gradesObj.tri}</h1>
            <h1>{gradesObj.cetiri}</h1>
            <h1>{gradesObj.pet}</h1>
            <div>{stars}</div>
          </div>
          <div className='userInf'>
            <div className='userText'>
              <div className='userInfo'>
                <div className='userInfo1'>
                  {' '}
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>{user.restoraunt.Location}</p>
                </div>
                <div className='userInfo1'>
                  <FontAwesomeIcon
                    icon={faUtensils}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>{user.restoraunt.Type}</p>
                </div>
                <div className='userInfo1'>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>{user.restoraunt.WorkingHours}</p>
                </div>
              </div>
              <div className='userDesc'>
                <p>{user.restoraunt.Description}</p>
              </div>
            </div>
            <div className='userImages'>
              <img
                src={'http://localhost:3000/images/' + user.restoraunt.ImgName}
                alt=''
                className='userImg'
              />
            </div>
          </div>
          <div className='restourantName' style={{ marginTop: '30px' }}>
            <h2>Floor plans</h2>
          </div>
          <div className='floorPlanDiv'>
            <div className='floorPlanDivName'>
              <h3>Initial</h3>
            </div>
            <div className='fpList'>
              <Link to={'/fpe/' + user.restoraunt._id}>
                {' '}
                <div className='floorPlanInitial'>
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </Link>
            </div>
          </div>

          <div className='floorPlanDiv'>
            <div className='floorPlanDivName'>
              <h3>Special</h3>
            </div>
            <div className='fpList'>
              <div className='floorPlanInitial'>
                <FontAwesomeIcon icon={faClock} />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className='userCon'>
        {korisnik}
        <button
          style={{ width: '100px', height: '50px', margin: '0 auto 10px auto' }}
          className='logout_button'
          onClick={this.props.logout}
        >
          LOGOUT
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  grades: state.floorPlan.grades,
  restoraunts: state.floorPlan.restoraunts,
});
export default connect(mapStateToProps, { logout, getGrades })(
  withRouter(UserProfile)
);
