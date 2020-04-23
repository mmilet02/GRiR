import React, { Component } from 'react';
import './HomePage.css';
import ResizeObserver from 'react-resize-observer';
import { getRestoraunts, getCustomers } from '../../actions/floorPlanAction.js';
import { connect } from 'react-redux';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      restoraunts: [],
    };
  }
  componentDidMount() {
    this.props.getRestoraunts();
    this.props.getCustomers();
  }

  render() {
    let aktualnoRestoraunt = this.props.restoraunts
      .sort((a, b) => (a.Viewes > b.Viewes ? -1 : b.Viewes > a.Viewes ? 1 : 0))
      .slice(0, 5)
      .map((rest) => {
        return (
          <div className='resCon' key={rest._id}>
            <Link to={'/restoraunt/' + rest._id} style={{ width: '100%' }}>
              <div className='resImgCon'>
                <img
                  src={'http://localhost:3000/uploads/' + rest.ImgName}
                  alt=''
                  className='resImg'
                />
              </div>
              <div className='resInfo'>
                <div className='restInfoHead'>
                  <h3>{rest.Name}</h3>
                </div>
                <div className='restInfoBot'>
                  <div style={{ display: 'flex' }}>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ marginRight: '5px', marginTop: '2px' }}
                    />
                    {rest.Location}
                  </div>
                  <div>{rest.WorkingHours}</div>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    return (
      <div className='homepage'>
        <div className='imgCont'>
          <div className='textImage'>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: '50px',
              }}
            >
              <h1>SVE NA JEDNOM MJESTU</h1>
              <h1>MI SMO TU ZA VAS</h1>
            </div>
            <Link to='/main'>
              <div className='btnRez'>REZERVIRAJ ODMAH</div>
            </Link>
          </div>
          <img
            src='http://localhost:3000/images/hero1.jpg'
            alt='home page'
            className='hpImg'
          />
        </div>
        <div className='feature'>
          <div className='featureImgCon c1'>
            <img
              src='http://localhost:3000/images/browserW.svg'
              alt='security'
              className='fImg'
            />
            <div className='textF'>
              <p>100% SECURITY</p>
            </div>
          </div>
          <div className='featureImgCon c2'>
            <img
              src='http://localhost:3000/images/serviceW.svg'
              alt='24/7 support'
              className='fImg'
            />
            <div className='textF'>
              {' '}
              <p>24/7 SUPPORT</p>
            </div>
          </div>
          <div className='featureImgCon c3'>
            <img
              src='http://localhost:3000/images/medalW.svg'
              alt='safe'
              className='fImg'
            />
            <div className='textF'>
              {' '}
              <p>FAST & EASY</p>
            </div>
          </div>
          <div
            className='featureImgCon c4'
            style={{ height: this.state.width }}
          >
            <img
              src='http://localhost:3000/images/orderW.svg'
              alt='every thing you need on one place'
              className='fImg'
            />
            <div className='textF'>
              <p>ALL ON PLACE</p>
            </div>

            <ResizeObserver
              onResize={(rect) => {
                this.setState({ width: rect.width });
              }}
            />
          </div>
        </div>

        <div className='aktualno'>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#333',
              padding: '40px 0px 0px 0px',
              marginBottom: '40px',
            }}
          >
            <h1>AKTUALNO</h1>
          </div>
          {aktualnoRestoraunt}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  restoraunts: state.floorPlan.restoraunts,
});
export default connect(mapStateToProps, { getRestoraunts, getCustomers })(
  HomePage
);
