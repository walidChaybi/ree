import React from "react";
import { Box } from "reakit/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { NatureActe } from "../../../model/requete/NatureActe";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { Text } from "../../common/widget/Text";
import moment from "moment";
import { RequeteTableauHeader } from "./RequeteTableauHeader";
import { DataTable, SortOrder } from "./RequeteTableauHeaderCell";

// TODO mock à retirer
// La gestion du requerant est provisoire, l'api retournera un objet structuré
// et non une chaine de caractères

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
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("asc");
  const [sortOrderByState, setSortOrderByState] = React.useState<DataTable>(
    "dateStatut"
  );
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: DataTable
  ) => {
    const isAsc = sortOrderByState === property && sortOrderState === "asc";
    setSortOrderState(isAsc ? "desc" : "asc");
    setSortOrderByState(property);
  };

  return (
    <TableContainer component={Paper}>
      <Box as={Table} role="presentation" size="small">
        <RequeteTableauHeader
          order={sortOrderState}
          orderBy={sortOrderByState}
          onRequestSort={handleRequestSort}
        />
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
