import React from "react";
import TableCell from "@material-ui/core/TableCell";
import "./scss/Tableau.scss";
import "../../../../scss/_library.scss";
import { TableauTypeColumn } from "./TableauRece";
import { getValeurOuVide } from "../../util/Utils";

interface TableauBodyCellProps {
  data: any;
  column?: TableauTypeColumn;
  formater?: (data: any) => string;
}

export const TableauBodyCell: React.FC<TableauBodyCellProps> = ({
  data,
  column,
  formater
}) => {
  const dataToDisplay = formater ? formater(data) : data;

  return (
    <TableCell
      // A ajouter dans TableauHeader cell si besoin d'une classe générique:
      // className="ColonneTableau"
      className={`TableauFontBody${
        column?.className ? ` ${column.className}` : ""
      }`}
      style={column?.style}
      align={column?.align ? column?.align : "left"}
      title={
        column?.className?.indexOf("ColOverflow") !== -1
          ? dataToDisplay
          : undefined
      }
    >
      {getValeurOuVide(dataToDisplay)}
    </TableCell>
  );
};
