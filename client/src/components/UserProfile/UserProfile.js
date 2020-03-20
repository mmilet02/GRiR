import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions.js';

class UserProfile extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>My profile</h1>
        <button
          style={{ width: '100px', height: '50px' }}
          className='logout_button'
          onClick={this.props.logout}
        >
          LOGOUT
        </button>
      </div>
    );
  }
}

export default connect(null, { logout })(UserProfile);
