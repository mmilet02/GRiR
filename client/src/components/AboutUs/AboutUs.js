import React, { Component } from 'react';
import './AboutUs.css';
import {
  faMapMarkerAlt,
  faUserTie,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='auCon'>
        <div className='asHeader'>
          <h1>MM - NAME</h1>
        </div>
        <div className='asContent'>
          <div className='content'>
            <div className='content1img'>
              <img
                src='http://localhost:3000/images/medium.jpg'
                alt=''
                className='conImage'
              ></img>
            </div>
            <div className='content1text'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                aliquam purus id dolor tincidunt, a finibus massa suscipit.
                Maecenas in porttitor nibh, vel iaculis mauris. Fusce placerat
                aliquam vehicula. Quisque non euismod tellus, id ultricies
                lacus. Donec orci lacus, cursus non lectus id, mollis suscipit
                arcu. Ut tempor auctor mauris, vel viverra nulla tincidunt sed.
                Mauris dictum velit scelerisque, facilisis nulla at, posuere
                sem. Morbi commodo scelerisque bibendum. Nulla sed nisi congue,
                ornare diam eget, mollis sem. Suspendisse potenti. Nullam
                accumsan sagittis auctor. Curabitur a venenatis justo.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Nulla porttitor mauris diam.
              </p>
            </div>
          </div>
          <div className='content'>
            <div className='content1text'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                aliquam purus id dolor tincidunt, a finibus massa suscipit.
                Maecenas in porttitor nibh, vel iaculis mauris. Fusce placerat
                aliquam vehicula. Quisque non euismod tellus, id ultricies
                lacus. Donec orci lacus, cursus non lectus id, mollis suscipit
                arcu. Ut tempor auctor mauris, vel viverra nulla tincidunt sed.
                Mauris dictum velit scelerisque, facilisis nulla at, posuere
                sem. Morbi commodo scelerisque bibendum. Nulla sed nisi congue,
                ornare diam eget, mollis sem. Suspendisse potenti. Nullam
                accumsan sagittis auctor. Curabitur a venenatis justo.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Nulla porttitor mauris diam.
              </p>
            </div>
            <div className='content1img'>
              <img
                src='http://localhost:3000/images/medium.jpg'
                alt=''
                className='conImage'
              ></img>
            </div>
          </div>
          <div className='content'>
            <div className='info1'>
              <div className='info1_1'>
                <div className='infoFA'>
                  <FontAwesomeIcon
                    icon={faUserTie}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>Vlasnik</p>
                </div>
                <div className='infoFA'>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>Lokacija</p>
                </div>{' '}
                <div className='infoFA'>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>Telefon</p>
                </div>{' '}
                <div className='infoFA'>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>Email</p>
                </div>
              </div>
              <div className='info1_2'>
                <div className='tim'>
                  <img
                    src='http://localhost:3000/images/tim.jpg'
                    alt=''
                    className='timImg'
                  ></img>
                  <p>Mate Matić</p>
                </div>
                <div className='tim'>
                  <img
                    src='http://localhost:3000/images/tim.jpg'
                    alt=''
                    className='timImg'
                  ></img>
                  <p>Mate Matić</p>
                </div>
                <div className='tim'>
                  <img
                    src='http://localhost:3000/images/tim.jpg'
                    alt=''
                    className='timImg'
                  ></img>
                  <p>Mate Matić</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
