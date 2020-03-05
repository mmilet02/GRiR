import React from "react";
import "./TableList.css";
import DraggTableTypesFirst from "../DraggTableTypesFirst/DraggTableTypesFirst.js";

function TableList(props) {
  const tablesList = props.tablesList.map(table => (
    <DraggTableTypesFirst key={table.id} table={table}></DraggTableTypesFirst>
  ));
  return <div className="tablesList">{tablesList}</div>;
}

export default TableList;
