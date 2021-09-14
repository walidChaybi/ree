import TableCell from "@material-ui/core/TableCell";
import React from "react";
import "../../../../../scss/_library.scss";
import { getValeurOuVide } from "../../../util/Utils";
import { getText } from "../../Text";
// Utilisation des fonctions V2 pour éviter le code dupliqué (sera nettoyé lors de la fin de l'étape 1)
import { formaterData, getValeursCellule } from "../v2/TableauBodyCell";
import "./scss/Tableau.scss";
import { TableauTypeColumn } from "./TableauRece";

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
