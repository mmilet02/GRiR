import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const authLinks = (
      <Fragment>
        <strong style={{ color: 'white' }}>
          {this.props.auth && this.props.auth.user
            ? `Welcome ${this.props.auth.user.Name}`
            : ''}
        </strong>

        <Link to='/profile'>
          <div className='navLink'>My profile</div>
        </Link>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Link to='/login'>
          <div className='navLink'>Login</div>
        </Link>
        <Link to='/reg'>
          <div className='navLink'>Register</div>
        </Link>
      </Fragment>
    );
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
        <Link to='/restoraunt'>
          <div className='navLink'>Restoraunt</div>
        </Link>
        <Link to='/aboutus'>
          <div className='navLink'>About us</div>
        </Link>
        {this.props.auth && this.props.auth.isAuthenticated
          ? authLinks
          : guestLinks}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Header);
