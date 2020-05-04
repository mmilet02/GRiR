import React, { Component } from 'react';
import './FloorPlanExample.css';
import SelectableTable from '../SelectableTable/SelectableTable.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFloorPlans } from '../../../actions/floorPlanAction.js';
import equal from 'fast-deep-equal';
import { withRouter } from 'react-router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FloorPlanExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPlans: [],
      datum: '',
      datum1: '',
    };
  }
  componentDidMount() {
    this.props.getFloorPlans();
    this.setState({
      floorPlans: this.props.list,
      datum: this.props.datum,
      datum1: this.props.datum1,
    });
  }
  componentDidUpdate() {
    if (!equal(this.state.floorPlans, this.props.list)) {
      this.setState({
        floorPlans: this.props.list,
      });
    }
    if (!equal(this.state.datum, this.props.datum)) {
      this.setState({
        datum: this.props.datum,
      });
    }
    if (!equal(this.state.datum1, this.props.datum1)) {
      this.setState({
        datum1: this.props.datum1,
      });
    }
  }
  render() {
    let resto = {};

    if (this.props.restoraunts && this.props.match.params.id) {
      for (const rest of this.props.restoraunts) {
        if (rest._id === this.props.match.params.id) {
          resto = rest;
        }
      }
    }

    if (this.state.datum) {
      console.log(this.state.datum1.getHours());
      console.log(this.state.datum1.getMinutes());
    }

    let floorPlan = [];
    let id = '';
    if (this.props.match.params.id) {
      for (let i = 0; i < this.state.floorPlans.length; i++) {
        if (
          this.state.floorPlans[i].RestaurantID === this.props.match.params.id
        ) {
          floorPlan = this.state.floorPlans[i].TableList;
          id = this.state.floorPlans[i]._id;
        }
      }
    }
    if (resto.ValidatedBy === 'none') {
      floorPlan = (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
        >
          <p>Sorry not accepted yet</p>
        </div>
      );
    } else {
      floorPlan = floorPlan.map((table) => {
        for (let i = 0; i < this.props.reservations.length; i++) {
          let datumReservation = new Date(this.props.reservations[i].Date);
          let reservationHour = this.props.reservations[i].Hour;
          let rh = reservationHour.split(':');
          if (this.props.reservations[i].FloorPlanID === id) {
            let reservation = this.props.reservations[i];
            for (let i = 0; i < reservation.TableID.length; i++) {
              if (reservation.TableID[i] === table._id) {
                if (
                  datumReservation.getFullYear() ===
                    this.state.datum.getFullYear() &&
                  datumReservation.getDate() === this.state.datum.getDate() &&
                  datumReservation.getMonth() === this.state.datum.getMonth()
                ) {
                  let h = this.state.datum1.getHours();
                  let startWorking = this.props.restoraunt.StartingHour;
                  let endWorking = this.props.restoraunt.EndingHour;
                  let firstRH = parseInt(rh[0]);
                  if (
                    startWorking < 12 &&
                    h >= startWorking &&
                    h < 12 &&
                    firstRH >= startWorking &&
                    firstRH < 12
                  ) {
                    return (
                      <SelectableTable
                        openModal={this.props.openModal}
                        count={this.props.count}
                        handleCount={this.props.handleCount}
                        free={false}
                        key={table._id}
                        table={table}
                        handleFloorPlan={this.props.handleFloorPlan}
                        floorPlanID={id}
                      />
                    );
                  } else if (
                    h >= 12 &&
                    h < 18 &&
                    firstRH >= 12 &&
                    firstRH < 18
                  ) {
                    return (
                      <SelectableTable
                        openModal={this.props.openModal}
                        count={this.props.count}
                        handleCount={this.props.handleCount}
                        free={false}
                        key={table._id}
                        table={table}
                        handleFloorPlan={this.props.handleFloorPlan}
                        floorPlanID={id}
                      />
                    );
                  } else if (
                    h >= 18 &&
                    h < endWorking &&
                    firstRH >= 18 &&
                    firstRH < endWorking
                  ) {
                    return (
                      <SelectableTable
                        openModal={this.props.openModal}
                        count={this.props.count}
                        handleCount={this.props.handleCount}
                        free={false}
                        key={table._id}
                        table={table}
                        handleFloorPlan={this.props.handleFloorPlan}
                        floorPlanID={id}
                      />
                    );
                  }
                }
              }
            }
          }
        }
        return (
          <SelectableTable
            openModal={this.props.openModal}
            count={this.props.count}
            handleCount={this.props.handleCount}
            free={true}
            key={table._id}
            table={table}
            handleFloorPlan={this.props.handleFloorPlan}
            floorPlanID={id}
          />
        );
      });
    }

    return (
      <div className='floorPlanContBig'>
        <div className='backGo'>
          <FontAwesomeIcon
            onClick={this.props.history.goBack}
            icon={faArrowLeft}
            style={{ marginRight: '5px', marginTop: '2px', cursor: 'pointer' }}
          />
        </div>
        <div className='floorPlanContSmall'>
          <div className='floorPlanCont'>
            <div className='floorPlan'>{floorPlan}</div>
          </div>
          <div className='choiceFields'></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.floorPlan.floorPlanList,
  load: state.floorPlan.load,
  reservations: state.reservation.reservations,
  restoraunts: state.floorPlan.restoraunts,
});
FloorPlanExample.propTypes = {
  getFloorPlans: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getFloorPlans })(
  withRouter(FloorPlanExample)
);
