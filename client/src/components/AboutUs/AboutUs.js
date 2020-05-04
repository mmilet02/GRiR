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
          <h1>EasyEat</h1>
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
          <div className='content2'>
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
                src='http://localhost:3000/images/jason-leung-poI7DelFiVA-unsplash.jpg'
                alt=''
                className='conImage'
              ></img>
            </div>
          </div>
          <div className='content1'>
            <div className='contentSmall'>
              <img
                src='http://localhost:3000/images/logo.png'
                alt=''
                className='logoAboutUs'
              ></img>
              <div className='info1'>
                <div className='infoFA'>
                  <FontAwesomeIcon
                    className='aboutUsFa'
                    icon={faUserTie}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>MM-group</p>
                </div>
                <div className='infoFA'>
                  <FontAwesomeIcon
                    className='aboutUsFa'
                    icon={faMapMarkerAlt}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>Split</p>
                </div>{' '}
                <div className='infoFA'>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className='aboutUsFa'
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>+385 98 673 782</p>
                </div>{' '}
                <div className='infoFA'>
                  <FontAwesomeIcon
                    className='aboutUsFa'
                    icon={faEnvelope}
                    style={{ marginRight: '5px', marginTop: '2px' }}
                  />
                  <p>mmGroup@gmail.com</p>
                </div>
              </div>
            </div>
            <div className='info1_2'>
              <div className='tim'>
                <img
                  src='http://localhost:3000/images/tim.jpg'
                  alt=''
                  className='timImg'
                ></img>
                <p>Marin Miletić</p>
              </div>
              <div className='tim'>
                <img
                  src='http://localhost:3000/images/tim.jpg'
                  alt=''
                  className='timImg'
                ></img>
                <p>Mario Mileta</p>
              </div>
              <div className='tim'>
                <img
                  src='http://localhost:3000/images/tim.jpg'
                  alt=''
                  className='timImg'
                ></img>
                <p>Toni Androja</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
