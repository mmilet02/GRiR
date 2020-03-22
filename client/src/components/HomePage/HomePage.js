import React from 'react';
import './HomePage.css';

function HomePage() {
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
        </div>
        <div className='featureImgCon'>
          <img
            src='http://localhost:3000/images/service.svg'
            alt='24/7 Support'
            className='fImg'
          />
        </div>
        <div className='featureImgCon'>
          <img
            src='http://localhost:3000/images/medal.svg'
            alt='safe'
            className='fImg'
          />
        </div>
        <div className='featureImgCon'>
          <img
            src='http://localhost:3000/images/order.svg'
            alt='every thing you need on one place'
            className='fImg'
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
