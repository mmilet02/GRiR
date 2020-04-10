import React, { Component } from 'react';
import './Restoraunt.css';
import { connect } from 'react-redux';
import FloorPlanExample from './FloorPlanExample/FloorPlanExample.js';
import { addGrade, getGrades } from '../../actions/floorPlanAction.js';
import { withRouter } from 'react-router';
import {
  faMapMarkerAlt,
  faClock,
  faUtensils,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Restoraunt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rests: [],
    };
  }
  componentDidMount() {
    this.setState({
      rests: this.props.restoraunts,
    });

    window.scrollTo(0, 0);
  }
  calcGrade = (resto) => {
    let filteredGrades = this.props.grades.filter(
      (g) => g.RestaurantID === resto._id
    );
    let gradeSum = 0;
    let n = 0;
    if (filteredGrades.length > 0) {
      for (let i = 0; i < filteredGrades.length; i++) {
        gradeSum += filteredGrades[i].Grade;
        n++;
      }
      let g = gradeSum / n;
      return g.toFixed(2);
    }
    return 1;
  };

  onStarClick = (grade, resto) => {
    const { user } = this.props;

    if (user && user.customer) {
      this.props.addGrade(grade, resto._id, user.customer._id, user.token);
    } else {
    }
  };

  render() {
    let resto = {};
    for (const rest of this.state.rests) {
      if (rest._id === this.props.match.params.id) {
        resto = rest;
      }
    }

    let grade = this.calcGrade(resto);
    return (
      <div className='containerEx'>
        <div className='restourantName'>
          <h1>{resto.Name}</h1>
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
        <div className='restourantName'>
          <h1>{grade}</h1>
          <div>
            <FontAwesomeIcon
              icon={faStar}
              style={{ margin: '0px 5 px', color: 'black' }}
              onClick={() => this.onStarClick(1, resto)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ margin: '0px 5 px', color: 'black' }}
              onClick={() => this.onStarClick(2, resto)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ margin: '0px 5 px', color: 'black' }}
              onClick={() => this.onStarClick(3, resto)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ margin: '0px 5 px', color: 'black' }}
              onClick={() => this.onStarClick(4, resto)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ margin: '0px 5 px', color: 'black' }}
              onClick={() => this.onStarClick(5, resto)}
            />
          </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  restoraunts: state.floorPlan.restoraunts,
  grades: state.floorPlan.grades,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addGrade, getGrades })(
  withRouter(Restoraunt)
);
