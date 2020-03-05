import React, { Component } from "react";
import "./FloorPlanCreating.css";
import TableList from "../TableList/TableList.js";
import FloorPlan from "../FloorPlan/FloorPlan.js";
import uuid from "react-uuid";
import Popup from "reactjs-popup";
import GridTarget from "../GridTarget/GridTarget.js";

class FloorPlanCreating extends Component {
  constructor(props) {
    super(props);
    this.boss = React.createRef();
    this.state = {
      tabelTypes: [
        {
          id: 1,
          imageName: "circle.png",
          type: "circle",
          size: {
            x: 50
          },
          position: {
            x: 0,
            y: 0
          }
        },
        {
          id: 2,
          imageName: "square.png",
          type: "square",
          size: {
            x: 50
          },
          position: {
            x: 0,
            y: 0
          }
        }
      ],
      floorPlanList: [],
      isOpen: false,
      xCoord: 0,
      yCoord: 0,
      circleRadius: 0,
      tempId: "0",
      isGridOn: false
    };
  }
  // Open pop up modal
  openModal = () => {
    this.setState({
      isOpen: true,
      tempId: "0"
    });
  };
  //Covert the actual size of table to scale 1:25
  convertToMainScale = () => {
    let newSize = this.state.circleRadius * 25;
    this.setState({
      floorPlanList: this.state.floorPlanList.map(table => {
        if (table.id === this.state.tempId) {
          table.size.x = newSize;
        }
        return table;
      })
    });
  };
  // Close pop up modal
  closeModal = () => {
    this.setState({ isOpen: false });
    this.convertToMainScale();
  };
  //Handle input of table size
  handleSizeChange = e => {
    if (e.target.name === "circleRadius") {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  // Handle pop up modal submit and activate closeModal()
  handleSubmit = e => {
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

    console.log(initialX + " " + initialY);
    console.log(finalX + " " + finalY);
    console.log(newXposition + " " + newYposition);

    return [newXposition, newYposition];
  };
  //Trigger on drop and crate the same table in floor plan
  onDropImg = (tabelType, imageName, finalPosition, initialPosition) => {
    this.openModal();

    const [newXposition, newYposition] = this.calculateYX(
      finalPosition,
      initialPosition
    );

    let temp = {
      id: uuid(),
      imageName,
      type: tabelType,
      size: {
        x: 0
      },
      position: {
        x: newXposition,
        y: newYposition
      }
    };
    this.setState({
      floorPlanList: [...this.state.floorPlanList, temp],
      tempId: temp.id
    });
  };
  //Open and close grid
  handleGrid = e => {
    console.log("Grid changed...");
    this.setState({
      isGridOn: !this.state.isGridOn
    });
  };

  render() {
    let gridCells = [];
    for (let i = 0; i < 800; i++) {
      gridCells.push(
        <GridTarget key={i} onDropImg={this.onDropImg}></GridTarget>
      );
    }
    return (
      <div className="container">
        <div className="floorPlanContainer" ref={this.boss}>
          <FloorPlan
            onDropImg={this.onDropImg}
            floorPlanList={this.state.floorPlanList}
          />

          {this.state.isGridOn ? <div className="grid">{gridCells}</div> : null}
        </div>

        <TableList tablesList={this.state.tabelTypes}></TableList>
        <Popup
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal">
            <div className="close" onClick={this.closeModal}>
              +
            </div>
            <input
              name="circleRadius"
              type="text"
              placeholder="Radius of table.."
              onChange={this.handleSizeChange}
            />
            <button onClick={this.handleSubmit}>OK</button>
          </div>
        </Popup>
        <button onClick={this.handleGrid}>Grid on/off</button>
      </div>
    );
  }
}

export default FloorPlanCreating;
