import React from "react";
import { Box } from "reakit/Box";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { RequeteTableauBodyCell } from "./RequeteTableauBodyCell";
import { getText } from "../../common/widget/Text";
import { IDataTable } from "./RequeteTableauHeaderCell";
import { useHistory } from "react-router-dom";
import LabelIcon from "@material-ui/icons/Label";
import classNames from "classnames";
import moment from "moment";

import "./tableau/sass/Table.scss";
import "./sass/RequeteTableauBody.scss";
import { getAppUrl, MesRequetesUrl } from "../../router/UrlManager";

interface RequeteTableauBodyProps {
  data: IDataTable[];
}

export const RequeteTableauBody: React.FC<RequeteTableauBodyProps> = ({
  data
}) => {
  const history = useHistory();

  function onClickRequeteHandler(identifiantRequete: string) {
    history.push(`${getAppUrl(MesRequetesUrl)}/${identifiantRequete}`, {
      data
    });
  }

  return (
    <>
      <TableBody>
        {data.map(row => (
          <TableRow
            key={row.idSagaDila}
            onClick={() => onClickRequeteHandler(row.idRequete)}
            data-testid={row.idSagaDila}
          >
            <RequeteTableauBodyCell data={row.idSagaDila} />
            <RequeteTableauBodyCell
              data={getText(
                `referentiel.sousTypeRequete.${row.sousTypeRequete}`
              )}
            />
            <RequeteTableauBodyCell
              data={getText(`referentiel.canal.${row.canal}`)}
            />
            <RequeteTableauBodyCell
              data={getText(`referentiel.natureActe.${row.natureActe}`)}
            />
            <RequeteTableauBodyCell data={row.requerant.nomOuRaisonSociale} />
            <RequeteTableauBodyCell data={row.dateCreation} />
            <RequeteTableauBodyCell data={row.dateStatut} />
            <RequeteTableauBodyCell
              data={getText(`referentiel.statutRequete.${row.statut}`)}
            />
            <TableCell align="center">
              <Box
                title={getMessagePrioriteDeLaRequete(row.dateStatut)}
                aria-label={getMessagePrioriteDeLaRequete(row.dateStatut)}
                aria-hidden={true}
              >
                <LabelIcon className={prioriteDeLaRequete(row.dateStatut)} />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

function prioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(moment(dateStatut, "DD/MM/YYYY"), "days");

  return classNames({
    PrioriteBasse: ecartEnJours <= 2,
    PrioriteMoyenne: ecartEnJours > 2 && ecartEnJours <= 5,
    PrioriteHaute: ecartEnJours > 5
  });
}

function getMessagePrioriteDeLaRequete(dateStatut: string): string {
  const ecartEnJours = moment().diff(moment(dateStatut, "DD/MM/YYYY"), "days");
  if (ecartEnJours <= 2) {
    return getText("pages.requetes.tableau.body.priorite.basse");
  } else if (ecartEnJours > 2 && ecartEnJours <= 5) {
    return getText("pages.requetes.tableau.body.priorite.moyenne");
  } else {
    return getText("pages.requetes.tableau.body.priorite.haute");
  }
}
