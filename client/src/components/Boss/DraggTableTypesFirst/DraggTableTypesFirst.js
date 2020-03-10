import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from '../../Constants/Constant.js';
import PropTypes from 'prop-types';

//table in side of table list
function DraggTableTypesFirst(props) {
  //define draggable (source) component
  const [{ isDraggable }, drag] = useDrag({
    item: {
      type: ItemType.ROUND_TABLE,
      tableType: props.table.tableType,
      imageName: props.table.imageName
    },
    collect: monitor => ({
      isDraggable: !!monitor.isDragging()
    })
  });

  return (
    <div>
      <img
        src={'http://localhost:3000/images/' + props.table.imageName}
        alt=''
        ref={drag}
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
