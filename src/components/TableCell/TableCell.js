import React from "react";
import tableCellCalculation from "../../utils/tableCellCalculation";
import data from "./data";

function TableCell() {
  const { tableData, tableData2, tableData3, expectTableData } = data;
  const cloneTableCell = tableCellCalculation.getUnitAndOffset(tableData3);

  console.log(cloneTableCell);
  console.log(expectTableData);

  return <div>表格列</div>;
}

export default TableCell;
