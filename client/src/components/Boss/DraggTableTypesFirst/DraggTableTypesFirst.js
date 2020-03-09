import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from '../../Constants/Constant.js';

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

export default DraggTableTypesFirst;
