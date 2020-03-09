import React from 'react';
import ResizeObserver from 'react-resize-observer';
import './FloorPlan.css';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../Constants/Constant.js';
import DraggTableTypesSecond from '../DraggTableTypesSecond/DraggTableTypesSecond.js';

function FloorPlan(props) {
  //define target component where we drop tables
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.ROUND_TABLE,
    drop: (item, monitor) =>
      props.onDropImg(
        item.tableType,
        item.imageName,
        monitor.getSourceClientOffset(),
        monitor.getInitialSourceClientOffset()
      ),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const floorPlanList = props.floorPlanList.map(table => {
    let tt = <h1>noob</h1>;
    if (table.tableType === 'circle') {
      tt = (
        <DraggTableTypesSecond
          top={table.coordY}
          left={table.coordX}
          visina={table.sizeX}
          širina={table.sizeX}
          key={table._id}
          table={table}
        ></DraggTableTypesSecond>
      );
    } else if (table.tableType === 'square') {
      tt = (
        <DraggTableTypesSecond
          top={table.coordY}
          left={table.coordX}
          visina={table.sizeX}
          širina={table.sizeX}
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

export default FloorPlan;
