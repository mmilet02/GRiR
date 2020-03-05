import React from "react";
import "./FloorPlan.css";
import { useDrop } from "react-dnd";
import { ItemType } from "../../Constants/Constant.js";
import DraggTableTypesSecond from "../DraggTableTypesSecond/DraggTableTypesSecond.js";

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
    let tt;
    if (table.type === "circle") {
      tt = (
        <DraggTableTypesSecond
          top={table.position.y}
          left={table.position.x}
          isDragg={false}
          visina={table.size.x}
          širina={table.size.x}
          key={table.id}
          table={table}
        ></DraggTableTypesSecond>
      );
    } else if (table.type === "square") {
      tt = (
        <DraggTableTypesSecond
          top={table.position.y}
          left={table.position.x}
          visina={table.size.x}
          širina={table.size.x}
          key={table.id}
          table={table}
        ></DraggTableTypesSecond>
      );
    }
    return tt;
  });

  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? "green" : "white" }}
      className="floorPlan"
    >
      {floorPlanList}
    </div>
  );
}

export default FloorPlan;
