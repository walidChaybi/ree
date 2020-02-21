import React from "react";
import { Box } from "reakit/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { NatureActe } from "../../../model/requete/NatureActe";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { Text, getText } from "../../common/widget/Text";
import moment from "moment";
import { RequeteTableauHeader } from "./RequeteTableauHeader";
import { DataTable } from "./RequeteTableauHeaderCell";
import TablePagination from "@material-ui/core/TablePagination";
import { RequeteTableauBody } from "./RequeteTableauBody";
import { SortOrder } from "./tableau/TableUtils";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import { QualiteRequerant } from "../../../model/requete/QualiteRequerant";
import { SousQualiteRequerant } from "../../../model/requete/SousQualiteRequerant";
import { useRequeteApi } from "./RequeteHook";
import { BoutonSignature } from "./BoutonSignature";

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

export interface IRequerantApi {
  adresse: string;
  idRequerant: string;
  nomOuRaisonSociale: string;
  nomUsage: string;
  prenomUsage: string;
  qualiteRequerant: QualiteRequerant;
  requete: any;
  telephone: string;
  typeRequerant: SousQualiteRequerant;
}

export interface IRequeteApi {
  anneeEvenement: number;
  dateCreation: number;
  dateDerniereMaj: number;
  dateStatut: number;
  idRequete: string;
  idSagaDila: number;
  jourEvenement: number;
  moisEvenement: number;
  natureActe: NatureActe;
  nbExemplaire: number;
  paysEvenement: string;
  picesJustificatives: any;
  provenance: CanalProvenance;
  reponses: any;
  requerant: IRequerantApi;
  sousTypeRequete: SousTypeRequete;
  statut: StatutRequete;
  titulaires: any;
  typeActe: any;
  typeRequete: TypeRequete;
  villeEvenement: "string;";
}

export const RequeteTableau: React.FC = () => {
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("asc");
  const [sortOrderByState, setSortOrderByState] = React.useState<DataTable>(
    "dateStatut"
  );
  const [rowsPerPageState, setRowsPerPageState] = React.useState(20);
  const [pageState, setPageState] = React.useState(0);
  const { dataState = [], errorState } = useRequeteApi();

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

  return (
    <>
      <Toolbar>
        <div className="RequetesToolbar">
          <div className="RequetesToolbarTitre">
            <h3 id="TableauRequetesTitre">
              <Text messageId="pages.requetes.tableau.titre" />
            </h3>
          </div>
          <div className="RequetesToolbarSignature">
            <BoutonSignature />
          </div>
        </div>
      </Toolbar>
      <TableContainer component={Paper}>
        <Box as={Table} role="presentation" size="small">
          <RequeteTableauHeader
            order={sortOrderState}
            orderBy={sortOrderByState}
            onRequestSort={handleRequestSort}
          />
          <RequeteTableauBody data={dataState} />
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={dataState.length}
        rowsPerPage={rowsPerPageState}
        labelRowsPerPage={getText("pagination.rowsPerPage", [
          getText("pages.requetes.tableau.pagination.donneePaginee")
        ])}
        page={pageState}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <BoutonRetour />
    </>
  );
};
