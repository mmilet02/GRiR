import React, { Component } from 'react';
import './FloorPlanCreating.css';
import TableList from '../TableList/TableList.js';
import FloorPlan from '../FloorPlan/FloorPlan.js';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import GridTarget from '../GridTarget/GridTarget.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  saveFloorPlan,
  uploadFpImage,
  updateValidatedBy,
} from '../../../actions/floorPlanAction.js';
import { withRouter } from 'react-router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FloorPlanCreating extends Component {
  constructor(props) {
    super(props);
    this.boss = React.createRef();
    this.state = {
      msg: '',
      msg1: null,
      msg2: null,
      floorPlanList: [],
      deleteThisTables: 'not selected',
      sizeWidth: 0,
      sizeHeight: 0,
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      xCoord: 0,
      yCoord: 0,
      csSize: 'Veličina stola',
      reSizeX: 'Dužina stola',
      chReSizeY: '',
      chReSizeX: '',
      floorPlanImageName: '',
      floorPlanImage: '',
      NOP: 'Maksimalan broj ljudi',
      chNOP: '',
      reSizeY: 'Širina stola',
      tempId: '0',
      tempType: '',
      reOri: '',
      chReOri: '',
      chReSize: '',
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

  componentDidMount() {
    window.scrollTo(0, 0);
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
          if (
            table.TableType === 'Niski okrugli' ||
            table.TableType === 'Niski kockasti'
          ) {
            table.SizeX = table.realSize * this.state.scale;
          } else if (
            table.TableType === 'Niski stol' ||
            table.TableType === 'Niski eliptični'
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
  // Open pop up modal1
  openModal1 = () => {
    this.setState({
      isOpen1: true,
      tempId: '0',
    });
  };
  //Covert the actual size of table to scale
  convertToMainScale = () => {
    if (
      this.state.tempType === 'Niski okrugli' ||
      this.state.tempType === 'Niski kockasti'
    ) {
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
      this.closeModal();
    } else if (
      this.state.tempType === 'Niski stol' ||
      this.state.tempType === 'Niski eliptični'
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
    this.closeModal1();
  };
  // Close pop up modal without actions
  closeModal = () => {
    this.setState({
      isOpen: false,
      NOP: 'Maksimalan broj ljudi',
      csSize: 'Veličina stola',
      msg1: null,
    });
  };
  // Close pop up modal with actions
  closeModaland = () => {
    if (
      this.state.NOP === 'Maksimalan broj ljudi' ||
      this.state.csSize === 'Veličina stola' ||
      this.state.csSize.match(/^\d+(\.\d{1,2})?$/) === null ||
      this.state.NOP.match(/^[0-9]*$/) == null
    ) {
      this.setState({
        msg1: 'Niste unijeli sva polja ispravno',
      });
    } else {
      this.setState({ isOpen: false });
      this.convertToMainScale();
    }
  };
  // Close pop up modal1 without actions
  closeModal1 = () => {
    this.setState({
      isOpen1: false,
      NOP: 'Maksimalan broj ljudi',
      reSizeY: 'Širina stola',
      reSizeX: 'Dužina stola',
      reOri: '',
      msg1: null,
    });
  };
  // Close pop up modal1 with actions
  closeModal1and = () => {
    if (
      this.state.NOP === 'Maksimalan broj ljudi' ||
      this.state.reSizeY === 'Širina stola' ||
      this.state.reSizeY.match(/^\d+(\.\d{1,2})?$/) == null ||
      this.state.NOP.match(/^[0-9]*$/) == null ||
      this.state.reSizeX === 'Dužina stola' ||
      this.state.reSizeX.match(/^\d+(\.\d{1,2})?$/) == null
    ) {
      this.setState({
        msg1: 'Niste unijeli sva polja ispravno',
      });
    } else if (this.state.reOri === '') {
      this.setState({
        msg1: 'Niste označili orijentaciju stola',
      });
    } else {
      this.setState({ isOpen1: false });
      this.convertToMainScale();
    }
  };
  // Close pop up modal2 without actions
  closeModal2 = () => {
    this.setState({
      isOpen2: false,
      chReSize: '',
      chNOP: '',
      chReSizeX: '',
      chReSizeY: '',
      chReOri: '',
      msg2: null,
    });
  };
  // Close pop up modal2 without actions for circle and square
  closeModal2and1 = () => {
    if (
      this.state.chNOP === '' ||
      this.state.chReSize === '' ||
      this.state.chReSize.match(/^\d+(\.\d{1,2})?$/) == null ||
      this.state.chNOP.match(/^[0-9]*$/) == null
    ) {
      this.setState({
        msg2: 'Niste unijeli sva polja ispravno',
      });
    } else {
      this.setState({
        isOpen2: false,
        floorPlanList: this.state.floorPlanList.map((table) => {
          if (
            this.state.infoTable._id === table._id &&
            (table.TableType === 'Niski okrugli' ||
              table.TableType === 'Niski kockasti')
          ) {
            if (this.state.chReSize !== '0' && this.state.chReSize !== '') {
              table.SizeX = this.state.chReSize * this.state.scale;
              table.realSize = this.state.chReSize;
            }
            if (this.state.chNOP !== '0' && this.state.chReSize !== '') {
              table.NumberOfPeople = this.state.chNOP;
            }
          }
          return table;
        }),
      });
      this.restart();
    }
  };
  // Close pop up modal2 with actions for elipse and ractangle
  closeModal2and2 = () => {
    if (
      this.state.chNOP === '' ||
      this.state.chReSizeY === '' ||
      this.state.chReSizeY.match(/^\d+(\.\d{1,2})?$/) == null ||
      this.state.chReSizeX === '' ||
      this.state.chReSizeX.match(/^\d+(\.\d{1,2})?$/) == null ||
      this.state.chNOP.match(/^[0-9]*$/) == null
    ) {
      this.setState({
        msg2: 'Niste unijeli sva polja ispravno',
      });
    } else if (this.state.chReOri === '') {
      this.setState({
        msg2: 'Niste označili orijentaciju stola',
      });
    } else {
      this.setState({
        isOpen2: false,
        floorPlanList: this.state.floorPlanList.map((table) => {
          if (
            this.state.infoTable._id === table._id &&
            (table.TableType === 'Niski stol' ||
              table.TableType === 'Niski eliptični')
          ) {
            if (this.state.chNOP !== '0' && this.state.chReSize !== '') {
              table.NumberOfPeople = this.state.chNOP;
            }
            if (this.state.chReSizeX !== '0' && this.state.chReSizeX !== '') {
              table.SizeX = this.state.chReSizeX * this.state.scale;
              table.realSizeX = this.state.chReSizeX;
            }
            if (this.state.chReSizeY !== '0' && this.state.chReSizeY !== '') {
              table.SizeY = this.state.chReSizeY * this.state.scale;
              table.realSizeY = this.state.chReSizeY;
            }
            if (this.state.chReOri !== '') {
              table.Orientation = this.state.chReOri;
            }
          }

          return table;
        }),
      });
      this.restart();
    }
  };
  //Sets some state atributes on default value
  restart = () => {
    this.setState({
      chReSizeY: '',
      chReSizeX: '',
      chNOP: '',
      chReSize: '',
      chReOri: '',
      msg2: null,
    });
  };
  //Handle inputs
  handleSizeChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //Handle inputs
  handleChangeSize = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // Handle pop up modal submit and activate closeModal()
  handleSubmit = (e) => {
    e.preventDefault();
    this.closeModaland();
  };
  // Handle pop up modal submit and activate closeModal1()
  handleSubmit1 = (e) => {
    e.preventDefault();
    this.closeModal1and();
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
    if (
      table.TableType === 'Niski okrugli' ||
      table.TableType === 'Niski kockasti'
    ) {
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
          NOP: table.NumberOfPeople,
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
      table.TableType === 'Niski stol' ||
      table.TableType === 'Niski eliptični'
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
          NOP: table.NumberOfPeople,
          reOri: table.Orientation,
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
  //Resize observer
  handleFloorPlanResize = (width, height) => {
    this.setState({
      scale: width / this.state.sizeWidth,
      widthForChange: width,
      heightForChange: height,
    });
  };
  //Activate functio for uploading floor plan
  handleSaveFloorPLan = () => {
    console.log(this.props.match.params.id);
    let formData = new FormData();
    formData.append('file', this.state.floorPlanImage);

    this.props.saveFloorPlan(
      this.state.floorPlanList,
      this.props.match.params.id,
      this.state.sizeWidth,
      this.state.sizeHeight,
      this.state.floorPlanImageName
    );
    this.props.uploadFpImage(formData);
    if (this.props.user && this.props.user.admin) {
      this.props.updateValidatedBy(
        this.props.match.params.id,
        this.props.user.admin._id
      );
    }
  };
  //Handle image input
  handleChangeFile = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      floorPlanImage: event.target.files[0],
      floorPlanImageName: event.target.files[0].name,
      good: true,
    });
  };
  //Delete selected table from table list
  handleDeleteTables = () => {
    let list2 = this.state.floorPlanList.filter(
      (l) => l._id !== this.state.deleteThisTables
    );
    this.setState({
      floorPlanList: list2,
      btnDisabled: true,
      deleteThisTables: 'not selected',
    });
  };
  //Sets information for selected table
  handleSelectTable = (id) => {
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
  //Next step
  nextStep = () => {
    if (
      this.state.sizeHeight === 0 ||
      this.state.sizeWidth === 0 ||
      this.state.sizeWidth.match(/^[0-9]*$/) == null ||
      this.state.sizeHeight.match(/^[0-9]*$/) == null
    ) {
      this.setState({
        msg: 'Niste unijeli obe dimenzije restorana pravilno',
      });
    } else if (this.state.file === '') {
      this.setState({
        msg: 'Niste unijeli tlocrt restorana',
      });
    } else {
      this.setState({
        step: 1,
        msg: '',
      });
    }
  };
  //Handle orantion input
  handleOriation = (x) => {
    this.setState({
      reOri: x,
    });
  };
  //Handle orantion input
  chHandleOriation = (x) => {
    this.setState({
      chReOri: x,
    });
  };
  //Open pop up for changing selected table
  handleBtnChangeTable = () => {
    if (
      this.state.infoTable.TableType === 'Niski okrugli' ||
      this.state.infoTable.TableType === 'Niski kockasti'
    ) {
      this.setState({
        isOpen2: true,
        chReSize: this.state.infoTable.realSize,
        chNOP: this.state.infoTable.NumberOfPeople,
      });
    } else if (
      this.state.infoTable.TableType === 'Niski stol' ||
      this.state.infoTable.TableType === 'Niski eliptični'
    ) {
      this.setState({
        isOpen2: true,
        chNOP: this.state.infoTable.NumberOfPeople,
        chReSizeX: this.state.infoTable.realSizeX,
        chReSizeY: this.state.infoTable.realSizeY,
        chReOri: this.state.infoTable.Orientation,
      });
    }
  };

  render() {
    let resto = {};
    for (const rest of this.props.restoraunts) {
      if (rest._id === this.props.match.params.id) {
        resto = rest;
      }
    }
    let gridCells = [];
    let gridCellsHeight = this.state.heightForChange / 20;
    let gridCellsWidth = this.state.widthForChange / 35;
    console.log(gridCellsHeight);
    console.log(this.state.currentFloorPlanHeight);
    console.log(gridCellsWidth);
    console.log(this.state.widthForChange);

    let infoSelectedTable = '';
    let changeInfoTable = '';
    if (this.state.deleteThisTables === 'not selected') {
      infoSelectedTable = (
        <React.Fragment>
          <img
            className='imgInfoM'
            src='http://localhost:3000/images/logo.png'
            alt='logo'
          ></img>
        </React.Fragment>
      );
    } else {
      if (
        this.state.infoTable.TableType === 'Niski okrugli' ||
        this.state.infoTable.TableType === 'Niski kockasti'
      ) {
        infoSelectedTable = (
          <div>
            <p>TIP: {this.state.infoTable.TableType}</p>
            <p>VELIČINA: {this.state.infoTable.realSize}</p>
            <p>NOP: {this.state.infoTable.NumberOfPeople}</p>
            <button
              className='changeBtn'
              onClick={() => this.handleBtnChangeTable()}
            >
              PROMIJENI
            </button>
          </div>
        );

        changeInfoTable = (
          <div className='modal'>
            <div className='close' onClick={this.closeModal2}>
              +
            </div>
            <input
              style={{ marginTop: '45px' }}
              name='chReSize'
              type='text'
              className='userInput'
              value={this.state.chReSize}
              placeholder={this.state.infoTable.realSize}
              onChange={this.handleSizeChange}
            />
            <input
              name='chNOP'
              type='text'
              className='userInput'
              value={this.state.chNOP}
              placeholder={this.state.infoTable.NumberOfPeople}
              onChange={this.handleSizeChange}
            />
            <button
              style={{ width: '30%', margin: '0 35%', padding: '5px' }}
              onClick={this.closeModal2and1}
            >
              OK
            </button>
            {this.state.msg2 ? (
              <div
                className='errBox'
                style={{ marginBottom: '20px', marginTop: '20px' }}
              >
                <p style={{ color: 'red' }}>{this.state.msg2}</p>
              </div>
            ) : null}
          </div>
        );
      } else if (
        this.state.infoTable.TableType === 'Niski stol' ||
        this.state.infoTable.TableType === 'Niski eliptični'
      ) {
        infoSelectedTable = (
          <div>
            <p>TIP: {this.state.infoTable.TableType}</p>
            <p>ŠIRINA: {this.state.infoTable.realSizeX}</p>
            <p>VISINA: {this.state.infoTable.realSizeY}</p>
            <p>NOP: {this.state.infoTable.NumberOfPeople}</p>
            <button
              className='changeBtn'
              onClick={() => this.handleBtnChangeTable()}
            >
              PROMIJENI
            </button>
          </div>
        );

        changeInfoTable = (
          <div className='modal'>
            <div className='close' onClick={this.closeModal2}>
              +
            </div>
            <input
              style={{ marginTop: '45px' }}
              name='chReSizeX'
              className='userInput'
              type='text'
              value={this.state.chReSizeX}
              placeholder={this.state.infoTable.realSizeX}
              onChange={this.handleSizeChange}
            />
            <input
              name='chReSizeY'
              type='text'
              className='userInput'
              value={this.state.chReSizeY}
              placeholder={this.state.infoTable.realSizeY}
              onChange={this.handleSizeChange}
            />
            <input
              name='chNOP'
              type='text'
              className='userInput'
              value={this.state.chNOP}
              placeholder={this.state.infoTable.NumberOfPeople}
              onChange={this.handleSizeChange}
            />
            <button
              style={{
                width: '30%',
                margin: '0px 5px 0px 3px',
                padding: '5px',
              }}
              onClick={() => this.chHandleOriation('v')}
            >
              VODORAVNO
            </button>
            <button
              style={{ width: '30%', margin: '0 5px', padding: '5px' }}
              onClick={() => this.chHandleOriation('o')}
            >
              OKOMITO
            </button>
            <button
              style={{
                width: '30%',
                margin: '10px 35% 0px 35%',
                padding: '5px',
              }}
              onClick={this.closeModal2and2}
            >
              OK
            </button>
            {this.state.msg2 ? (
              <div
                className='errBox'
                style={{ marginBottom: '20px', marginTop: '20px' }}
              >
                <p style={{ color: 'red' }}>{this.state.msg2}</p>
              </div>
            ) : null}
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
    for (let i = 0; i < 700; i++) {
      gridCells.push(
        <GridTarget
          key={i}
          gridCellsWidth={gridCellsWidth}
          gridCellsHeight={gridCellsHeight}
          onDropImg={this.onDropImg}
          style={{
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
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div className='contStep0'>
            <label>
              <div className='upload-btn-wrapper'>
                <button className='btn'>TLOCRT RESTORANA</button>

                <input
                  type='file'
                  className='userInput'
                  name='floorPlanImage'
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
              <label style={{ width: '80%' }}>
                <input
                  name='sizeWidth'
                  type='text'
                  placeholder='Dužina restorana'
                  className='userInputSize'
                  onChange={this.handleChangeSize}
                />
              </label>
              <p style={{ margin: '5px 5px 0px 5px' }}>X</p>
              <label style={{ width: '80%' }}>
                <input
                  name='sizeHeight'
                  type='text'
                  placeholder='Širina restorana'
                  className='userInputSize'
                  onChange={this.handleChangeSize}
                />
              </label>
            </div>
          </div>
          <button className='regBtn' onClick={() => this.nextStep()}>
            SLJEDEĆI KORAK
          </button>
          {this.state.msg ? (
            <div className='errBox1'>
              <p style={{ color: 'red' }}>{this.state.msg}</p>
            </div>
          ) : null}
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
                backgroundSize: 'contain',
                height: this.state.currentFloorPlanHeight,
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
              GRID on/off
            </button>
            <Link to='/'>
              <button
                className='regBtn'
                onClick={() => this.handleSaveFloorPLan()}
              >
                SPREMI
              </button>
            </Link>
            <button
              className='regBtn'
              disabled={this.state.btnDisabled}
              onClick={() => this.handleDeleteTables()}
            >
              IZBRIŠI STOL
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
            style={{
              marginRight: '5px',
              marginTop: '2px',
              cursor: 'pointer',
              color: 'rgb(3, 168, 124)',
            }}
            size='lg'
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
              style={{ marginTop: '45px' }}
              name='csSize'
              type='text'
              placeholder={this.state.csSize}
              className='userInput'
              value={
                this.state.csSize === 'Veličina stola' ? '' : this.state.csSize
              }
              onChange={this.handleSizeChange}
            />
            <input
              name='NOP'
              type='text'
              className='userInput'
              placeholder='Maksimalan broj ljudi'
              onChange={this.handleSizeChange}
              value={
                this.state.NOP === 'Maksimalan broj ljudi' ? '' : this.state.NOP
              }
            />
            <button
              style={{ width: '30%', margin: '0 35%', padding: '5px' }}
              onClick={this.handleSubmit}
            >
              OK
            </button>
            {this.state.msg1 ? (
              <div
                className='errBox'
                style={{ marginBottom: '20px', marginTop: '20px' }}
              >
                <p style={{ color: 'red' }}>{this.state.msg1}</p>
              </div>
            ) : null}
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
              style={{ marginTop: '45px' }}
              name='reSizeX'
              type='text'
              placeholder={this.state.reSizeX}
              className='userInput'
              value={
                this.state.reSizeX === 'Dužina stola' ? '' : this.state.reSizeX
              }
              onChange={this.handleSizeChange}
            />
            <input
              name='reSizeY'
              type='text'
              placeholder={this.state.reSizeY}
              className='userInput'
              value={
                this.state.reSizeY === 'Širina stola' ? '' : this.state.reSizeY
              }
              onChange={this.handleSizeChange}
            />
            <input
              name='NOP'
              type='text'
              placeholder='Maksimalan broj ljudi'
              className='userInput'
              value={
                this.state.NOP === 'Maksimalan broj ljudi' ? '' : this.state.NOP
              }
              onChange={this.handleSizeChange}
            />
            <button
              style={{
                width: '30%',
                margin: '0px 5px 0px 3px',
                padding: '5px',
              }}
              onClick={() => this.handleOriation('v')}
            >
              VODORAVNO
            </button>
            <button
              style={{ width: '30%', margin: '0 5px', padding: '5px' }}
              onClick={() => this.handleOriation('o')}
            >
              OKOMITO
            </button>
            <button
              style={{
                width: '30%',
                margin: '10px 35% 0px 35%',
                padding: '5px',
              }}
              onClick={this.handleSubmit1}
            >
              OK
            </button>
            {this.state.msg1 ? (
              <div
                className='errBox'
                style={{ marginBottom: '20px', marginTop: '20px' }}
              >
                <p style={{ color: 'red' }}>{this.state.msg1}</p>
              </div>
            ) : null}
          </div>
        </Popup>
        <Popup
          open={this.state.isOpen2}
          closeOnDocumentClick
          onClose={this.closeModal2}
        >
          {changeInfoTable}
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  restoraunts: state.floorPlan.restoraunts,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  saveFloorPlan,
  uploadFpImage,
  updateValidatedBy,
})(withRouter(FloorPlanCreating));
