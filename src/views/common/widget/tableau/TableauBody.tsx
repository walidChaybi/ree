import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableauBodyCell } from "./TableauBodyCell";
import { getText } from "../Text";
import { useHistory } from "react-router-dom";
import { TableauTypeColumn } from "./TableauRece";

import "./sass/Tableau.scss";
import "./sass/TableauBody.scss";

interface TableauBodyProps {
  data: any[];
  idKey: string;
  columnHeaders: TableauTypeColumn[];
  onClickOnLine: (identifiant: string) => string;
}

export const TableauBody: React.FC<TableauBodyProps> = ({
  data,
  idKey,
  columnHeaders,
  onClickOnLine
}) => {
  const history = useHistory();

  function onClickRowHandler(identifiant: string) {
    history.push(onClickOnLine(identifiant), {
      data
    });
  }

  return (
    <>
      <TableBody>
        {data.map((row: any, idx: number) => (
          <TableRow
            key={row[idKey]}
            onClick={() => onClickRowHandler(row[idKey])}
            data-testid={row[idKey]}
          >
            {getRowRender(columnHeaders, row, idx)}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

function getRowRender(
  columnHeaders: TableauTypeColumn[],
  row: any,
  idx: number
): JSX.Element[] {
  const tableauBodyCellList = [];

  for (const column of columnHeaders) {
    if (column.getTextRefentiel === true) {
      tableauBodyCellList.push(
        <TableauBodyCell
          key={`row-${idx}-${column.keys[0]}`}
          data={getText(`${column.rowLibelle}.${column.getValueAtKey(row)}`)}
          column={column}
        />
      );
    } else if (column.getIcon !== undefined) {
      tableauBodyCellList.push(
        <TableCell
          style={column.style}
          width={column?.width}
          align={column?.align ? column?.align : "center"}
          key={`row-${idx}-${column.keys[0]}`}
        >
          {column.getIcon(row)}
        </TableCell>
      );
    } else {
      tableauBodyCellList.push(
        <TableauBodyCell
          key={`row-${idx}-${column.keys[0]}`}
          data={column.getValueAtKey(row)}
          column={column}
        />
      );
    }
  }

  return tableauBodyCellList;
}
