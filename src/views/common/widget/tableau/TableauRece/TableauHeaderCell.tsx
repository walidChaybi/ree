import TableCell, { SortDirection } from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import classNames from "classnames";
import React from "react";
import "../../../../../scss/_library.scss";
import { getLibelle } from "../../../util/Utils";
import { SortOrder } from "../TableUtils";
import { TableauTypeColumn } from "./TableauTypeColumn";

interface TableauHeaderCellProps {
  order?: SortOrder;
  orderBy?: string;
  column: TableauTypeColumn;
  sortHandler: (event: React.MouseEvent<unknown>, property: string) => void;
}

export const TableauHeaderCell: React.FC<TableauHeaderCellProps> = ({
  order,
  orderBy,
  column,
  sortHandler
}) => {
  const styles = classNames({
    OrderedHeaderCell: orderBy === column.keys[0],
    TableauFontHeader: true,
    CursorHeader: !(orderBy && sortHandler) || !column.sortable,
    ColonneTriable: column.sortable
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

  const onClickCell = (event: React.MouseEvent<unknown>, columnKey: string) => {
    if (column.sortable) {
      sortHandler(event, columnKey);
    }
  };

  return (
    <TableCell
      align={column?.align ? column?.align : "left"}
      sortDirection={orderBy === column.keys[0] ? orderTableCell : false}
      // A ajouter dans TableauHeader cell si besoin d'une classe générique:
      // className="HeaderColonneTableau"
      style={column?.style}
    >
      <TableSortLabel
        className={styles}
        active={orderBy === column.keys[0]}
        direction={orderBy === column.keys[0] ? orderTableLabel : "asc"}
        onClick={e => onClickCell(e, column.keys[0])}
        hideSortIcon={orderBy !== column.keys[0]}
      >
        {getLibelle(column.title)}
      </TableSortLabel>
    </TableCell>
  );
};
