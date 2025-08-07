import TableCell, { SortDirection } from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { getLibelle } from "@util/Utils";
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

  const getClassNames = (): string => {
    const result: string[] = ["TableauFontHeader"];

    if (props.orderBy === props.column.keys[0]) {
      result.push("OrderedHeaderCell");
    }

    if (!(props.orderBy && props.sortHandler) || !props.column.sortable) {
      result.push("CursorHeader");
    }

    if (props.column.sortable) {
      result.push("ColonneTriable");
    }

    return result.join(" ");
  };

  return (
    <TableCell
      align={props.column?.align ? props.column?.align : "left"}
      sortDirection={props.orderBy === props.column.keys[0] ? orderTableCell : false}
      // A ajouter dans TableauHeader cell si besoin d'une classe générique:
      // className="HeaderColonneTableau"
      style={props.column?.style}
    >
      {props.column.getTitle ? (
        props.column.getTitle(props.dataBody)
      ) : (
        <TableSortLabel
          className={getClassNames()}
          active={props.column.sortable && props.orderBy === props.column.keys[0]}
          direction={props.orderBy === props.column.keys[0] ? orderTableLabel : "asc"}
          onClick={e => onClickCell(e, props.column.keys[0])}
          hideSortIcon={!props.column.sortable || props.orderBy !== props.column.keys[0]}
        >
          {getLibelle(props.column.title)}
        </TableSortLabel>
      )}
    </TableCell>
  );
};
