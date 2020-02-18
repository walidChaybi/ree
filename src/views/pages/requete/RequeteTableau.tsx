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
    "CSL23671",
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
    "ACQY23672",
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
    "COL23673",
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
    "COL23674",
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
    "COL23675",
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
    "COL23676",
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
    "COL23677",
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
    "COL23679",
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
    "COL23680",
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
    "COL23681",
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
    "COL23682",
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
    "COL23683",
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
    "COL23684",
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
    "COL23685",
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
    "COL23686",
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
    "COL23687",
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
    "COL23688",
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
    "COL23689",
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
    "COL23690",
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
    "COL23691",
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
    "COL23692",
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
    "COL23693",
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
    "COL23694",
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
    "COL23695",
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
    "COL23696",
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
    "COL23697",
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
    "COL23698",
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
    "COL23699",
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
    "COL23700",
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
    "COL23701",
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
    "COL23702",
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
    "COL23703",
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
    "COL23704",
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
    "COL23705",
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
    "COL23706",
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
    "COL23707",
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
    "COL23708",
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
    "COL23709",
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
    "COL23710",
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
    "COL23711",
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
    "COL23712",
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
    "COL23713",
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
    "COL23714",
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
    "COL23715",
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
    "COL23716",
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
    "COL23717",
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
    "COL23718",
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
    "COL23719",
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
    "COL23720",
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
    "COL23721",
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
    const result = stableSort(
      bodyData,
      getComparator(sortOrderState, sortOrderByState)
    ).slice(
      pageState * rowsPerPageState,
      pageState * rowsPerPageState + rowsPerPageState
    );
    return result;
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
