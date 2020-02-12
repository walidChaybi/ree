import React from "react";
import { Box } from "reakit/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { NatureActe } from "../../../model/requete/NatureActe";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { Text } from "../../common/widget/Text";
import moment from "moment";

// TODO mock à retirer
function createData(
  identifiant: string,
  typeRequete: TypeRequete,
  sousTypeRequete: SousTypeRequete,
  canalProvenance: CanalProvenance,
  natureActe: NatureActe,
  requerant: string,
  dateCreation: moment.Moment,
  dateStatut: moment.Moment,
  statutRequete: StatutRequete
) {
  return {
    identifiant,
    typeRequete,
    sousTypeRequete,
    canalProvenance,
    natureActe,
    requerant,
    dateCreation,
    dateStatut,
    statutRequete
  };
}

// TODO mock à retirer
const data = [
  createData(
    "CSL23675",
    TypeRequete.Delivrance,
    SousTypeRequete.DelivranceDemat,
    CanalProvenance.DALI,
    NatureActe.Mariage,
    "Xavi Miro",
    moment(),
    moment(),
    StatutRequete.ASigner
  ),
  createData(
    "ACQY23677",
    TypeRequete.Delivrance,
    SousTypeRequete.DelivranceCourrier,
    CanalProvenance.DALI,
    NatureActe.Naissance,
    "Joan Miro",
    moment(),
    moment(),
    StatutRequete.ASigner
  ),
  createData(
    "COL23678",
    TypeRequete.Delivrance,
    SousTypeRequete.DelivranceDemat,
    CanalProvenance.DALI,
    NatureActe.Deces,
    "Jaume Miro",
    moment(),
    moment(),
    StatutRequete.ASigner
  )
];

export const RequeteTableau: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Box as={Table} role="presentation" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Text messageId={"pages.requetes.tableau.header.identifiant"} />
            </TableCell>
            <TableCell align="center">
              <Text
                messageId={"pages.requetes.tableau.header.sousTypeRequete"}
              />
            </TableCell>
            <TableCell align="center">
              <Text
                messageId={"pages.requetes.tableau.header.canalProvenance"}
              />
            </TableCell>
            <TableCell align="center">
              <Text messageId={"pages.requetes.tableau.header.natureActe"} />
            </TableCell>
            <TableCell align="center">
              <Text messageId={"pages.requetes.tableau.header.requerant"} />
            </TableCell>
            <TableCell align="center">
              <Text messageId={"pages.requetes.tableau.header.dateCreation"} />
            </TableCell>
            <TableCell align="center">
              <Text messageId={"pages.requetes.tableau.header.dateStatut"} />
            </TableCell>
            <TableCell align="center">
              <Text messageId={"pages.requetes.tableau.header.statutRequete"} />
            </TableCell>
            <TableCell align="center">
              <Text
                messageId={"pages.requetes.tableau.header.prioriteRequete"}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.identifiant}>
              <TableCell align="center">{row.identifiant}</TableCell>
              <TableCell align="center">
                <Text
                  messageId={`referentiel.sousTypeRequete.${row.sousTypeRequete}`}
                />
              </TableCell>
              <TableCell align="center">
                <Text
                  messageId={`referentiel.canalProvenance.${row.canalProvenance}`}
                />
              </TableCell>
              <TableCell align="center">
                <Text messageId={`referentiel.natureActe.${row.natureActe}`} />
              </TableCell>
              <TableCell align="center">{row.requerant}</TableCell>
              <TableCell align="center">
                {row.dateCreation.format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center">
                {row.dateStatut.format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center">
                <Text
                  messageId={`referentiel.statutRequete.${row.statutRequete}`}
                />
              </TableCell>
              <TableCell align="center">TODO</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Box>
    </TableContainer>
  );
};
