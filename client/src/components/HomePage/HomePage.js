import React, { useState } from 'react';
import './HomePage.css';
import ResizeObserver from 'react-resize-observer';

function HomePage() {
  const [width, setWidth] = useState(0);
  return (
    <div className='homepage'>
      <div className='imgCont'>
        <img
          src='http://localhost:3000/images/hero1.jpg'
          alt='home page'
          className='hpImg'
        />
      </div>
      <div className='feature'>
        <div className='featureImgCon'>
          <img
            src='http://localhost:3000/images/browser.svg'
            alt='security'
            className='fImg'
          />
          <div className='textF'>
            <p>100% security</p>
          </div>
        </div>
        <div className='featureImgCon'>
          <img
            src='http://localhost:3000/images/service.svg'
            alt='24/7 support'
            className='fImg'
          />
          <div className='textF'>
            {' '}
            <p>24/7 online support</p>
          </div>
        </div>
        <div className='featureImgCon'>
          <img
            src='http://localhost:3000/images/medal.svg'
            alt='safe'
            className='fImg'
          />
          <div className='textF'>
            {' '}
            <p>Fast and easy</p>
          </div>
        </div>
        <div className='featureImgCon' style={{ height: width }}>
          <img
            src='http://localhost:3000/images/order.svg'
            alt='every thing you need on one place'
            className='fImg'
          />
          <div className='textF'>
            <p>All on place</p>
          </div>

          <ResizeObserver
            onResize={rect => {
              setWidth(rect.width);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
