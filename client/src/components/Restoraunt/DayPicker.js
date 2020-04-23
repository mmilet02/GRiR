import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let startWorking = this.props.restoraunt.StartingHour;
    let endWorking = this.props.restoraunt.EndingHour;
    let date = new Date();
    let date1 = new Date();
    let date2 = new Date();
    if (endWorking === 24) {
      date1.setHours(23, 45, 0);
      date2.setHours(0, 0, 0);
    } else {
      date1.setHours(endWorking, 0, 0);
      date2.setHours(endWorking, 0, 0);
    }
    date.setHours(startWorking, 0, 0);

    return (
      <React.Fragment>
        <DatePicker
          dateFormat='dd/MM/yyyy'
          strictParsing
          selected={this.props.datum}
          onChange={(date) => this.props.handleDayPickerChange(date)}
        ></DatePicker>
        <DatePicker
          excludeTimes={[date2]}
          minTime={date}
          maxTime={date1}
          selected={this.props.vrime}
          onChange={(date) => this.props.handleDayPickerChange1(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption='Time'
          timeFormat='HH:mm'
          dateFormat='HH:mm'
        ></DatePicker>
      </React.Fragment>
    );
  }
}
