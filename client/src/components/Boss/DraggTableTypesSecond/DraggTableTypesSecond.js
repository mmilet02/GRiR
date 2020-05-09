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
      table: props.table,
    },
    collect: (monitor) => ({
      isDraggable: !!monitor.isDragging(),
    }),
  });
  return (
    <div>
      <img
        onClick={() => props.handleSelectTable(props.table._id)}
        ref={drag}
        src={'http://localhost:3000/images/' + props.table.ImageName}
        alt=''
        style={{
          height: props.visina + 'px',
          width: props.širina + 'px',
          transform:
            props.table.TableType === 'circle' ||
            props.table.TableType === 'square'
              ? 'rotate(0deg)'
              : props.table.Orientation === 'o'
              ? 'rotate(90deg)'
              : 'rotate(0deg)',
          position: 'absolute',
          top: props.top + '%',
          left: props.left + '%',
          opacity: isDraggable ? '0.5' : '1',
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
  table: PropTypes.object.isRequired,
};

export default DraggTableTypesSecond;
