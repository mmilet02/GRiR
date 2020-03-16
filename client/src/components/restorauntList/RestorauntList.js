import React from 'react';
import './RestorauntList.css';
import FloorPlanExample from './FloorPlanExample/FloorPlanExample.js';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RestorauntList(props) {
  return (
    <div className='containerEx'>
      <div className='floorPlanContainerEx'>
        <FloorPlanExample></FloorPlanExample>
      </div>
      <div className='choise'>
        <FontAwesomeIcon icon={faAngleLeft} />

        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
}

RestorauntList.propTypes = {};

export default RestorauntList;
