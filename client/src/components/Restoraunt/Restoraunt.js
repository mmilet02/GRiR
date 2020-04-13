import React, { Component } from 'react';
import './Restoraunt.css';
import { connect } from 'react-redux';
import FloorPlanExample from './FloorPlanExample/FloorPlanExample.js';
import {
  addGrade,
  getGrades,
  updateFavorite,
} from '../../actions/floorPlanAction.js';
import { withRouter } from 'react-router';
import Popup from 'reactjs-popup';
import {
  faMapMarkerAlt,
  faClock,
  faUtensils,
  faStar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Restoraunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rests: [],
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      didGrade: false,
      favorite: false,
      Comment: '',
      grade: 0,
      gradeComment: {},
    };
  }
  componentDidMount() {
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
          : true
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
      gradeComment,
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
    this.setState({ isOpen: false });
  };
  closeModal1 = () => {
    this.setState({ isOpen1: false });
  };
  closeModal2 = () => {
    this.setState({ isOpen2: false });
  };
  openModal2 = () => {
    this.setState({ isOpen2: true });
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
    if (!this.props.user) {
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

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  onSubmit = (resto) => {
    this.closeModal();
    this.onStarClick(this.state.grade, resto, this.state.Comment);
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
        return (
          <div className='gcEle'>
            <div className='gcGrade'>
              <p>{stars}</p>
            </div>
            <div className='gcComment'>
              <p>{gc.Comment}</p>
            </div>
          </div>
        );
      });
    let gradesObj = this.calcGrade(resto);
    let stars = {};
    if (this.state.didGrade) {
      stars = this.buildStars(gradesObj.grade);
    } else {
      stars = (
        <React.Fragment>
          {' '}
          <FontAwesomeIcon
            icon={faStar}
            style={{ margin: '0px 5 px', color: 'black' }}
            onClick={this.onStarClickO}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ margin: '0px 5 px', color: 'black' }}
            onClick={this.onStarClickO}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ margin: '0px 5 px', color: 'black' }}
            onClick={this.onStarClickO}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ margin: '0px 5 px', color: 'black' }}
            onClick={this.onStarClickO}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ margin: '0px 5 px', color: 'black' }}
            onClick={this.onStarClickO}
          />
        </React.Fragment>
      );
    }
    let stars2 = (
      <React.Fragment>
        {' '}
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black' }}
          onClick={() => this.onStarClick1(1)}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black' }}
          onClick={() => this.onStarClick1(2)}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black' }}
          onClick={() => this.onStarClick1(3)}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black' }}
          onClick={() => this.onStarClick1(4)}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ margin: '0px 5 px', color: 'black' }}
          onClick={() => this.onStarClick1(5)}
        />
      </React.Fragment>
    );
    let modalContent = {};
    let favModal = {};

    if (user && user.restoraunt) {
      modalContent = (
        <div className='modal'>
          <div className='closeRestoraunt' onClick={this.closeModal}>
            +
          </div>
          <p>Sorry as restoraunt you cant add grade</p>
          <button onClick={this.closeModal}>OK</button>
        </div>
      );
    } else if (!user) {
      favModal = (
        <div className='modal'>
          <div className='closeRestoraunt' onClick={this.closeModal1}>
            +
          </div>
          <p>You need to be sign in to add restoraunt in favorite.</p>
          <button onClick={this.closeModal1}>OK</button>
        </div>
      );
      modalContent = (
        <div className='modal'>
          <div className='closeRestoraunt' onClick={this.closeModal}>
            +
          </div>
          <p>You need to be sign in to add grade.</p>
          <button onClick={this.closeModal}>OK</button>
        </div>
      );
    } else {
      modalContent = (
        <div className='modal'>
          <div
            style={{
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
            }}
          >
            <div className='closeRestoraunt' onClick={this.closeModal}>
              +
            </div>
            <div>{stars2}</div>
            <label>
              <input
                className='gradeInput'
                type='text'
                placeholder='Enter your comment'
                name='Comment'
                value={this.state.Comment}
                onChange={this.handleChange}
              />
            </label>
            <button onClick={() => this.onSubmit(resto)}>OK</button>
          </div>
        </div>
      );
    }

    return (
      <div className='containerEx'>
        <div className='restourantName'>
          <h1>{resto.Name}</h1>
          {this.props.user && this.props.user.restoraunt ? null : (
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
          <div className='restourantText'>
            <div className='restourantInfo'>
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
                <p>{resto.WorkingHours}</p>
              </div>
            </div>
            <div className='restourantDesc'>
              <p>{resto.Description}</p>
            </div>
          </div>
          <div className='restourantImages'>
            <img
              src={'http://localhost:3000/images/' + resto.ImgName}
              alt=''
              className='restourantImg'
            />
          </div>
        </div>
        <div className='recenzija'>
          <h1>{gradesObj.grade}</h1>
          <h1>{gradesObj.jedan}</h1>
          <h1>{gradesObj.dva}</h1>
          <h1>{gradesObj.tri}</h1>
          <h1>{gradesObj.cetiri}</h1>
          <h1>{gradesObj.pet}</h1>
          <div>{stars}</div>
        </div>
        <div className='recenzija'>
          {this.state.didGrade ? <h1>{gradesObj.gradeComment.Grade}</h1> : null}
          {this.state.didGrade ? (
            <h1>{gradesObj.gradeComment.Comment}</h1>
          ) : null}
          <button onClick={this.openModal2}>See all</button>
        </div>
        <div className='restourantName' style={{ marginTop: '30px' }}>
          <h2>Floor plan</h2>
        </div>
        <div className='bossDiv'>
          <div className='floorPlanContainerEx'>
            <FloorPlanExample></FloorPlanExample>
          </div>
          <div className='reserveInfo'></div>
        </div>
        <div className='reserveBtn'>RESERVE</div>
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
          <div className='modal'>
            <div className='closeRestoraunt' onClick={this.closeModal2}>
              +
            </div>
            <div className='gcCon'>{gcList}</div>
            <button onClick={this.closeModal2}>OK</button>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  restoraunts: state.floorPlan.restoraunts,
  grades: state.floorPlan.grades,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  addGrade,
  getGrades,
  updateFavorite,
})(withRouter(Restoraunt));
