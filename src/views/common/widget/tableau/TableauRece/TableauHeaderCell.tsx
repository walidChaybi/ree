import TableCell, { SortDirection } from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { getLibelle } from "@util/Utils";
import classNames from "classnames";
import React from "react";
import "../../../../../scss/_library.scss";
import { SortOrder } from "../TableUtils";
import { TableauTypeColumn } from "./TableauTypeColumn";

interface TableauHeaderCellProps {
  order?: SortOrder;
  orderBy?: string;
  column: TableauTypeColumn;
  sortHandler: (event: React.MouseEvent<unknown>, property: string) => void;
  dataBody: any[];
}

export const TableauHeaderCell: React.FC<TableauHeaderCellProps> = props => {
  const styles = classNames({
    OrderedHeaderCell: props.orderBy === props.column.keys[0],
    TableauFontHeader: true,
    CursorHeader:
      !(props.orderBy && props.sortHandler) || !props.column.sortable,
    ColonneTriable: props.column.sortable
  });

  let orderTableCell: SortDirection = false;
  let orderTableLabel: "asc" | "desc" = "asc";

  if (props.order === "ASC") {
    orderTableCell = "asc";
    orderTableLabel = "asc";
  } else if (props.order === "DESC") {
    orderTableCell = "desc";
    orderTableLabel = "desc";
  }

  const onClickCell = (event: React.MouseEvent<unknown>, columnKey: string) => {
    if (props.column.sortable) {
      props.sortHandler(event, columnKey);
    }
  };

  return (
    <TableCell
      align={props.column?.align ? props.column?.align : "left"}
      sortDirection={
        props.orderBy === props.column.keys[0] ? orderTableCell : false
      }
      // A ajouter dans TableauHeader cell si besoin d'une classe générique:
      // className="HeaderColonneTableau"
      style={props.column?.style}
    >
      {props.column.getTitle ? (
        props.column.getTitle(props.dataBody)
      ) : (
        <TableSortLabel
          className={styles}
          active={props.orderBy === props.column.keys[0]}
          direction={
            props.orderBy === props.column.keys[0] ? orderTableLabel : "asc"
          }
          onClick={e => onClickCell(e, props.column.keys[0])}
          hideSortIcon={props.orderBy !== props.column.keys[0]}
        >
          {getLibelle(props.column.title)}
        </TableSortLabel>
      )}
    </TableCell>
  );
};
