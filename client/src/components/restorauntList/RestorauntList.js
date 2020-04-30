import React, { Component } from 'react';
import './RestorauntList.css';
import { connect } from 'react-redux';
import {
  faMapMarkerAlt,
  faChevronDown,
  faChevronUp,
  faClock,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRestoraunts, getGrades } from '../../actions/floorPlanAction.js';
import { Link } from 'react-router-dom';

class RestorauntList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restoraunts: [],
      filteredList: [],
      filter: false,
      filterSearch: false,
      searchTerm: '',
      Type: '',
      Location: '',
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
    this.props.getRestoraunts();
    this.props.getGrades();
    window.scrollTo(0, 0);
  }
  handleChangeS = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
      filterSearch: false,
    });
  };

  handleChangeF = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleFilter = () => {
    this.filterSearchFun();
    this.setState({
      filter: false,
      filterSearch: true,
    });
  };

  handleClick = () => {
    this.setState({
      filter: !this.state.filter,
    });
  };

  filterSearchFun = () => {
    let niz = [
      {
        tip: 'Location',
        value: this.state.Location,
      },
      { tip: 'Type', value: this.state.Type },
    ];

    niz = niz.filter((n) => n.value !== '');

    let restaurantFiltered = this.props.restoraunts.filter((rest) => {
      for (let i = 0; i < niz.length; i++) {
        let h = niz[i].tip;
        if (rest[h] !== niz[i].value || rest.ValidatedBy === 'none') {
          return false;
        }
      }
      return true;
    });

    this.setState({
      filteredList: restaurantFiltered,
    });
  };

  render() {
    let loading = false;
    let restoraunt = '';
    let restaurantFiltered = this.state.filteredList;

    restaurantFiltered = restaurantFiltered.map((rest) => {
      return (
        <div className='resLisCon' key={rest._id}>
          <Link to={'/restoraunt/' + rest._id} style={{ width: '100%' }}>
            <div className='resLisImgCon'>
              <img
                src={'http://localhost:3000/uploads/' + rest.ImgName}
                alt=''
                className='resLisImg'
              />
            </div>
            <div className='resLisInfo'>
              <div className='restLisInfoHead'>
                <h3>{rest.Name}</h3>
              </div>
              <div className='restLisInfoBot'>
                <div className='restLisInfoBot1'>
                  <div className='info'>
                    {' '}
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <p>{rest.Location}</p>
                  </div>
                  <div className='info'>
                    <FontAwesomeIcon
                      icon={faUtensils}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <p>{rest.Type}</p>
                  </div>
                  <div className='info'>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <p>{rest.StartingHour}</p>
                      <p>-</p>
                      <p>{rest.EndingHour}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
    if (this.props.restoraunts.length > 0) {
      loading = false;
      restoraunt = this.props.restoraunts
        .filter((rest) => {
          if (rest.ValidatedBy === 'none') {
            return false;
          } else if (
            rest.Name.toUpperCase().includes(
              this.state.searchTerm.toUpperCase()
            )
          ) {
            return true;
          } else {
            return false;
          }
        })
        .map((rest) => {
          console.log(rest.ValidatedBy === 'none');
          return (
            <div className='resLisCon' key={rest._id}>
              <Link to={'/restoraunt/' + rest._id} style={{ width: '100%' }}>
                <div className='resLisImgCon'>
                  <img
                    src={'http://localhost:3000/uploads/' + rest.ImgName}
                    alt=''
                    className='resLisImg'
                  />
                </div>
                <div className='resLisInfo'>
                  <div className='restLisInfoHead'>
                    <h3>{rest.Name}</h3>
                  </div>
                  <div className='restLisInfoBot'>
                    <div className='restLisInfoBot1'>
                      <div className='info'>
                        {' '}
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          style={{ marginRight: '5px', marginTop: '2px' }}
                        />
                        <p>{rest.Location}</p>
                      </div>
                      <div className='info'>
                        <FontAwesomeIcon
                          icon={faUtensils}
                          style={{ marginRight: '5px', marginTop: '2px' }}
                        />
                        <p>{rest.Type}</p>
                      </div>
                      <div className='info'>
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{ marginRight: '5px', marginTop: '2px' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <p>{rest.StartingHour}</p>
                          <p>-</p>
                          <p>{rest.EndingHour}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        });
    } else {
      loading = true;
    }
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
    return (
      <div className='listCon'>
        <label className='searchV'>
          <input
            name='searchTerm'
            placeholder='Search restaurant by name'
            value={this.state.searchTerm}
            onChange={this.handleChangeS}
          />
        </label>
        <div className='filterBtn' onClick={this.handleClick}>
          <p style={{ marginLeft: '6px' }}>FILTER</p>
          {this.state.filter ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              style={{ marginLeft: '7px', marginTop: '7px' }}
              size='xs'
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ marginLeft: '7px', marginTop: '7px' }}
              size='xs'
            />
          )}
        </div>
        <div className={this.state.filter ? 'filter shw' : 'filter'}>
          <label style={{ width: '30%', margin: '20px 20px 0px 20px' }}>
            <select
              className='filterInput'
              placeholder='What is the type of food that you make'
              value={this.state.Type}
              onChange={this.handleChangeF}
              name='Type'
            >
              <option value='' disabled defaultValue hidden>
                What is the type of food that you make
              </option>
              <option value=''>-</option>
              {tddList}
            </select>
          </label>
          <label
            style={{ width: '30%', marginTop: '20px', marginRight: '20px' }}
          >
            <select
              className='filterInput'
              placeholder='What is the type of food that you make'
              value={this.state.Location}
              onChange={this.handleChangeF}
              name='Location'
            >
              <option value='' disabled defaultValue hidden>
                What is your location
              </option>
              <option value=''>-</option>
              {lddList}
            </select>
          </label>

          <div className='btnSearch' onClick={this.handleFilter}>
            {' '}
            <p>Search</p>{' '}
          </div>
        </div>
        <div className='list'>
          <div
            style={{
              width: '100%',
              height: '300px',
              display: loading ? 'flex' : 'none',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <p> Sorry restoruants are loading ..</p>
          </div>
          {this.state.filterSearch ? restaurantFiltered : restoraunt}
        </div>
      </div>
    );
  }
}

RestorauntList.propTypes = {};

const mapStateToProps = (state) => ({
  restoraunts: state.floorPlan.restoraunts,
});
export default connect(mapStateToProps, {
  getRestoraunts,
  getGrades,
})(RestorauntList);
