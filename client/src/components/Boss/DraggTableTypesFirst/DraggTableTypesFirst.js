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

  // const checkType = () => {
  //   if (props.table.TableType === 'circle') {
  //     return (
  //       <div
  //         ref={drag}
  //         style={{
  //           margin: '0',
  //           borderRadius: '50%',
  //           overflow: 'hidden',
  //           height: '50px',
  //           width: '50px',
  //         }}
  //       >
  //         <svg
  //           height='50'
  //           width='50'
  //           style={{
  //             borderRadius: '50%',
  //           }}
  //         >
  //           <circle
  //             cx='25'
  //             cy='25'
  //             r='25'
  //             fill='black'
  //             style={{
  //               margin: '0',
  //             }}
  //           />
  //         </svg>
  //       </div>
  //     );
  //   } else if (props.table.TableType === 'square') {
  //     return (
  //       <div
  //         ref={drag}
  //         style={{
  //           margin: '0',
  //           height: '50px',
  //           width: '50px',
  //           backgroundColor: 'rgba(255,255,255,0)',
  //         }}
  //       >
  //         <svg
  //           width='50'
  //           height='50'
  //           style={{ margin: '0', backgroundColor: 'rgba(255,255,255,0)' }}
  //         >
  //           <rect
  //             width='50'
  //             height='50'
  //             fill='black'
  //             style={{ margin: '0', backgroundColor: 'rgba(255,255,255,0)' }}
  //           />
  //         </svg>
  //       </div>
  //     );
  //   }
  // };
  return (
    <React.Fragment>
      <img
        ref={drag}
        src={'http://localhost:3000/images/' + props.table.ImageName}
        alt=''
        style={{
          width:
            props.table.TableType === 'circle' ||
            props.table.TableType === 'square'
              ? '6%'
              : '11%',
          height: '50%',

          opacity: isDraggable ? '0.5' : '1',
        }}
      />
    </React.Fragment>
    // <React.Fragment>{checkType()}</React.Fragment>
  );
}

DraggTableTypesFirst.propTypes = {
  table: PropTypes.object.isRequired,
};

export default DraggTableTypesFirst;
