import React from "react";
import TableCell from "@material-ui/core/TableCell";
import "./sass/Tableau.scss";
import "../../../../sass/_library.scss";
import { TableauTypeColumn } from "./TableauRece";

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
      className="tableauFontBody"
      style={column?.style}
      width={column?.width}
      align={column?.align ? column?.align : "left"}
      title={column?.style ? dataToDisplay : undefined}
    >
      {dataToDisplay}
    </TableCell>
  );
};
