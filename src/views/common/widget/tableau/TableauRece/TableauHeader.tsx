import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { SortOrder } from "../TableUtils";
import { TableauHeaderCell } from "./TableauHeaderCell";
import { TableauTypeColumn } from "./TableauTypeColumn";

interface TableauReceProps {
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  order?: SortOrder;
  orderBy?: string;
  columnHeaders: TableauTypeColumn[];
  dataBody: any[];
}

export const TableauHeader: React.FC<TableauReceProps> = props => {
  const createSortHandler = (event: React.MouseEvent<unknown>, property: string) => {
    if (props.onRequestSort) {
      props.onRequestSort(event, property);
    }
  };

  const listOfTableauHeaderCell = [];

  for (const column of props.columnHeaders) {
    listOfTableauHeaderCell.push(
      <TableauHeaderCell
        key={column.keys[0]}
        column={column}
        order={props.order}
        orderBy={props.orderBy}
        sortHandler={createSortHandler}
        dataBody={props.dataBody}
      />
    );
  }
  return (
    <TableHead>
      <TableRow>{listOfTableauHeaderCell}</TableRow>
    </TableHead>
  );
};
