import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { RequeteData } from "./RequeteTableau";
import { RequeteTableauBodyCell } from "./RequeteTableauBodyCell";
import { getText } from "../../common/widget/Text";

interface RequeteTableauBodyProps {
  data: RequeteData[];
}

export const RequeteTableauBody: React.FC<RequeteTableauBodyProps> = ({
  data
}) => {
  return (
    <>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.identifiant}>
            <RequeteTableauBodyCell data={row.identifiant} />
            <RequeteTableauBodyCell
              data={`referentiel.sousTypeRequete.${row.sousTypeRequete}`}
            />
            <RequeteTableauBodyCell
              data={`referentiel.canalProvenance.${row.canalProvenance}`}
            />
            <RequeteTableauBodyCell
              data={getText(`referentiel.natureActe.${row.natureActe}`)}
            />
            <RequeteTableauBodyCell data={row.requerant} />
            <RequeteTableauBodyCell
              data={row.dateCreation.format("DD/MM/YYYY")}
            />
            <RequeteTableauBodyCell
              data={row.dateStatut.format("DD/MM/YYYY")}
            />
            <RequeteTableauBodyCell
              data={getText(`referentiel.statutRequete.${row.statutRequete}`)}
            />
            <TableCell align="center">TODO</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
