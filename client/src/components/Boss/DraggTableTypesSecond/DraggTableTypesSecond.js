import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemType } from '../../Constants/Constant.js';

//table in side of floor plan
function DraggTableTypesSecond(props) {
  //define draggable (source) component
  const [{ isDraggable }, drag] = useDrag({
    item: {
      type: ItemType.TABLES,
      table: props.table
    },
    collect: monitor => ({
      isDraggable: !!monitor.isDragging()
    })
  });
  return (
    <div>
      <img
        ref={drag}
        src={'http://localhost:3000/images/' + props.table.imageName}
        alt=''
        style={{
          height: props.visina + 'px',
          width: props.širina + 'px',
          position: 'absolute',
          top: props.top,
          left: props.left,
          opacity: isDraggable ? '0.5' : '1'
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
