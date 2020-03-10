import React from 'react';
import PropTypes from 'prop-types';

//table in side of floor plan
function DraggTableTypesSecond(props) {
  return (
    <div>
      <img
        src={'http://localhost:3000/images/' + props.table.imageName}
        alt=''
        style={{
          height: props.visina + 'px',
          width: props.širina + 'px',
          position: 'absolute',
          top: props.top,
          left: props.left
        }}
      />
    </div>
  );
}

DraggTableTypesSecond.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  visina: PropTypes.number.isRequired,
  širina: PropTypes.number.isRequired,
  table: PropTypes.object.isRequired
};

export default DraggTableTypesSecond;
