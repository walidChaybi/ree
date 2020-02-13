import React from "react";
import TableCell from "@material-ui/core/TableCell";
import "../../../sass/_library.scss";

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
    <TableCell className="tableauFontBody" align="center">
      {dataToDisplay}
    </TableCell>
  );
};
