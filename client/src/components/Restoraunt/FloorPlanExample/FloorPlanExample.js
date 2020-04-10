import React, { Component } from 'react';
import './FloorPlanExample.css';
import SelectableTable from '../SelectableTable/SelectableTable.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFloorPlans } from '../../../actions/floorPlanAction.js';
import equal from 'fast-deep-equal';
import { withRouter } from 'react-router';

class FloorPlanExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPlans: []
    };
  }
  componentDidMount() {
    this.props.getFloorPlans();
    this.setState({
      floorPlans: this.props.list
    });
  }
  componentDidUpdate() {
    if (!equal(this.state.floorPlans, this.props.list)) {
      this.setState({
        floorPlans: this.props.list
      });
    }
  }
  render() {
    let floorPlan = [];
    if (this.props.match.params.id) {
      for (let i = 0; i < this.state.floorPlans.length; i++) {
        if (
          this.state.floorPlans[i].RestaurantID === this.props.match.params.id
        ) {
          floorPlan = this.state.floorPlans[i].TableList;
        }
      }
    }

    floorPlan = floorPlan.map(table => (
      <SelectableTable key={table._id} table={table} />
    ));

    return (
      <div className='fpCon'>
        <div style={{ width: '90%', margin: '0 auto' }}>
          <div className='floorPlanCont'>
            <div className='floorPlan'>{floorPlan}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.floorPlan.floorPlanList,
  load: state.floorPlan.load
});
FloorPlanExample.propTypes = {
  getFloorPlans: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { getFloorPlans })(
  withRouter(FloorPlanExample)
);
