import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  isOutOfViewport = (elem) => {
    // Get element's bounding
    var bounding = elem.getBoundingClientRect();

    // Check if it's out of the viewport on each side
    var out = {};
    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom =
      bounding.bottom >
      (window.innerHeight || document.documentElement.clientHeight);
    out.right =
      bounding.right >
      (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;

    return out;
  };
  render() {
    return (
      <footer className={2 > 1 ? 'footer' : 'footer  overFlown'}>
        <div className='korisničkaPodrska'>
          <div className='kp1'>
            <p>KORISNIČKA PODRŠKA</p>
          </div>
          <div className='kp2'>
            <p>|</p>
          </div>
          <div className='kp'>
            <p>Telefon: +385 98 567 875 </p>
          </div>
          <div className='kp3'>
            <p>|</p>
          </div>
          <div className='kp'>
            <p>Radno vrijem: Svaki dan 0:00 - 24:00</p>
          </div>
          <div className='kp3'>
            <p>|</p>
          </div>
          <div className='kp'>
            <p>Email: podrska@gmail.com</p>
          </div>
        </div>
        <div className='preuzmi'>
          <div className='preuzmi1'>
            <div>
              <p style={{ marginTop: '5px' }}>Preuzmi na: </p>
            </div>
            <div
              style={{
                width: '90px',
                marginLeft: '10px',
                marginRight: '10px',
                marginTop: '7px',
              }}
            >
              <img
                src='http://localhost:3000/images/googlePlayy.png'
                alt=' '
                style={{ width: '100%', height: 'auto' }}
              ></img>
            </div>
            <div
              style={{
                width: '90px',
                marginLeft: '10px',
                marginRight: '10px',
                marginTop: '7px',
              }}
            >
              <img
                src='http://localhost:3000/images/appStoree.png'
                alt=''
                style={{ width: '100%', height: 'auto' }}
              ></img>
            </div>
          </div>
          <div className='preuzmi1'>
            <div
              style={{
                marginRight: '10px',
                marginTop: '4px',
              }}
            >
              <p style={{ marginTop: '5px' }}>Potraži nas:</p>
            </div>
            <div
              style={{
                width: '24px',
                marginLeft: '3px',
                marginRight: '5px',
                marginTop: '10px',
              }}
            >
              {' '}
              <img
                src='http://localhost:3000/images/Facebook.svg'
                alt=''
                style={{ width: '100%', height: 'auto' }}
              ></img>
            </div>
            <div
              style={{
                width: '24px',
                marginLeft: '5px',
                marginRight: '5px',
                marginTop: '10px',
              }}
            >
              {' '}
              <img
                src='http://localhost:3000/images/YouTube.svg'
                alt=''
                style={{ width: '100%', height: 'auto' }}
              ></img>
            </div>
            <div
              style={{
                width: '24px',
                marginLeft: '5px',
                marginRight: '5px',
                marginTop: '10px',
              }}
            >
              {' '}
              <img
                src='http://localhost:3000/images/LinkedIn.svg'
                alt=''
                style={{ width: '100%', height: 'auto' }}
              ></img>
            </div>
            <div
              style={{
                width: '24px',
                marginLeft: '5px',
                marginTop: '10px',
              }}
            >
              {' '}
              <img
                src='http://localhost:3000/images/WhatsApp.svg'
                alt=''
                style={{ width: '100%', height: 'auto' }}
              ></img>
            </div>
          </div>
        </div>
        <div className='partneri'>
          <div className='part1'>
            <p>PARTNERSKI PORTALI : </p>
          </div>
          <p>24sata</p>
          <p>|</p>
          <p>Večernji list</p>
          <p>|</p>
          <p>Slobodna dalmacija</p>
          <p>|</p>
          <p>IndexHR</p>
        </div>
        <div className='prava'>
          <p>© NAME 2020. Sva prava pridržana</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
