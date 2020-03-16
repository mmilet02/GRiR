import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <Link to='/'>
        <div className='navLink'>Home</div>
      </Link>
      <Link to='/fpc'>
        <div className='navLink'>FPC</div>
      </Link>
      <Link to='/fpl'>
        <div className='navLink'>FPL</div>
      </Link>
      <Link to='/profile'>
        <div className='navLink'>My profile</div>
      </Link>
      <Link to='/restoraunt'>
        <div className='navLink'>Restoraunt</div>
      </Link>
      <Link to='/aboutus'>
        <div className='navLink'>About us</div>
      </Link>
      <Link to='/login'>
        <div className='navLink'>Login</div>
      </Link>
      <Link to='/reg'>
        <div className='navLink'>Register</div>
      </Link>
    </header>
  );
}

export default Header;
