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
import { useRequeteApi } from "./RequeteHook";
import { BoutonSignature } from "./BoutonSignature";
import { RequeteTableauHeader } from "./RequeteTableauHeader";
import { RequeteTableauBody } from "./RequeteTableauBody";
import { TablePagination } from "@material-ui/core";
import { Text, getText } from "../../common/widget/Text";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import { StatutRequete } from "../../../model/requete/StatutRequete";

export const RequeteTableau: React.FC = () => {
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("asc");
  const [sortOrderByState, setSortOrderByState] = React.useState<DataTable>(
    "dateStatut"
  );
  const [rowsPerPageState, setRowsPerPageState] = React.useState(20);
  const [pageState, setPageState] = React.useState(0);
  const {
    dataState = [],
    rowsNumberState = 0,
    previousDataLinkState,
    nextDataLinkState,
    minRangeState = 0,
    maxRangeState = 0,
    errorState
  } = useRequeteApi({
    nomOec: "Garisson",
    prenomOec: "Juliette",
    statut: StatutRequete.ASigner,
    tri: sortOrderByState,
    sens: sortOrderState
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: DataTable
  ) => {
    setSortOrderState(getSortOrder(property, sortOrderByState, sortOrderState));
    setSortOrderByState(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    // TODO pagination server
    // if (newPage > pageState && maxRangeState < pageState * rowsPerPageState) {
    //   // TODO call api next
    // }
    // if (newPage < pageState && minRangeState > pageState * rowsPerPageState) {
    //   // TODO call api prev
    // }
    setPageState(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageState(parseInt(event.target.value, 10));
    setPageState(0);
  };

  function processData() {
    if (rowsNumberState && rowsNumberState < 100) {
      const dataTriee = processDataStorting(
        dataState,
        sortOrderState,
        sortOrderByState
      );
      return getPaginatedData(dataTriee, pageState, rowsPerPageState);
    } else {
      return getPaginatedData(dataState, pageState, rowsPerPageState);
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
          <RequeteTableauBody data={processData()} />
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rowsNumberState}
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

function getSortOrder(
  property: DataTable,
  sortOrderBy: DataTable,
  sortOrder: SortOrder
): SortOrder {
  let result: SortOrder = "asc";
  if (sortOrderBy !== property) {
    result = "asc";
  } else if (sortOrder === "asc") {
    result = "desc";
  } else if (sortOrder === "desc") {
    result = "asc";
  }
  return result;
}
