import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableauHeaderCell } from "./TableauHeaderCell";
import { SortOrder } from "./../TableUtils";
import { TableauTypeColumn } from "./TableauTypeColumn";

export interface TableauReceProps {
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  order?: SortOrder;
  orderBy?: string;
  columnHeaders: TableauTypeColumn[];
}

export const TableauHeader: React.FC<TableauReceProps> = props => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
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
