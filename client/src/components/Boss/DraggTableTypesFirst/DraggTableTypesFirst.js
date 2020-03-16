import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from '../../Constants/Constant.js';
import PropTypes from 'prop-types';

//table in side of table list
function DraggTableTypesFirst(props) {
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
        src={'http://localhost:3000/images/' + props.table.ImageName}
        alt=''
        style={{
          opacity: isDraggable ? '0.5' : '1'
        }}
      />
    </div>
  );
}

DraggTableTypesFirst.propTypes = {
  table: PropTypes.object.isRequired
};

export default DraggTableTypesFirst;
