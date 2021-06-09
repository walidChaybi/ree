import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { OperationLocaleEnCours } from "../../attente/OperationLocaleEnCours";
import "./scss/Tableau.scss";
import "./scss/TableauBody.scss";
import { TableauBodyCell } from "./TableauBodyCell";
import { TableauTypeColumn } from "./TableauTypeColumn";

interface TableauBodyProps {
  data: any[];
  idKey: string;
  columnHeaders: TableauTypeColumn[];
  onClickOnLine: (identifiant: string, idx: number) => void;
  noRows?: JSX.Element;
  enChargement?: boolean;
}

export const TableauBody: React.FC<TableauBodyProps> = ({
  data,
  idKey,
  columnHeaders,
  onClickOnLine,
  noRows,
  enChargement
}) => {
  function onClickRowHandler(identifiant: string, idx: number) {
    onClickOnLine(identifiant, idx);
  }

  return (
    <>
      <TableBody>
        {data.length > 0 ? (
          data.map((row: any, idx: number) => {
            return (
              <TableRow
                key={`${row[idKey]}${idx}`}
                onClick={() => onClickRowHandler(row[idKey], idx)}
                data-testid={row[idKey]}
              >
                {getRowRender(columnHeaders, row, idx)}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell align="center" colSpan={columnHeaders.length}>
              {enChargement ? (
                <OperationLocaleEnCours visible={true} />
              ) : noRows ? (
                noRows
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        )}
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
    const valueAtKey = column.getValueAtKey(row);

    if (column.getElement !== undefined) {
      tableauBodyCellList.push(
        <TableCell
          style={column.style}
          align={column?.align ? column?.align : "center"}
          key={`row-${idx}-${column.keys[0]}`}
        >
          {column.getElement(row, idx)}
        </TableCell>
      );
    } else {
      tableauBodyCellList.push(
        <TableauBodyCell
          key={`row-${idx}-${column.keys[0]}`}
          valueAtKey={valueAtKey}
          column={column}
        />
      );
    }
  }

  return tableauBodyCellList;
}
