import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HamburgerMenu from 'react-hamburger-menu';
import ResizeObserver from 'react-resize-observer';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,
      open: false,
      width: 1000,
      height: 0,
      check: 0,
    };
  }
  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }
  componentDidMount() {
    if (this.state.check === 0) {
      this.setState({
        check: 1,
        width: window.innerWidth,
      });
    }
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  onScroll = () => {
    let y = window.scrollY;
    if (y === 0) {
      this.setState({
        isScrolling: false,
      });
    } else {
      this.setState({
        isScrolling: true,
      });
    }
  };

  render() {
    const authLinks = (
      <Fragment>
        {
          <strong style={{ color: 'white' }}>
            {this.props.auth &&
            this.props.auth.user &&
            this.props.auth.user.customer
              ? `Welcome ${this.props.auth.user.customer.Name}`
              : ''}
          </strong>
        }
        {this.props.auth &&
        this.props.auth.user &&
        this.props.auth.user.restoraunt ? (
          <Link to={'/profile/' + this.props.auth.user.restoraunt._id}>
            <div className='navLink'>Moj profil</div>
          </Link>
        ) : (
          <Link to='/profile/1'>
            <div className='navLink'>Moj profil</div>
          </Link>
        )}
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Link to='/login'>
          <div className='navLink'>Sign in</div>
        </Link>
        <Link to='/reg'>
          <div className='navLink reg'>Get started</div>
        </Link>
      </Fragment>
    );

    const head = (
      <div className='gridd'>
        <div className='h1'>
          <img
            src='http://localhost:3000/images/logo.png'
            alt='logo'
            style={{ height: '100px', width: 'auto' }}
          ></img>
        </div>
        <div className='h2'>
          <Link to='/'>
            <div className='navLink'>Home</div>
          </Link>
          <Link to='/aboutus'>
            <div className='navLink'>O nama</div>
          </Link>
          <Link to='/main/none'>
            <div className='navLink'>Rezerviraj!</div>
          </Link>
          {this.props.auth && this.props.auth.isAuthenticated
            ? authLinks
            : guestLinks}
        </div>
      </div>
    );

    const hamburger = (
      <Fragment>
        <div className='gridd'>
          <div className='h1'>
            <img
              src='http://localhost:3000/images/logo.png'
              alt='logo'
              style={{ height: '100px', width: 'auto' }}
            ></img>
          </div>
          <HamburgerMenu
            isOpen={this.state.open}
            menuClicked={this.handleClick.bind(this)}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color='black'
            borderRadius={0}
            animationDuration={0.5}
          />
        </div>
        <div
          className={
            this.state.open ? 'dropdown-content show' : 'dropdown-content'
          }
          style={{ top: this.state.height, right: '0' }}
          onClick={this.handleClick.bind(this)}
        >
          <Link to='/'>
            <div className='navLink'>Home</div>
          </Link>
          <Link to='/aboutus'>
            <div className='navLink'>About us</div>
          </Link>
          <Link to='/main'>
            <div className='navLink'>Reserve now!</div>
          </Link>
          {this.props.auth && this.props.auth.isAuthenticated
            ? authLinks
            : guestLinks}
        </div>
      </Fragment>
    );

    return (
      <header
        className={this.state.isScrolling ? 'header is-active' : 'header'}
      >
        {this.state.width > 633 ? head : hamburger}
        <ResizeObserver
          onResize={(rect) => {
            this.setState({ height: rect.height });
          }}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Header);
