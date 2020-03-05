import React from "react";
import "./GridTarget";
import { useDrop } from "react-dnd";
import { ItemType } from "../../Constants/Constant.js";

function GridTarget(props) {
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
  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? "green" : "white" }}
      className="gridCells"
    ></div>
  );
}

export default GridTarget;
