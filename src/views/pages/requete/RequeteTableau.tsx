import React from "react";
import { Box } from "reakit/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import {
  SortOrder,
  getPaginatedData,
  processDataStorting
} from "./tableau/TableUtils";
import { DataTable } from "./RequeteTableauHeaderCell";
import {
  useRequeteApi,
  IQueryParametersPourRequetes
} from "./DonneesRequeteHook";
import { BoutonSignature } from "./BoutonSignature";
import { RequeteTableauHeader } from "./RequeteTableauHeader";
import { RequeteTableauBody } from "./RequeteTableauBody";
import { TablePagination } from "@material-ui/core";
import { Text, getText } from "../../common/widget/Text";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { IDataTable } from "./RequeteTableauHeaderCell";
import officier from "../../../api/mock/officier.json";

export const RequeteTableau: React.FC = () => {
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("ASC");
  const [sortOrderByState, setSortOrderByState] = React.useState<DataTable>(
    "dateStatut"
  );
  const [rowsPerPageState, setRowsPerPageState] = React.useState(15);
  const [pageState, setPageState] = React.useState(0);
  const [multiplicateur, setMultiplicateur] = React.useState(1);
  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
    nomOec: officier.nom,
    prenomOec: officier.prenom,
    statut: StatutRequete.ASigner,
    tri: sortOrderByState,
    sens: sortOrderState
  });
  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = ""
  } = useRequeteApi(linkParameters);
  const [dataTable, setDataTable] = React.useState<IDataTable[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: DataTable
  ) => {
    setSortOrderState(getSortOrder(property, sortOrderByState, sortOrderState));
    setSortOrderByState(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (
      newPage > pageState &&
      newPage * rowsPerPageState > 100 * multiplicateur &&
      !(pageState * rowsPerPageState > 100 * multiplicateur) &&
      nextDataLinkState
    ) {
      setMultiplicateur(multiplicateur + 1);
      goToLink(nextDataLinkState);
    }
    setPageState(newPage);
  };

  function goToLink(link: string) {
    let queryParameters: IQueryParametersPourRequetes;
    if (link.indexOf("range") > 0) {
      let params = [];
      params = link.split("requetes?")[1].split("&");
      queryParameters = {
        nomOec: params[0].split("=")[1],
        prenomOec: params[1].split("=")[1],
        statut: params[2].split("=")[1] as StatutRequete,
        tri: params[3].split("=")[1],
        sens: params[4].split("=")[1] as SortOrder,
        range: params[5].split("=")[1]
      };
      setLinkParameters(queryParameters);
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageState(parseInt(event.target.value, 10));
    setPageState(0);
  };

  function processData() {
    if (
      dataState.length > 0 &&
      dataTable[dataTable.length - 1] !== dataState[dataState.length - 1]
    ) {
      setDataTable([...dataTable, ...dataState]);
    }
    if (rowsNumberState && rowsNumberState < 100) {
      const dataTriee = processDataStorting(
        dataTable,
        sortOrderState,
        sortOrderByState
      );
      return getPaginatedData(dataTriee, pageState, rowsPerPageState);
    } else {
      return getPaginatedData(dataTable, pageState, rowsPerPageState);
    }
  }

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
            <BoutonSignature libelle={"pages.requetes.action.signature"} />
          </div>
        </div>
      </Toolbar>
      <TableContainer
        component={Paper}
        aria-label={getText("pages.requetes.tableau.label")}
      >
        <Box as={Table} role="presentation" size="small">
          <RequeteTableauHeader
            order={sortOrderState}
            orderBy={sortOrderByState}
            onRequestSort={handleRequestSort}
          />
          <RequeteTableauBody data={processData()} />
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 20, 30]}
        component="div"
        count={rowsNumberState}
        rowsPerPage={rowsPerPageState}
        labelRowsPerPage={getText("pagination.rowsPerPage", [
          getText("pages.requetes.tableau.pagination.donneePaginee")
        ])}
        labelDisplayedRows={({ from, to, count }) =>
          getText("pages.requetes.tableau.pagination.navigationLabel", [
            from,
            to,
            count
          ])
        }
        page={pageState > 0 && rowsNumberState === 0 ? 0 : pageState}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <BoutonRetour />
    </>
  );
};

function getSortOrder(
  property: DataTable,
  sortOrderBy: DataTable,
  sortOrder: SortOrder
): SortOrder {
  let result: SortOrder = "ASC";
  if (sortOrderBy !== property) {
    result = "ASC";
  } else if (sortOrder === "ASC") {
    result = "DESC";
  } else if (sortOrder === "DESC") {
    result = "ASC";
  }
  return result;
}
