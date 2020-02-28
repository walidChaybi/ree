import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import "../../../sass/_library.scss";
import "../requete/sass/RequeteTableau.scss";

interface RequeteTableauBodyCellProps {
  data: any;
  formater?: (data: any) => string;
}

export const RequeteTableauBodyCell: React.FC<RequeteTableauBodyCellProps> = ({
  data,
  formater
}) => {
  const dataToDisplay = formater ? formater(data) : data;

  return (
    <TableCell className="tableauFontBody ColonneTableauRequete" align="center">
      {dataToDisplay}
    </TableCell>
  );
};
