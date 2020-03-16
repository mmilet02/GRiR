import React from 'react';
import ResizeObserver from 'react-resize-observer';
import './FloorPlan.css';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../Constants/Constant.js';
import DraggTableTypesSecond from '../DraggTableTypesSecond/DraggTableTypesSecond.js';
import PropTypes from 'prop-types';

//original 1:25 500x1000
function FloorPlan(props) {
  //define target component where we drop tables
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.TABLES,
    drop: (item, monitor) =>
      props.onDropImg(
        item.table,
        monitor.getSourceClientOffset(),
        monitor.getInitialSourceClientOffset()
      ),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const floorPlanList = props.floorPlanList.map(table => {
    let tt = <h1>noob</h1>;
    if (table.TableType === 'circle') {
      tt = (
        <DraggTableTypesSecond
          top={table.CoordY}
          left={table.CoordX}
          visina={table.SizeX}
          širina={table.SizeX}
          key={table._id}
          table={table}
        ></DraggTableTypesSecond>
      );
    } else if (table.TableType === 'square') {
      tt = (
        <DraggTableTypesSecond
          top={table.CoordY}
          left={table.CoordX}
          visina={table.SizeX}
          širina={table.SizeX}
          key={table._id}
          table={table}
        ></DraggTableTypesSecond>
      );
    }
    return tt;
  });

  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? 'green' : 'white' }}
      className='floorPlan'
    >
      <ResizeObserver
        onResize={rect => {
          props.handleFloorPlanResize(rect.width, rect.height);
        }}
        onPosition={rect => {}}
      />
      {floorPlanList}
    </div>
  );
}

FloorPlan.propTypes = {
  onDropImg: PropTypes.func.isRequired,
  handleFloorPlanResize: PropTypes.func.isRequired,
  floorPlanList: PropTypes.array.isRequired
};

export default FloorPlan;
