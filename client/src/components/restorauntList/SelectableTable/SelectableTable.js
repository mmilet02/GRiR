import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
SelectableTable.propTypes = {
  floorPlan: PropTypes.array.isRequired
};
export default SelectableTable;
