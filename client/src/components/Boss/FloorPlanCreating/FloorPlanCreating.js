import React, { Component } from 'react';
import './FloorPlanCreating.css';
import TableList from '../TableList/TableList.js';
import FloorPlan from '../FloorPlan/FloorPlan.js';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import GridTarget from '../GridTarget/GridTarget.js';
import { connect } from 'react-redux';
import { saveFloorPlan } from '../../../actions/floorPlanAction.js';

class FloorPlanCreating extends Component {
  constructor(props) {
    super(props);
    this.boss = React.createRef();
    this.state = {
      floorPlanList: [],
      isOpen: false,
      xCoord: 0,
      yCoord: 0,
      circleRadius: 0,
      tempId: '0',
      isGridOn: false,
      scale: 25,
      tableExampleSize: 50,
      currentFloorPlanWidth: 1000,
      currentFloorPlanHeight: 500,
    };
  }

  // Open pop up modal
  openModal = () => {
    this.setState({
      isOpen: true,
      tempId: '0',
    });
  };
  //Covert the actual size of table to scale 1:25
  convertToMainScale = () => {
    let newSize = this.state.circleRadius * this.state.scale;
    const dropTargetPosition = this.boss.current.getBoundingClientRect();
    this.setState({
      floorPlanList: this.state.floorPlanList.map((table) => {
        if (table._id === this.state.tempId) {
          table.SizeX = newSize;
          table.CoordX = this.state.xCoord - newSize / 2;
          table.CoordY = this.state.yCoord - newSize / 2;
          console.log(table.CoordX + ' ' + table.CoordY);
          if (0 > table.CoordY) {
            table.CoordY = 0;
            console.log(table.CoordX + ' ' + table.CoordY);
          }
          if (0 > table.CoordX) {
            table.CoordX = 0;
            console.log(table.CoordX + ' ' + table.CoordY);
          }
          if (
            dropTargetPosition.bottom <
            table.CoordY + newSize + dropTargetPosition.top
          ) {
            table.CoordY =
              dropTargetPosition.bottom - newSize - dropTargetPosition.top;
            console.log(table.CoordX + ' ' + table.CoordY);
          }
          if (
            dropTargetPosition.left +
              window.scrollX +
              dropTargetPosition.width <
            table.CoordX + newSize + dropTargetPosition.left
          ) {
            table.CoordX =
              dropTargetPosition.right - newSize - dropTargetPosition.left;
            console.log(table.CoordX + ' ' + table.CoordY);
          }
        }
        return table;
      }),
    });
  };
  // Close pop up modal
  closeModal = () => {
    this.setState({ isOpen: false });
    this.convertToMainScale();
  };
  //Handle input of table size
  handleSizeChange = (e) => {
    if (e.target.name === 'circleRadius') {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  // Handle pop up modal submit and activate closeModal()
  handleSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
  };
  //Calucalte coordinates of the places where we drop table
  calculateYX = (finalPosition, initialPosition) => {
    const dropTargetPosition = this.boss.current.getBoundingClientRect();
    const { y: finalY, x: finalX } = finalPosition;
    const { y: initialY, x: initialX } = initialPosition;

    const newYposition =
      finalY > initialY
        ? initialY + (finalY - initialY) - dropTargetPosition.top
        : initialY - (initialY - finalY) - dropTargetPosition.top;

    const newXposition =
      finalX > initialX
        ? initialX + (finalX - initialX) - dropTargetPosition.left
        : initialX - (initialX - finalX) - dropTargetPosition.left;

    return [newXposition, newYposition];
  };
  //Trigger on drop and crate the same table in floor plan
  onDropImg = (table, finalPosition, initialPosition) => {
    console.log(initialPosition.x + ' ' + initialPosition.y);
    this.openModal();
    if (this.state.floorPlanList.find((tab) => tab._id === table._id)) {
      const [newXposition, newYposition] = this.calculateYX(
        finalPosition,
        initialPosition
      );

      let centerX = newXposition + table.SizeX / 2;
      let centerY = newYposition + table.SizeX / 2;

      this.setState({
        tempId: table._id,
        xCoord: centerX,
        yCoord: centerY,
      });
    } else {
      const [newXposition, newYposition] = this.calculateYX(
        finalPosition,
        initialPosition
      );

      let centerX = newXposition + this.state.tableExampleSize / 2;
      let centerY = newYposition + this.state.tableExampleSize / 2;

      let temp = {
        _id: uuid(),
        ImageName: table.ImageName,
        TableType: table.TableType,
        SizeX: 0,
        CoordX: 0,
        CoordY: 0,
        NumberOfPeople: table.NumberOfPeople,
      };
      this.setState({
        floorPlanList: [...this.state.floorPlanList, temp],
        tempId: temp._id,
        xCoord: centerX,
        yCoord: centerY,
      });
    }
  };
  //Open and close grid
  handleGrid = (e) => {
    this.setState({
      isGridOn: !this.state.isGridOn,
    });
  };
  handleFloorPlanResize = (width, height) => {
    // console.log(
    //   this.state.currentFloorPlanWidth + ' ' + this.state.currentFloorPlanHeight
    // );
    // let tempFloorPlanHeight = 0;
    // let tempFloorPlanWidth = 0;
    // let razlikaUPostocima = 0;
    // if (this.state.currentFloorPlanHeight === height) {
    //   if (this.state.currentFloorPlanWidth > width) {
    //     tempFloorPlanWidth = width;
    //     razlikaUPostocima =
    //       (this.state.currentFloorPlanWidth - width) /
    //       this.state.currentFloorPlanWidth;
    //     tempFloorPlanHeight =
    //       this.state.currentFloorPlanHeight -
    //       this.state.currentFloorPlanHeight * razlikaUPostocima;
    //   } else {
    //     tempFloorPlanWidth = width;
    //     razlikaUPostocima =
    //       (width - this.state.currentFloorPlanWidth) /
    //       this.state.currentFloorPlanWidth;
    //     tempFloorPlanHeight =
    //       this.state.currentFloorPlanHeight +
    //       this.state.currentFloorPlanHeight * razlikaUPostocima;
    //   }
    // } else if (this.state.currentFloorPlanWidth === width) {
    //   tempFloorPlanHeight = height;
    //   razlikaUPostocima =
    //     (this.state.currentFloorPlanHeight - height) /
    //     this.state.currentFloorPlanHeight;
    //   tempFloorPlanWidth =
    //     this.state.currentFloorPlanWidth -
    //     this.state.currentFloorPlanWidth * razlikaUPostocima;
    // } else if (
    //   this.state.currentFloorPlanHeight !== height &&
    //   this.state.currentFloorPlanWidth !== width
    // ) {
    //   if (
    //     this.state.currentFloorPlanHeight - height >
    //     this.state.currentFloorPlanWidth - width
    //   ) {
    //     tempFloorPlanHeight = height;
    //     razlikaUPostocima =
    //       (this.state.currentFloorPlanHeight - height) /
    //       this.state.currentFloorPlanHeight;
    //     tempFloorPlanWidth =
    //       this.state.currentFloorPlanWidth -
    //       this.state.currentFloorPlanWidth * razlikaUPostocima;
    //   } else {
    //     tempFloorPlanWidth = width;
    //     razlikaUPostocima =
    //       (this.state.currentFloorPlanWidth - width) /
    //       this.state.currentFloorPlanWidth;
    //     tempFloorPlanHeight =
    //       this.state.currentFloorPlanHeight -
    //       this.state.currentFloorPlanHeight * razlikaUPostocima;
    //   }
    // }
    // console.log(tempFloorPlanWidth + ' ' + tempFloorPlanHeight);
    // this.state &&
    //   this.state.currentFloorPlanHeight &&
    //   this.state.currentFloorPlanWidth &&
    //   this.setState({
    //     currentFloorPlanHeight: tempFloorPlanHeight,
    //     currentFloorPlanWidth: tempFloorPlanWidth
    //   });
  };
  // handleSaveFloorPLan = () => {
  //   this.props.saveFloorPlan(this.state.floorPlanList);
  // };
  render() {
    let gridCells = [];
    let gridCellsHeight = this.state.currentFloorPlanHeight / 800;
    let gridCellsWidth = this.state.currentFloorPlanWidth / 800;

    for (let i = 0; i < 800; i++) {
      gridCells.push(
        <GridTarget
          key={i}
          onDropImg={this.onDropImg}
          style={{
            width: gridCellsWidth,
            height: gridCellsHeight,
            zIndex: '2',
          }}
        ></GridTarget>
      );
    }
    return (
      <div className='container'>
        <div className='containerS'>
          <div
            className='floorPlanContainer'
            ref={this.boss}
            // style={{
            //   height: this.state.currentFloorPlanHeight + 'px',
            //   width: this.state.currentFloorPlanWidth + 'px'
            // }}
          >
            <FloorPlan
              onDropImg={this.onDropImg}
              floorPlanList={this.state.floorPlanList}
              handleFloorPlanResize={this.handleFloorPlanResize}
            />

            {this.state.isGridOn ? (
              <div className='grid'>{gridCells}</div>
            ) : null}
          </div>
          <TableList></TableList>
        </div>
        <Popup
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className='modal'>
            <div className='close' onClick={this.closeModal}>
              +
            </div>
            <input
              name='circleRadius'
              type='text'
              placeholder='Radius of table..'
              onChange={this.handleSizeChange}
            />
            <button onClick={this.handleSubmit}>OK</button>
          </div>
        </Popup>
        <div className='containerM'>
          <button className='regBtn' onClick={this.handleGrid}>
            Grid on/off
          </button>
          <button
            className='regBtn'
            onClick={() =>
              this.props.handleSaveFloorPLan(this.state.floorPlanList)
            }
          >
            Save floor plan
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { saveFloorPlan })(FloorPlanCreating);
