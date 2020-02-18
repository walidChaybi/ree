import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { RequeteTableauBodyCell } from "./RequeteTableauBodyCell";
import { getText } from "../../common/widget/Text";
import { IDataTable } from "./RequeteTableauHeaderCell";
import { useHistory } from "react-router-dom";
import "./tableau/sass/Table.scss";

interface RequeteTableauBodyProps {
  data: IDataTable[];
}

export const RequeteTableauBody: React.FC<RequeteTableauBodyProps> = ({
  data
}) => {
  const history = useHistory();

  function onClickRequeteHandler(identifiantRequete: string) {
    history.push(`/requetes/${identifiantRequete}`);
  }

  return (
    <>
      <TableBody>
        {data.map(row => (
          <TableRow
            key={row.identifiant}
            onClick={() => onClickRequeteHandler(row.identifiant)}
          >
            <RequeteTableauBodyCell data={row.identifiant} />
            <RequeteTableauBodyCell
              data={getText(
                `referentiel.sousTypeRequete.${row.sousTypeRequete}`
              )}
            />
            <RequeteTableauBodyCell
              data={getText(
                `referentiel.canalProvenance.${row.canalProvenance}`
              )}
            />
            <RequeteTableauBodyCell
              data={getText(`referentiel.natureActe.${row.natureActe}`)}
            />
            <RequeteTableauBodyCell data={row.requerant} />
            <RequeteTableauBodyCell data={row.dateCreation} />
            <RequeteTableauBodyCell data={row.dateStatut} />
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
