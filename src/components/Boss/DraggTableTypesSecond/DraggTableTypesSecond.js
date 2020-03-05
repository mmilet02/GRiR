import React from "react";

function DraggTableTypesSecond(props) {
  return (
    <div>
      <img
        src={"http://localhost:3000/images/" + props.table.imageName}
        alt=""
        style={{
          height: props.visina + "px",
          width: props.širina + "px",
          position: "absolute",
          top: props.top,
          left: props.left
        }}
      />
    </div>
  );
}

export default DraggTableTypesSecond;
