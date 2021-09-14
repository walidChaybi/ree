import TableCell from "@material-ui/core/TableCell";
import React from "react";
import "../../../../../scss/_library.scss";
import { getValeurOuVide } from "../../../util/Utils";
import "./scss/Tableau.scss";
import { TableauTypeColumn } from "./TableauTypeColumn";

interface TableauBodyCellProps {
  column: TableauTypeColumn;
  valueAtKey?: any;
}

export const TableauBodyCell: React.FC<TableauBodyCellProps> = ({
  column,
  valueAtKey
}) => {
  const dataTitle = column.dataIsArray ? formaterData(valueAtKey) : valueAtKey;

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
        ? getValeursCellule(valueAtKey)
        : getValeurOuVide(valueAtKey)}
    </TableCell>
  );
};

export function formaterData(datas: any[]) {
  let data = "";
  datas.forEach((d: any, i: number) => {
    if (i === 0) {
      data = d;
    } else if (d != null) {
      data = `${data}\n${d}`;
    }
  });
  return data;
}

export function getValeursCellule(datas: any[]): JSX.Element {
  return (
    <>
      {datas.map((d: any, index: number) => {
        return <div key={`valeur-${index}`}>{d}</div>;
      })}
    </>
  );
}
