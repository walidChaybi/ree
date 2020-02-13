import React from "react";
import { Box } from "reakit/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { NatureActe } from "../../../model/requete/NatureActe";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { getText } from "../../common/widget/Text";
import moment from "moment";
import { RequeteTableauHeader } from "./RequeteTableauHeader";
import { DataTable } from "./RequeteTableauHeaderCell";
import TablePagination from "@material-ui/core/TablePagination";
import { RequeteTableauBody } from "./RequeteTableauBody";
import { SortOrder, stableSort, getComparator } from "./tableau/TableUtils";

// TODO mock à retirer
// La gestion du requerant est provisoire, l'api retournera un objet structuré
// et non une chaine de caractères

export interface RequeteData {
  identifiant: string;
  typeRequete: TypeRequete;
  sousTypeRequete: SousTypeRequete;
  canalProvenance: CanalProvenance;
  natureActe: NatureActe;
  requerant: string;
  dateCreation: moment.Moment;
  dateStatut: moment.Moment;
  statutRequete: StatutRequete;
}

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
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("desc");
  const [sortOrderByState, setSortOrderByState] = React.useState<DataTable>(
    "dateStatut"
  );
  const [rowsPerPageState, setRowsPerPageState] = React.useState(20);
  const [pageState, setPageState] = React.useState(0);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: DataTable
  ) => {
    const isAsc = sortOrderByState === property && sortOrderState === "asc";
    setSortOrderState(isAsc ? "desc" : "asc");
    setSortOrderByState(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageState(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageState(parseInt(event.target.value, 10));
    setPageState(0);
  };

  function getDataForBodyTable() {
    const bodyData = data.map(requete => {
      return {
        identifiant: requete.identifiant,
        typeRequete: requete.typeRequete,
        sousTypeRequete: requete.sousTypeRequete,
        canalProvenance: requete.canalProvenance,
        natureActe: requete.natureActe,
        requerant: requete.requerant,
        dateCreation: requete.dateCreation.format("DD/MM/YYYY"),
        dateStatut: requete.dateStatut.format("DD/MM/YYYY"),
        statutRequete: requete.statutRequete,
        prioriteRequete: "TODO"
      };
    });
    return stableSort(
      bodyData,
      getComparator(sortOrderState, sortOrderByState)
    ).slice(
      pageState * rowsPerPageState,
      pageState * rowsPerPageState + rowsPerPageState
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Box as={Table} role="presentation" size="small">
          <RequeteTableauHeader
            order={sortOrderState}
            orderBy={sortOrderByState}
            onRequestSort={handleRequestSort}
          />
          <RequeteTableauBody data={getDataForBodyTable()} />
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPageState}
        labelRowsPerPage={getText("pagination.rowsPerPage", [
          getText("pages.requetes.tableau.pagination.donneePaginee")
        ])}
        page={pageState}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
