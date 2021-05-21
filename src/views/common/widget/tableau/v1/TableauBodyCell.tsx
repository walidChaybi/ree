import React from "react";
import TableCell from "@material-ui/core/TableCell";
import "./scss/Tableau.scss";
import "../../../../../scss/_library.scss";
import { TableauTypeColumn } from "./TableauRece";
import { getValeurOuVide } from "../../../util/Utils";
import { getText } from "../../Text";

interface TableauBodyCellProps {
  column: TableauTypeColumn;
  valueAtKey?: any;
}

export const TableauBodyCell: React.FC<TableauBodyCellProps> = ({
  column,
  valueAtKey
}) => {
  const dataCell =
    column.rowLibelle != null
      ? getText(`${column.rowLibelle}.${valueAtKey}`)
      : valueAtKey;

  const dataTitle = column.dataIsArray ? formaterData(dataCell) : dataCell;

  return (
    <TableCell
      // A ajouter dans TableauHeader cell si besoin d'une classe générique:
      // className="ColonneTableau"
      className={
        column?.className
          ? `TableauFontBody ${column.className}`
          : "TableauFontBody"
      }
      style={column?.style}
      align={column?.align ? column?.align : "left"}
      title={
        column?.className && column?.className.indexOf("ColOverflow") !== -1
          ? dataTitle
          : undefined
      }
    >
      {column.dataIsArray
        ? getValeursCellule(dataCell)
        : getValeurOuVide(dataCell)}
    </TableCell>
  );
};

function formaterData(datas: any[]) {
  let data: string = "";
  datas.forEach((d: any, i: number) => {
    if (i === 0) {
      data = d;
    } else if (d != null) {
      data = `${data}\n${d}`;
    }
  });
  return data;
}

function getValeursCellule(datas: any[]): JSX.Element {
  return (
    <>
      {datas.map((d: any, index: number) => {
        return <div key={`valeur-${index}`}>{d}</div>;
      })}
    </>
  );
}
