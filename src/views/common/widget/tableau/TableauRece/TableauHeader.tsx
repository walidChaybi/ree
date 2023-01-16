import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { SortOrder } from "../TableUtils";
import { TableauHeaderCell } from "./TableauHeaderCell";
import { TableauTypeColumn } from "./TableauTypeColumn";

export interface TableauReceProps {
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  order?: SortOrder;
  orderBy?: string;
  columnHeaders: TableauTypeColumn[];
}

export const TableauHeader: React.FC<TableauReceProps> = props => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    if (onRequestSort) {
      onRequestSort(event, property);
    }
  };

  const listOfTableauHeaderCell = [];

  for (const column of props.columnHeaders) {
    listOfTableauHeaderCell.push(
      <TableauHeaderCell
        key={column.keys[0]}
        column={column}
        order={order}
        orderBy={orderBy}
        sortHandler={createSortHandler}
      />
    );
  }
  return (
    <TableHead>
      <TableRow>{listOfTableauHeaderCell}</TableRow>
    </TableHead>
  );
};
