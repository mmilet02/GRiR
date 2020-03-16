import React, { Component } from 'react';
import './FloorPlanExample.css';
import SelectableTable from '../SelectableTable/SelectableTable.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFloorPlans } from '../../../actions/floorPlanAction.js';
import equal from 'fast-deep-equal';

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

    for (let i = 0; i < this.state.floorPlans.length; i++) {
      if (this.state.floorPlans[i].RestaurantID === '2') {
        floorPlan = this.state.floorPlans[i].TableList;
      }
    }
    console.log(floorPlan);

    floorPlan = floorPlan.map(table => (
      <SelectableTable key={table._id} table={table} />
    ));

    return <div className='floorPlan'>{floorPlan}</div>;
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

export default connect(mapStateToProps, { getFloorPlans })(FloorPlanExample);
