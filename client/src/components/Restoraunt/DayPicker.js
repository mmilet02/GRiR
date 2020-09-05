import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const ExampleCustomInput = ({ value, onClick }) => (
  <button className='btnDP' onClick={onClick}>
    {value}
  </button>
);
const ExampleCustomTimeInput = ({ value, onClick }) => (
  <button className='inpDP' onClick={onClick}>
    {value}
  </button>
);

export default class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  isBigger = (date) => {
    console.log(date.getHours());
    return !(
      date.getHours() < this.props.restoraunt.StartingHour &&
      date.getHours() > this.props.restoraunt.EndingHour
    );
  };
  render() {
    let startWorking = this.props.restoraunt.StartingHour;
    let endWorking = this.props.restoraunt.EndingHour;
    let date = new Date();
    let date1 = new Date();
    let date2 = new Date();
    let niz = [];
    console.log(endWorking);
    console.log(startWorking);
    console.log(startWorking > endWorking);
    if (endWorking === 24) {
      date1.setHours(23, 45, 0);
      date2.setHours(0, 0, 0);
      date.setHours(startWorking, 0, 0);
    } else if (startWorking > endWorking) {
      date1.setHours(startWorking, 0, 0);
      date2.setHours(endWorking, 15, 0);
      console.log(date2);
      console.log(date1);
      let date3 = new Date(date2.getTime());
      while (date1 > date2) {
        niz = [...niz, date3];
        date2.setMinutes(date2.getMinutes() + 15);
        date3 = new Date(date2.getTime());
      }
      console.log(niz);
    } else {
      date1.setHours(endWorking, 0, 0);
      date2.setHours(endWorking, 0, 0);
      date.setHours(startWorking, 0, 0);
    }

    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <p
            style={{
              marginRight: '10px',
              marginTop: '10px',
              color: ' #5f5f5f',
            }}
          >
            Datum:
          </p>
          <DatePicker
            dateFormat='dd/MM/yyyy'
            strictParsing
            selected={this.props.datum}
            filterDate={(date) => {
              return new Date() <= date;
            }}
            onChange={(date) => this.props.handleDayPickerChange(date)}
            customInput={<ExampleCustomInput />}
          ></DatePicker>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <p style={{ marginRight: '10px', color: ' #5f5f5f' }}>Vrijeme:</p>
          <DatePicker
            excludeTimes={startWorking > endWorking ? [...niz] : [date2]}
            minTime={startWorking > endWorking ? null : date}
            maxTime={startWorking > endWorking ? null : date1}
            selected={this.props.vrime}
            onChange={(date) => this.props.handleDayPickerChange1(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption='Time'
            timeFormat='HH:mm'
            dateFormat='HH:mm'
            customInput={<ExampleCustomTimeInput />}
          ></DatePicker>
        </div>
      </React.Fragment>
    );
  }
}
