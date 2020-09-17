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
      table: props.table,
    },
    collect: (monitor) => ({
      isDraggable: !!monitor.isDragging(),
    }),
  });

  return (
    <React.Fragment>
      <img
        ref={drag}
        src={'http://localhost:3000/images/' + props.table.ImageName}
        alt=''
        style={{
          width:
            props.table.TableType === 'Niski okrugli' ||
            props.table.TableType === 'Niski kockasti'
              ? '6%'
              : '11%',
          height: '50%',

          opacity: isDraggable ? '0.5' : '1',
        }}
      />
    </React.Fragment>
  );
}

DraggTableTypesFirst.propTypes = {
  table: PropTypes.object.isRequired,
};

export default DraggTableTypesFirst;
