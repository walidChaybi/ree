import React from "react";
import TableCell from "@material-ui/core/TableCell";
import "./sass/Tableau.scss";
import "../../../../sass/_library.scss";

interface TableauBodyCellProps {
  data: any;
  formater?: (data: any) => string;
}

export const TableauBodyCell: React.FC<TableauBodyCellProps> = ({
  data,
  formater,
}) => {
  const dataToDisplay = formater ? formater(data) : data;

  return (
    <TableCell className="tableauFontBody ColonneTableau" align="center">
      {dataToDisplay}
    </TableCell>
  );
};
