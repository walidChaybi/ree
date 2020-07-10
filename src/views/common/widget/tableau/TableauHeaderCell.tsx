import React from "react";
import TableCell, { SortDirection } from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Text } from "../Text";
import { SortOrder } from "./TableUtils";
import classNames from "classnames";
import "../../../../sass/_library.scss";
import "./sass/TableauHeader.scss";
import { TableauTypeColumn } from "./TableauRece";

interface TableauHeaderCellProps {
  order: SortOrder;
  orderBy: string;
  column: TableauTypeColumn;
  sortHandler: (property: string) => (event: React.MouseEvent<unknown>) => void;
}

export const TableauHeaderCell: React.FC<TableauHeaderCellProps> = ({
  order,
  orderBy,
  column,
  sortHandler,
}) => {
  const styles = classNames({
    OrderedHeaderCell: orderBy === column.keys[0],
    tableauFontHeader: true,
  });

  let orderTableCell: SortDirection = false;
  let orderTableLabel: "asc" | "desc" = "asc";

  if (order === "ASC") {
    orderTableCell = "asc";
    orderTableLabel = "asc";
  } else if (order === "DESC") {
    orderTableCell = "desc";
    orderTableLabel = "desc";
  }

  return (
    <TableCell
      align="center"
      sortDirection={orderBy === column.keys[0] ? orderTableCell : false}
      className="ColonneTableau"
    >
      <TableSortLabel
        className={styles}
        active={orderBy === column.keys[0]}
        direction={orderBy === column.keys[0] ? orderTableLabel : "asc"}
        onClick={sortHandler(column.keys[0])}
      >
        <Text messageId={`${column.colLibelle}.${column.keys[0]}`} />
      </TableSortLabel>
    </TableCell>
  );
};
