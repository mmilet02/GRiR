import React from 'react';
import './GridTarget';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../Constants/Constant.js';
import PropTypes from 'prop-types';

// grid mesh org 25x25
function GridTarget(props) {
  //define a drop target where we drop tables
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.TABLES,
    drop: (item, monitor) =>
      props.onDropImg(
        item.table,
        monitor.getSourceClientOffset(),
        monitor.getInitialSourceClientOffset()
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? 'green' : 'white',
        width: `${props.gridCellsWidth}px`,
        height: `${props.gridCellsHeight}px`,
      }}
      className='gridCells'
    ></div>
  );
}

GridTarget.propTypes = {
  onDropImg: PropTypes.func.isRequired,
};

export default GridTarget;
