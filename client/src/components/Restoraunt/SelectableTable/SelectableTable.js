import React, { Component } from 'react';

class SelectableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      restart: true,
    };
  }

  componentWillUpdate() {
    if (!this.props.free && this.state.selected) {
      this.setState({
        selected: false,
      });
    }
  }

  handleSelected = (x) => {
    this.props.handleFloorPlan(
      this.props.floorPlanID,
      this.props.table._id,
      this.props.table.NumberOfPeople,
      x
    );
  };
  checkType = () => {
    console.log(this.props.scale);
    if (this.props.table.TableType === 'Niski okrugli') {
      let s = this.props.table.realSize * this.props.scale;
      return (
        <div style={{ borderRadius: '50%' }}>
          <img
            onClick={() => {
              if (this.props.free && this.props.d) {
                let n = this.props.count;
                let x = '';

                if (this.state.selected) {
                  n--;
                  x = 'minus';
                  this.setState({
                    selected: !this.state.selected,
                    restart: false,
                  });
                  this.handleSelected(x);
                  this.props.handleCount(n, this.props.table);
                } else {
                  if (n + 1 > 2) {
                    this.props.openModal();
                  } else {
                    n++;
                    x = 'plus';
                    this.setState({
                      selected: !this.state.selected,
                      restart: false,
                    });
                    this.handleSelected(x);
                    this.props.handleCount(n, this.props.table);
                  }
                }
              }
            }}
            src={
              this.props.free
                ? !this.state.selected
                  ? 'http://localhost:3000/images/circleN.png'
                  : 'http://localhost:3000/images/circleSelected.png'
                : 'http://localhost:3000/images/circleX.png'
            }
            alt=''
            style={{
              height: s + 'px',
              width: s + 'px',
              position: 'absolute',
              transform:
                this.props.table.TableType === 'Niski okrugli' ||
                this.props.table.TableType === 'Niski kockasti'
                  ? 'rotate(0deg)'
                  : this.props.table.Orientation === 'o'
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
              top: this.props.table.CoordY + '%',
              left: this.props.table.CoordX + '%',
            }}
          />
        </div>
      );
    } else if (this.props.table.TableType === 'Niski kockasti') {
      let s = this.props.table.realSize * this.props.scale;
      return (
        <div>
          <img
            onClick={() => {
              if (this.props.free && this.props.d) {
                let n = this.props.count;
                let x = '';

                if (this.state.selected) {
                  n--;
                  x = 'minus';
                  this.setState({
                    selected: !this.state.selected,
                  });
                  this.handleSelected(x);
                  this.props.handleCount(n, this.props.table);
                } else {
                  if (n + 1 > 2) {
                    this.props.openModal();
                  } else {
                    n++;
                    x = 'plus';
                    this.setState({
                      selected: !this.state.selected,
                    });
                    this.handleSelected(x);
                    this.props.handleCount(n, this.props.table);
                  }
                }
              }
            }}
            src={
              this.props.free
                ? !this.state.selected
                  ? 'http://localhost:3000/images/squareN.png'
                  : 'http://localhost:3000/images/squareSelected.png'
                : 'http://localhost:3000/images/squareX.png'
            }
            alt=''
            style={{
              height: s + 'px',
              width: s + 'px',
              position: 'absolute',
              transform:
                this.props.table.TableType === 'Niski okrugli' ||
                this.props.table.TableType === 'Niski kockasti'
                  ? 'rotate(0deg)'
                  : this.props.table.Orientation === 'o'
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
              top: this.props.table.CoordY + '%',
              left: this.props.table.CoordX + '%',
            }}
          />
        </div>
      );
    } else if (this.props.table.TableType === 'Niski stol') {
      let h = this.props.table.realSizeY * this.props.scale;
      let w = this.props.table.realSizeX * this.props.scale;
      return (
        <div>
          <img
            onClick={() => {
              if (this.props.free && this.props.d) {
                let n = this.props.count;
                let x = '';

                if (this.state.selected) {
                  n--;
                  x = 'minus';
                  this.setState({
                    selected: !this.state.selected,
                  });
                  this.handleSelected(x);
                  this.props.handleCount(n, this.props.table);
                } else {
                  if (n + 1 > 2) {
                    this.props.openModal();
                  } else {
                    n++;
                    x = 'plus';
                    this.setState({
                      selected: !this.state.selected,
                    });
                    this.handleSelected(x);
                    this.props.handleCount(n, this.props.table);
                  }
                }
              }
            }}
            src={
              this.props.free
                ? !this.state.selected
                  ? 'http://localhost:3000/images/rectangleN.png'
                  : 'http://localhost:3000/images/rectangleSelected.png'
                : 'http://localhost:3000/images/rectangleX.png'
            }
            alt=''
            style={{
              height: h + 'px',
              width: w + 'px',
              position: 'absolute',
              transform:
                this.props.table.TableType === 'Niski okrugli' ||
                this.props.table.TableType === 'Niski kockasti'
                  ? 'rotate(0deg)'
                  : this.props.table.Orientation === 'o'
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
              top: this.props.table.CoordY + '%',
              left: this.props.table.CoordX + '%',
            }}
          />
        </div>
      );
    } else if (this.props.table.TableType === 'Niski eliptični') {
      let h = this.props.table.realSizeY * this.props.scale;
      let w = this.props.table.realSizeX * this.props.scale;
      return (
        <div>
          <img
            onClick={() => {
              if (this.props.free && this.props.d) {
                let n = this.props.count;
                let x = '';

                if (this.state.selected) {
                  n--;
                  x = 'minus';
                  this.setState({
                    selected: !this.state.selected,
                  });
                  this.handleSelected(x);
                  this.props.handleCount(n, this.props.table);
                } else {
                  if (n + 1 > 2) {
                    this.props.openModal();
                  } else {
                    n++;
                    x = 'plus';
                    this.setState({
                      selected: !this.state.selected,
                    });
                    this.handleSelected(x);
                    this.props.handleCount(n, this.props.table);
                  }
                }
              }
            }}
            src={
              this.props.free
                ? !this.state.selected
                  ? 'http://localhost:3000/images/elipseN.png'
                  : 'http://localhost:3000/images/elipseSelected.png'
                : 'http://localhost:3000/images/elipseX.png'
            }
            alt=''
            style={{
              height: h + 'px',
              width: w + 'px',
              position: 'absolute',
              transform:
                this.props.table.TableType === 'Niski okrugli' ||
                this.props.table.TableType === 'Niski kockasti'
                  ? 'rotate(0deg)'
                  : this.props.table.Orientation === 'o'
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
              top: this.props.table.CoordY + '%',
              left: this.props.table.CoordX + '%',
            }}
          />
        </div>
      );
    }
  };
  render() {
    return <React.Fragment>{this.checkType()}</React.Fragment>;
  }
}
SelectableTable.propTypes = {};
export default SelectableTable;
