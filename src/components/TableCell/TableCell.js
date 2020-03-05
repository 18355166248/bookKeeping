import React from "react";
import tableCellCalculation from "../../utils/tableCellCalculation";
import data from "./data";

function TableCell() {
  const { tableData, tableData2 } = data;
  const cloneTableCell = tableCellCalculation.getUnitAndOffset(tableData2);

  return <div>表格列</div>;
}

export default TableCell;
