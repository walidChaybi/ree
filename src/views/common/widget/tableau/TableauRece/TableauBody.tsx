import CircularProgress from "@mui/material/CircularProgress";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { chiffreEstPair } from "@util/Utils";
import React, { useMemo } from "react";
import { TableauBodyCell } from "./TableauBodyCell";
import { IconeParams } from "./TableauRece";
import { TableauTypeColumn } from "./TableauTypeColumn";
import "./scss/Tableau.scss";
import "./scss/TableauBody.scss";

interface TableauBodyProps {
  data: any[];
  idKey: string;
  columnHeaders: TableauTypeColumn[];
  onClickOnLine: (identifiant: string, idx: number) => void;
  messageAucunResultat?: JSX.Element;
  enChargement?: boolean;
  icone?: IconeParams;
  getRowClassName?: (data: any) => string;
}

export const TableauBody: React.FC<TableauBodyProps> = ({
  data,
  idKey,
  columnHeaders,
  onClickOnLine,
  messageAucunResultat,
  enChargement,
  icone,
  getRowClassName
}) => {
  const onClickRowHandler = (identifiant: string, idx: number) => {
    onClickOnLine(identifiant, idx);
  };

  const contenuCellule = useMemo(() => {
    if (enChargement) {
      return <CircularProgress className="spinner" />;
    } else if (messageAucunResultat) {
      return messageAucunResultat;
    }
    return <></>;
  }, [enChargement, messageAucunResultat]);

  return (
    <>
      <TableBody>
        {data.length > 0 ? (
          data.map((row: any, idx: number) => {
            return (
              <TableRow
                key={`${row[idKey]}${idx}`}
                onClick={(e: any) => {
                  onClickRowHandler(row[idKey], idx);
                }}
                data-testid={row[idKey]}
                className={(getRowClassName && getRowClassName(row)) ?? `${chiffreEstPair(idx) ? "lignePaire" : "ligneImpaire"}`}
              >
                {getRowRender(columnHeaders, row, idx, icone)}
              </TableRow>
            );
          })
        ) : (
          <TableRow className={messageAucunResultat && "ligneVide"}>
            <TableCell
              align="center"
              colSpan={columnHeaders.length}
            >
              {contenuCellule}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

const getRowRender = (columnHeaders: TableauTypeColumn[], row: any, idx: number, icone?: IconeParams): JSX.Element[] => {
  const tableauBodyCellList = [];

  for (const column of columnHeaders) {
    const valueAtKey = column.getValueAtKey(row);

    if (column.getElement !== undefined) {
      tableauBodyCellList.push(
        <TableCell
          style={column.style}
          align={column?.align ? column?.align : "center"}
          key={`row-${idx}-${column.keys.join("-")}`}
        >
          {column.getElement(row)}
        </TableCell>
      );
    } else {
      let iconeAAfficher = <></>;
      if (column.keys[0] === icone?.keyColonne) {
        iconeAAfficher = icone.getIcone(row.idRequete, row.sousType, row.idUtilisateur, row.statut);
      }
      tableauBodyCellList.push(
        <TableauBodyCell
          key={`row-${idx}-${column.keys.join("-")}`}
          valueAtKey={valueAtKey}
          column={column}
        >
          {iconeAAfficher}
        </TableauBodyCell>
      );
    }
  }

  return tableauBodyCellList;
};
