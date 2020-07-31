import React from "react";
import { Box } from "reakit/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { SortOrder, getPaginatedData, processDataStorting } from "./TableUtils";
import { TableauHeader } from "./TableauHeader";
import { TablePagination } from "@material-ui/core";
import { getText } from "../Text";
import { TableauBody } from "./TableauBody";
import { IDataTable } from "../../../pages/requete/MesRequetesPage";

export interface RequeteTableauHeaderProps {
  idKey: string;
  sortOrderByState: string;
  sortOrderState: SortOrder;
  columnHeaders: TableauTypeColumn[];
  dataState: IDataTable[];
  rowsNumberState: number;
  nextDataLinkState: string;
  setSortOrderState: (order: SortOrder) => void;
  setSortOrderByState: (order: string) => void;
  onClickOnLine: (id: string) => string;
  goToLink: (value: string) => void;
}

export class TableauTypeColumn {
  public keys: string[];
  public getText: boolean;
  public colLibelle: string;
  public rowLibelle?: string;
  public getIcon?: (value: any, selectedValue?: string) => JSX.Element;

  constructor(
    keys: string[],
    getText: boolean,
    colLibelle: string,
    rowLibelle?: string,
    getIcon?: (value: any, selectedValue?: string) => JSX.Element
  ) {
    this.keys = keys;
    this.getText = getText;
    this.rowLibelle = rowLibelle;
    this.colLibelle = colLibelle;
    this.getIcon = getIcon;
  }

  public getValueAtKey(object: any): any {
    let value = { ...object };
    for (const key of this.keys) {
      if (value !== undefined) {
        value = value[key];
      }
    }

    return value;
  }
}

export const TableauRece: React.FC<RequeteTableauHeaderProps> = props => {
  const [rowsPerPageState, setRowsPerPageState] = React.useState(15);
  const [pageState, setPageState] = React.useState(0);
  const [multiplicateur, setMultiplicateur] = React.useState(1);
  const [dataTable, setDataTable] = React.useState<IDataTable[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    props.setSortOrderState(
      getSortOrder(property, props.sortOrderByState, props.sortOrderState)
    );
    props.setSortOrderByState(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (
      newPage > pageState &&
      newPage * rowsPerPageState > 100 * multiplicateur &&
      !(pageState * rowsPerPageState > 100 * multiplicateur) &&
      props.nextDataLinkState
    ) {
      setMultiplicateur(multiplicateur + 1);
      props.goToLink(props.nextDataLinkState);
    }
    setPageState(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageState(parseInt(event.target.value, 10));
    setPageState(0);
  };

  function processData() {
    if (
      props.dataState !== undefined &&
      props.dataState.length > 0 &&
      dataTable[dataTable.length - 1] !==
        props.dataState[props.dataState.length - 1]
    ) {
      setDataTable([...dataTable, ...props.dataState]);
    }

    if (props.rowsNumberState && props.rowsNumberState < 100) {
      const dataTriee = processDataStorting(
        props.dataState || [],
        props.sortOrderState,
        props.sortOrderByState
      );
      return getPaginatedData(dataTriee, pageState, rowsPerPageState);
    } else {
      return getPaginatedData(dataTable, pageState, rowsPerPageState);
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Box as={Table} role="presentation" size="small">
          <TableauHeader
            order={props.sortOrderState}
            orderBy={props.sortOrderByState}
            onRequestSort={handleRequestSort}
            columnHeaders={props.columnHeaders}
          />
          <TableauBody
            data={processData()}
            idKey={props.idKey}
            columnHeaders={props.columnHeaders}
            onClickOnLine={props.onClickOnLine}
          />
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15]}
        component="div"
        count={props.rowsNumberState || 0}
        rowsPerPage={rowsPerPageState}
        labelRowsPerPage={getText("pagination.rowsPerPage", [
          getText(
            "pages.delivrance.mesRequetes.tableau.pagination.donneePaginee"
          )
        ])}
        labelDisplayedRows={({ from, to, count }) =>
          getText(
            "pages.delivrance.mesRequetes.tableau.pagination.navigationLabel",
            [from, to, count]
          )
        }
        page={pageState > 0 && props.rowsNumberState === 0 ? 0 : pageState}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

function getSortOrder(
  property: string,
  sortOrderBy: string,
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
