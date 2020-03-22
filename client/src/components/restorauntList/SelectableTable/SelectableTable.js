import React, { useState } from 'react';

function SelectableTable(props) {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <img
        onClick={() => setSelected(!selected)}
        src={'http://localhost:3000/images/' + props.table.ImageName}
        alt=''
        style={{
          border: selected ? 'solid 2px yellow' : null,
          height: props.table.SizeX + 'px',
          width: props.table.SizeX + 'px',
          position: 'absolute',
          top: props.table.CoordY,
          left: props.table.CoordX
        }}
      />
    </div>
  );
}
SelectableTable.propTypes = {};
export default SelectableTable;
