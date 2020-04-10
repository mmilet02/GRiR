import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  faUserTie,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Customer.css';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    this.setState({
      customers: this.props.customers,
    });
    window.scrollTo(0, 0);
  }

  render() {
    let customer = {};
    for (const cus of this.state.customers) {
      if (cus._id === this.props.match.params.id) {
        customer = cus;
      }
    }
    return (
      <div className='userProfileCustomerCon'>
        <div className='userProfileCustomerImgCon'>
          <img
            src='http://localhost:3000/images/tim.jpg'
            alt=''
            className='userProfileCustomerImg'
          />
        </div>
        <div className='userProfileCustomerInfoCon'>
          <div className='userProfileCustomerInfo'>
            <FontAwesomeIcon
              icon={faUserTie}
              style={{ marginRight: '5px', marginTop: '2px' }}
            />
            <p>{customer.Name}</p>
          </div>
          <div className='userProfileCustomerInfo'>
            <FontAwesomeIcon
              icon={faPhone}
              style={{ marginRight: '5px', marginTop: '2px' }}
            />
            <p>{customer.Phone}</p>
          </div>{' '}
          <div className='userProfileCustomerInfo'>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ marginRight: '5px', marginTop: '2px' }}
            />
            <p>{customer.Email}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.floorPlan.restoraunts,
});

export default connect(mapStateToProps, null)(withRouter(Customer));
