import React, { Component } from 'react';
import './FloorPlanCreating.css';
import TableList from '../TableList/TableList.js';
import FloorPlan from '../FloorPlan/FloorPlan.js';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import GridTarget from '../GridTarget/GridTarget.js';
import { connect } from 'react-redux';
import { saveFloorPlan } from '../../../actions/floorPlanAction.js';
import { withRouter } from 'react-router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FloorPlanCreating extends Component {
  constructor(props) {
    super(props);
    this.boss = React.createRef();
    this.state = {
      floorPlanList: [],
      deleteThisTables: 'not selected',
      sizeWidth: 0,
      sizeHeight: 0,
      isOpen: false,
      isOpen1: false,
      xCoord: 0,
      yCoord: 0,
      csSize: 0,
      reSizeX: 0,
      NOP: 0,
      reSizeY: 0,
      tempId: '0',
      tempType: '',
      reOri: '',
      isGridOn: false,
      scale: 0,
      tableExampleSize: 50,
      widthForChange: 0,
      heightForChange: 0,
      currentFloorPlanHeight: '500px',
      file: '',
      btnDisabled: true,
      good: false,
      step: 0,
      infoTable: {},
    };
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.file);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.scale !== 0 &&
      this.state.good &&
      prevState.scale !== this.state.scale
    ) {
      let size = this.state.sizeHeight * this.state.scale;
      this.setState({
        currentFloorPlanHeight: `${size}px`,
        heightForChange: size,
        floorPlanList: this.state.floorPlanList.map((table) => {
          if (table.TableType === 'circle' || table.TableType === 'square') {
            table.SizeX = table.realSize * this.state.scale;
          } else if (
            table.TableType === 'rectangle' ||
            table.TableType === 'elipse'
          ) {
            table.SizeX = table.realSizeX * this.state.scale;
            table.SizeY = table.realSizeY * this.state.scale;
          }

          return table;
        }),
      });
    }
  }
  // Open pop up modal
  openModal = () => {
    this.setState({
      isOpen: true,
      tempId: '0',
    });
  };
  openModal1 = () => {
    this.setState({
      isOpen1: true,
      tempId: '0',
    });
  };
  //Covert the actual size of table to scale 1:25
  convertToMainScale = () => {
    if (this.state.tempType === 'circle' || this.state.tempType === 'square') {
      let newSize = this.state.csSize * this.state.scale;
      const dropTargetPosition = this.boss.current.getBoundingClientRect();
      this.setState({
        floorPlanList: this.state.floorPlanList.map((table) => {
          if (table._id === this.state.tempId) {
            table.SizeX = newSize;
            table.realSize = this.state.csSize;
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
            table.CoordX = (table.CoordX / this.state.widthForChange) * 100;
            table.CoordY = (table.CoordY / this.state.heightForChange) * 100;
            table.NumberOfPeople = this.state.NOP;
          }

          return table;
        }),
      });
    } else if (
      this.state.tempType === 'rectangle' ||
      this.state.tempType === 'elipse'
    ) {
      let newSizeX = this.state.reSizeX * this.state.scale;
      let newSizeY = this.state.reSizeY * this.state.scale;
      const dropTargetPosition = this.boss.current.getBoundingClientRect();
      this.setState({
        floorPlanList: this.state.floorPlanList.map((table) => {
          if (table._id === this.state.tempId) {
            table.SizeX = newSizeX;
            table.SizeY = newSizeY;
            table.Orientation = this.state.reOri;
            table.realSizeX = this.state.reSizeX;
            table.realSizeY = this.state.reSizeY;
            table.CoordX = this.state.xCoord - newSizeX / 2;
            table.CoordY = this.state.yCoord - newSizeY / 2;
            if (0 > table.CoordY) {
              table.CoordY = 0;
            }
            if (0 > table.CoordX) {
              table.CoordX = 0;
            }
            if (
              dropTargetPosition.bottom <
              table.CoordY + newSizeY + dropTargetPosition.top
            ) {
              table.CoordY =
                dropTargetPosition.bottom - newSizeY - dropTargetPosition.top;
            }
            if (
              dropTargetPosition.left +
                window.scrollX +
                dropTargetPosition.width <
              table.CoordX + newSizeX + dropTargetPosition.left
            ) {
              table.CoordX =
                dropTargetPosition.right - newSizeX - dropTargetPosition.left;
            }
            table.CoordX = (table.CoordX / this.state.widthForChange) * 100;
            table.CoordY = (table.CoordY / this.state.heightForChange) * 100;
            table.NumberOfPeople = this.state.NOP;
          }
          return table;
        }),
      });
    }
  };
  // Close pop up modal
  closeModal = () => {
    this.setState({ isOpen: false });
    this.convertToMainScale();
  };
  closeModal1 = () => {
    this.setState({ isOpen1: false });
    this.convertToMainScale();
  };
  //Handle input of table size
  handleSizeChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeSize = (e) => {
    let num = parseInt(e.target.value);
    this.setState({ [e.target.name]: num });
  };
  // Handle pop up modal submit and activate closeModal()
  handleSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
  };
  handleSubmit1 = (e) => {
    e.preventDefault();
    this.closeModal1();
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
    if (table.TableType === 'circle' || table.TableType === 'square') {
      if (this.state.floorPlanList.find((tab) => tab._id === table._id)) {
        const [newXposition, newYposition] = this.calculateYX(
          finalPosition,
          initialPosition
        );

        let centerX = newXposition + table.SizeX / 2;
        let centerY = newYposition + table.SizeX / 2;

        this.setState({
          tempId: table._id,
          tempType: table.TableType,
          csSize: table.realSize,
          xCoord: centerX,
          yCoord: centerY,
        });
        this.convertToMainScale();
      } else {
        this.openModal();

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
          realSize: 0,
          CoordY: 0,
          NumberOfPeople: 0,
        };
        this.setState({
          floorPlanList: [...this.state.floorPlanList, temp],
          tempId: temp._id,
          tempType: temp.TableType,
          xCoord: centerX,
          yCoord: centerY,
        });
      }
    } else if (
      table.TableType === 'rectangle' ||
      table.TableType === 'elipse'
    ) {
      if (this.state.floorPlanList.find((tab) => tab._id === table._id)) {
        const [newXposition, newYposition] = this.calculateYX(
          finalPosition,
          initialPosition
        );

        let centerX = newXposition + table.SizeX / 2;
        let centerY = newYposition + table.SizeY / 2;

        this.setState({
          tempId: table._id,
          tempType: table.TableType,
          reSizeX: table.realSizeX,
          reSizeY: table.realSizeY,
          xCoord: centerX,
          yCoord: centerY,
        });
        this.convertToMainScale();
      } else {
        this.openModal1();

        const [newXposition, newYposition] = this.calculateYX(
          finalPosition,
          initialPosition
        );

        let centerX = newXposition + 100 / 2;
        let centerY = newYposition + 50 / 2;

        let temp = {
          _id: uuid(),
          ImageName: table.ImageName,
          TableType: table.TableType,
          SizeX: 0,
          SizeY: 0,
          CoordX: 0,
          Orientation: '',
          realSizeX: 0,
          realSizeY: 0,
          CoordY: 0,
          NumberOfPeople: 0,
        };
        this.setState({
          floorPlanList: [...this.state.floorPlanList, temp],
          tempId: temp._id,
          tempType: temp.TableType,
          xCoord: centerX,
          yCoord: centerY,
        });
      }
    }
  };
  //Open and close grid
  handleGrid = (e) => {
    this.setState({
      isGridOn: !this.state.isGridOn,
    });
  };
  handleFloorPlanResize = (width, height) => {
    console.log(width, height);
    this.setState({
      scale: width / this.state.sizeWidth,
      widthForChange: width,
      heightForChange: height,
    });
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
  handleSaveFloorPLan = () => {
    console.log(this.props.match.params.id);
    this.props.saveFloorPlan(
      this.state.floorPlanList,
      this.props.match.params.id
    );
  };

  handleChangeFile = (event) => {
    const height = this.boss.clientHeight;
    const width = this.boss.clientWidth;
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      good: true,
    });
  };
  handleDeleteTables = () => {
    // let list = this.state.deleteThisTables;
    // let list2 = this.state.floorPlanList;
    // for (let i = 0; i < list.length; i++) {
    //   list2 = list2.filter((l) => l._id !== list[i]);
    // }

    let list2 = this.state.floorPlanList.filter(
      (l) => l._id !== this.state.deleteThisTables
    );
    this.setState({
      floorPlanList: list2,
      btnDisabled: true,
      deleteThisTables: 'not selected',
    });
  };

  handleSelectTable = (id) => {
    // let isThere = this.state.deleteThisTables.find((n) => n === id);
    // let list = this.state.deleteThisTables.filter((n) => n !== id);
    // if (isThere) {
    //   this.setState({
    //     deleteThisTables: list,
    //     btnDisabled: list.length > 0 ? false : true,
    //   });
    // } else {
    //   this.setState({
    //     deleteThisTables: [...this.state.deleteThisTables, id],
    //     btnDisabled: false,
    //   });
    // }

    let isThere = this.state.deleteThisTables === id;

    if (isThere) {
      this.setState({
        deleteThisTables: 'not selected',
        infoTable: {},
        btnDisabled: true,
      });
    } else {
      let table = '';
      for (let i = 0; i < this.state.floorPlanList.length; i++) {
        if (id === this.state.floorPlanList[i]._id) {
          table = this.state.floorPlanList[i];
        }
      }
      this.setState({
        deleteThisTables: id,
        infoTable: table,
        btnDisabled: false,
      });
    }
  };

  nextStep = () => {
    this.setState({
      step: 1,
    });
  };

  handleOriation = (x) => {
    this.setState({
      reOri: x,
    });
  };

  render() {
    let resto = {};
    for (const rest of this.props.restoraunts) {
      if (rest._id === this.props.match.params.id) {
        resto = rest;
      }
    }
    let gridCells = [];
    let gridCellsHeight = this.state.currentFloorPlanHeight / 800;
    let gridCellsWidth = this.state.currentFloorPlanWidth / 800;

    let infoSelectedTable = '';
    if (this.state.deleteThisTables === 'not selected') {
      infoSelectedTable = (
        <React.Fragment>
          <p>Select one table to see his info</p>
        </React.Fragment>
      );
    } else {
      if (
        this.state.infoTable.TableType === 'circle' ||
        this.state.infoTable.TableType === 'square'
      ) {
        infoSelectedTable = (
          <div>
            <p>ID: {this.state.infoTable._id}</p>
            <p>Type: {this.state.infoTable.TableType}</p>
            <p>Size: {this.state.infoTable.realSize}</p>
            <p>NOP: {this.state.infoTable.NumberOfPeople}</p>
          </div>
        );
      } else if (
        this.state.infoTable.TableType === 'rectangle' ||
        this.state.infoTable.TableType === 'elipse'
      ) {
        infoSelectedTable = (
          <div>
            <p>ID: {this.state.infoTable._id}</p>
            <p>Type: {this.state.infoTable.TableType}</p>
            <p>Width: {this.state.infoTable.realSizeX}</p>
            <p>Height: {this.state.infoTable.realSizeY}</p>
            <p>NOP: {this.state.infoTable.NumberOfPeople}</p>
          </div>
        );
      } else {
        infoSelectedTable = (
          <React.Fragment>
            <p>yeee</p>
          </React.Fragment>
        );
      }
    }
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
    let fpc = {};
    if (this.state.step === 0) {
      fpc = (
        <div
          style={{
            width: '100%',
            height: '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
              width: '40%',
            }}
          >
            <label>
              <div className='upload-btn-wrapper'>
                <button className='btn'>Upload a floor plan</button>

                <input
                  type='file'
                  className='userInput'
                  onChange={this.handleChangeFile}
                  accept='image/png, image/jpeg, image/jpg'
                />
              </div>
            </label>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <label>
                <input
                  name='sizeWidth'
                  type='text'
                  placeholder='width of restourant..'
                  className='userInputSize'
                  onChange={this.handleChangeSize}
                />
              </label>
              <p>X</p>
              <label>
                <input
                  name='sizeHeight'
                  type='text'
                  placeholder='height of restourant..'
                  className='userInputSize'
                  onChange={this.handleChangeSize}
                />
              </label>
            </div>
          </div>
          <button onClick={() => this.nextStep()}>NEXT</button>
        </div>
      );
    } else if (this.state.step === 1) {
      fpc = (
        <React.Fragment>
          <TableList></TableList>
          <div className='containerS'>
            <div
              className='floorPlanContainer'
              ref={this.boss}
              style={{
                backgroundImage: `url(${this.state.file})`,
                backgroundRepeat: ' no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '100% auto',
                height: this.state.currentFloorPlanHeight,
                width: '90%',
              }}
            >
              <FloorPlan
                handleSelectTable={this.handleSelectTable}
                file={this.state.file}
                FloorPlanImgName={resto.FloorPlanImgName}
                onDropImg={this.onDropImg}
                floorPlanList={this.state.floorPlanList}
                handleFloorPlanResize={this.handleFloorPlanResize}
              />
              {this.state.isGridOn ? (
                <div className='grid'>{gridCells}</div>
              ) : null}
            </div>
            <div className='infoSelectedTable'>{infoSelectedTable}</div>
          </div>
          <div className='containerM'>
            <button className='regBtn' onClick={this.handleGrid}>
              Grid on/off
            </button>
            <button
              className='regBtn'
              onClick={() => this.handleSaveFloorPLan()}
            >
              Save floor plan
            </button>
            <button
              className='regBtn'
              disabled={this.state.btnDisabled}
              onClick={() => this.handleDeleteTables()}
            >
              Delete tables
            </button>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className='container'>
        <div className='goBack'>
          <FontAwesomeIcon
            onClick={this.props.history.goBack}
            icon={faArrowLeft}
            style={{ marginRight: '5px', marginTop: '2px', cursor: 'pointer' }}
          />
        </div>
        {fpc}
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
              name='csSize'
              type='text'
              placeholder='Size x..'
              onChange={this.handleSizeChange}
            />
            <input
              name='NOP'
              type='text'
              placeholder='Number of people'
              onChange={this.handleSizeChange}
            />
            <button onClick={this.handleSubmit}>OK</button>
          </div>
        </Popup>
        <Popup
          open={this.state.isOpen1}
          closeOnDocumentClick
          onClose={this.closeModal1}
        >
          <div className='modal'>
            <div className='close' onClick={this.closeModal1}>
              +
            </div>
            <input
              name='reSizeX'
              type='text'
              placeholder='Size x..'
              onChange={this.handleSizeChange}
            />
            <input
              name='reSizeY'
              type='text'
              placeholder='Size y..'
              onChange={this.handleSizeChange}
            />
            <input
              name='NOP'
              type='text'
              placeholder='Number of people'
              onChange={this.handleSizeChange}
            />
            <button onClick={() => this.handleOriation('v')}>VODORAVNO</button>
            <button onClick={() => this.handleOriation('o')}>OKOMITO</button>
            <button onClick={this.handleSubmit1}>OK</button>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  restoraunts: state.floorPlan.restoraunts,
});
export default connect(mapStateToProps, { saveFloorPlan })(
  withRouter(FloorPlanCreating)
);
