import React, { Component } from 'react';
import './RestorauntList.css';
import { connect } from 'react-redux';
import {
  faMapMarkerAlt,
  faClock,
  faUtensils,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRestoraunts, getGrades } from '../../actions/floorPlanAction.js';
import { Link } from 'react-router-dom';

class RestorauntList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: true,
      restoraunts: [],
      filteredList: [],
      filter: false,
      filterSearch: false,
      searchTerm: '',
      Type: '',
      Location: '',
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
  componentWillMount() {
    if (
      this.props.match.params.type &&
      this.props.match.params.type !== 'none'
    ) {
      this.setState({
        filterSearch: true,
        Type: this.props.match.params.type,
      });
    }
  }
  componentDidMount() {
    this.props.getRestoraunts();
    this.props.getGrades();
    window.scrollTo(0, 0);
    this.filterSearchFun();
  }
  handleChangeS = (e) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
      filterSearch: false,
      Type: '',
      Location: '',
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
      first: false,
      searchTerm: '',
    });
  };

  render() {
    let loading = false;
    let restoraunt = '';
    let restaurantFiltered = this.state.filteredList;
    restaurantFiltered = restaurantFiltered
      .filter((rest) => {
        if (rest.ValidatedBy === 'none' || rest.ValidatedBy === 'off') {
          return false;
        } else {
          return true;
        }
      })
      .map((rest) => {
        return (
          <Link
            key={rest._id}
            to={'/restoraunt/' + rest._id}
            className='conLink'
          >
            <div className='resLisCon' key={rest._id}>
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
        );
      });

    if (this.props.restoraunts.length > 0) {
      loading = false;
      restoraunt = this.props.restoraunts
        .filter((rest) => {
          if (rest.ValidatedBy === 'none' || rest.ValidatedBy === 'off') {
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
          return (
            <Link
              to={'/restoraunt/' + rest._id}
              className='conLink'
              key={rest._id}
            >
              <div className='resLisCon' key={rest._id}>
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
        <div className='leftPart'>
          <div className='search'>
            <input
              name='searchTerm'
              className='searchTerm'
              placeholder='Traži po imenu'
              value={this.state.searchTerm}
              onChange={this.handleChangeS}
            />
            <button type='submit' disabled className='searchButton'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <div className='filter'>
            <label className='labelCon'>
              Tip
              <select
                className='filterInput'
                value={this.state.Type}
                onChange={this.handleChangeF}
                name='Type'
              >
                <option value='' defaultValue>
                  Svi
                </option>
                {tddList}
              </select>
            </label>
            <label className='labelCon'>
              Lokacija
              <select
                className='filterInput'
                value={this.state.Location}
                onChange={this.handleChangeF}
                name='Location'
              >
                <option value='' defaultValue>
                  Svi
                </option>
                {lddList}
              </select>
            </label>

            <div className='btnSearch' onClick={this.handleFilter}>
              {' '}
              <p>Pretraži</p>{' '}
            </div>
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
})(withRouter(RestorauntList));
