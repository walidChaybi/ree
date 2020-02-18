import React from "react";
import TableCell from "@material-ui/core/TableCell";
import "../../../sass/_library.scss";
import { Link } from "react-router-dom";

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
    <TableCell className="tableauFontBody" align="center">
      {identifiant !== null && identifiant !== undefined
        ? renderWithLink(dataToDisplay, identifiant)
        : dataToDisplay}
    </TableCell>
  );
};

function renderWithLink(dataToDisplay: any, identifiant: string): JSX.Element {
  return <Link to={`/requete/${identifiant}`}>{dataToDisplay}</Link>;
}
