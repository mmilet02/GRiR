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
      cat: [
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
    };
  }
  componentDidMount() {
    this.props.getRestoraunts();
    this.props.getCustomers();
  }

  render() {
    let a = -1;
    let catList = this.state.cat.map((c) => {
      a++;
      return (
        <div className='category' key={a}>
          <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
            <circle cx='15' cy='15' r='15' fill='#1E1B1D'></circle>
            <path
              d='M10.78 21h1.73l.73-3.2h2.24l-.74 3.2h1.76l.72-3.2h3.3v-1.6H17.6l.54-2.4H21v-1.6h-2.5l.72-3.2h-1.73l-.73 3.2h-2.24l.74-3.2H13.5l-.73 3.2H9.5v1.6h2.93l-.56 2.4H9v1.6h2.52l-.74 3.2zm2.83-4.8l.54-2.4h2.24l-.54 2.4H13.6z'
              fill='#fff'
            ></path>
          </svg>
          <p>{c}</p>
        </div>
      );
    });
    let aktualnoRestoraunt = this.props.restoraunts
      .sort((a, b) => (a.Viewes > b.Viewes ? -1 : b.Viewes > a.Viewes ? 1 : 0))
      .slice(0, 5)
      .filter((res) => res.ValidatedBy !== 'none')
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
          <img
            src='http://localhost:3000/images/hpImage.png'
            alt='home page'
            className='hpImg'
          />
        </div>
        <div className='categories'>{catList}</div>
        <div className='hpText'>
          <p>
            Izaberite ono što vam se sviđa. Mi ćemo vam pomoći pronaći odličan
            restoran za posjetiti.
          </p>
        </div>
        <div className='provjera'>
          <Link to='/reg'>
            <div className='provjera1'>Get started</div>
          </Link>
        </div>

        <div className='provjera2'>
          <p>Već imate račun? </p>
          <p className='pGreen'>Sign in.</p>
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
        <div className='hpDescription'>
          <div className='hpDescriptionText'>
            <p className='hpDBold'>Ono što mi radimo drugačije.</p>
            <p>
              EasyEat je platforma koja nije ista kao i ostale platforme na
              internetu. Naš osnovni cilj je da vama olakšamo pronalazak
              odgovarajučeg restorana i rezervaciju u istom. Mi ne služimo
              reklama, mi služimo vama. EasyEat ima preko 500 registriranih
              ugostiteljskih objekata te preko 10 različitih vrsta
              ugostiteljskih objekata koji čekaju da vas posluže.{' '}
            </p>
          </div>
          <div className='hpDescriptionButton'>
            <div className='hpDescriptionButtonB'>
              <Link to='/reg'>Get started </Link>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='aktualno'>
          <div
            style={{
              width: '100%',
              padding: '40px 0px 0px 0px',
              marginBottom: '40px',
            }}
          >
            <h1>Najboljih 5 u 2019/20</h1>
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
