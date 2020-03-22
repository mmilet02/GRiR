import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    let y = window.scrollY;
    console.log(y);
    if (y === 0) {
      this.setState({
        isScrolling: false
      });
    } else {
      this.setState({
        isScrolling: true
      });
    }
  };

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
      <header
        className={this.state.isScrolling ? 'header is-active' : 'header'}
      >
        <div className='gridd'>
          <div className='h1'>
            <h1>LOGO</h1>
          </div>
          <div className='h2'>
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
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Header);
