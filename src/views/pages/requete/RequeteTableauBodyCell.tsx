import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import "../../../sass/_library.scss";
import "../requete/sass/RequeteTableau.scss";

interface RequeteTableauBodyCellProps {
  data: any;
  formater?: (data: any) => string;
  identifiant?: string;
}

export const RequeteTableauBodyCell: React.FC<RequeteTableauBodyCellProps> = ({
  data,
  formater,
  identifiant
}) => {
  const dataToDisplay = formater ? formater(data) : data;

  return (
    <TableCell className="tableauFontBody ColonneTableauRequete" align="center">
      {identifiant !== null && identifiant !== undefined
        ? renderWithLink(dataToDisplay, identifiant)
        : dataToDisplay}
    </TableCell>
  );
};

function renderWithLink(dataToDisplay: any, identifiant: string): JSX.Element {
  return <Link to={`/requete/${identifiant}`}>{dataToDisplay}</Link>;
}
