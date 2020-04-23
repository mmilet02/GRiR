import React, { Component } from 'react';

class SelectableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
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
    if (this.props.table.TableType === 'circle') {
      return (
        <div style={{ borderRadius: '50%' }}>
          <img
            onClick={() => {
              if (this.props.free) {
                let n = this.props.count;
                let x = '';

                if (this.state.selected) {
                  n--;
                  x = 'minus';
                  this.setState({
                    selected: !this.state.selected,
                  });
                  this.handleSelected(x);
                  this.props.handleCount(n);
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
                    this.props.handleCount(n);
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
              height: this.props.table.SizeX + 'px',
              width: this.props.table.SizeX + 'px',
              position: 'absolute',
              top: this.props.table.CoordY,
              left: this.props.table.CoordX,
            }}
          />
        </div>
      );
    } else if (this.props.table.TableType === 'square') {
      return (
        <div>
          <img
            onClick={() => {
              if (this.props.free) {
                let n = this.props.count;
                let x = '';

                if (this.state.selected) {
                  n--;
                  x = 'minus';
                  this.setState({
                    selected: !this.state.selected,
                  });
                  this.handleSelected(x);
                  this.props.handleCount(n);
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
                    this.props.handleCount(n);
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
              height: this.props.table.SizeX + 'px',
              width: this.props.table.SizeX + 'px',
              position: 'absolute',
              top: this.props.table.CoordY,
              left: this.props.table.CoordX,
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
