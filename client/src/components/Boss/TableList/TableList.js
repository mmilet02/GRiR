import React, { useEffect } from 'react';
import './TableList.css';
import DraggTableTypesFirst from '../DraggTableTypesFirst/DraggTableTypesFirst.js';
import { connect } from 'react-redux';
import { getTableTypes } from '../../../actions/tableTypesActions.js';
import PropTypes from 'prop-types';

function TableList(props) {
  useEffect(() => {
    props.getTableTypes();
  }, []);

  const tablesList = props.tables.map(table => (
    <DraggTableTypesFirst key={table._id} table={table}></DraggTableTypesFirst>
  ));
  return <div className='tablesList'>{tablesList}</div>;
}

const mapStateToProps = state => ({
  tables: state.tableTypes.tableTypes
});

TableList.propTypes = {
  getTableTypes: PropTypes.func.isRequired,
  tables: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { getTableTypes })(TableList);
