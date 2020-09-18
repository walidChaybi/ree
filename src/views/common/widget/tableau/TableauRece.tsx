import React, { useEffect, useCallback } from "react";
import { Box } from "reakit/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { SortOrder, getPaginatedData } from "./TableUtils";
import { TableauHeader } from "./TableauHeader";
import { TablePagination } from "@material-ui/core";
import { getText } from "../Text";
import { TableauBody } from "./TableauBody";
import { IDataTable } from "../../../pages/requete/MesRequetesPage";
import { BoutonSignature } from "../../../pages/requete/BoutonSignature";

export const nbRequeteParAppel = 105;

export interface RequeteTableauHeaderProps {
  idKey: string;
  sortOrderByState: string;
  sortOrderState: SortOrder;
  columnHeaders: TableauTypeColumn[];
  dataState: IDataTable[];
  rowsNumberState: number;
  nextDataLinkState: string;
  canUseSignature?: boolean;
  previousDataLinkState: string;
  handleChangeSort: (tri: string, sens: SortOrder) => void;
  onClickOnLine: (id: string) => string;
  goToLink: (value: string) => void;
  handleReload?: () => void;
}

export class TableauTypeColumn {
  public keys: string[];
  public getTextRefentiel: boolean;
  public colLibelle: string;
  public rowLibelle?: string;
  public getIcon?: (value: any, selectedValue?: string) => JSX.Element;

  constructor(
    keys: string[],
    getTextRefentiel: boolean,
    colLibelle: string,
    rowLibelle?: string,
    getIcon?: (value: any, selectedValue?: string) => JSX.Element
  ) {
    this.keys = keys;
    this.getTextRefentiel = getTextRefentiel;
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

export const TableauRece: React.FC<RequeteTableauHeaderProps> = (props) => {
  const nbRequetParPage = 15;
  const [rowsPerPageState, setRowsPerPageState] = React.useState(
    nbRequetParPage
  );
  const [pageState, setPageState] = React.useState(0);
  const [multiplicateur, setMultiplicateur] = React.useState(1);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    setPageState(0);
    setMultiplicateur(1);
    props.handleChangeSort(
      property,
      getSortOrder(property, props.sortOrderByState, props.sortOrderState)
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (
      newPage > pageState &&
      newPage * rowsPerPageState >= nbRequeteParAppel * multiplicateur &&
      !(pageState * rowsPerPageState > nbRequeteParAppel * multiplicateur) &&
      props.nextDataLinkState
    ) {
      setMultiplicateur(multiplicateur + 1);
      props.goToLink(props.nextDataLinkState);
    } else if (
      newPage < pageState &&
      newPage * rowsPerPageState < nbRequeteParAppel * multiplicateur &&
      pageState * rowsPerPageState < nbRequeteParAppel * multiplicateur &&
      props.previousDataLinkState
    ) {
      setMultiplicateur(multiplicateur - 1);
      props.goToLink(props.previousDataLinkState);
    }
    setPageState(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageState(parseInt(event.target.value, 10));
    setPageState(0);
  };

  const processData = useCallback(() => {
    return getPaginatedData(
      props.dataState,
      pageState,
      rowsPerPageState,
      nbRequeteParAppel / nbRequetParPage
    );
  }, [props.dataState, pageState, rowsPerPageState]);

  const reloadData = (allRequestSigned: boolean) => {
    if (props.handleReload !== undefined) {
      props.handleReload();
    }
    let newPageState = pageState;

    if (
      newPageState > 0 &&
      props.nextDataLinkState === undefined &&
      newPageState - 1 * rowsPerPageState >= props.dataState.length
    ) {
      newPageState--;
    }
    if (
      allRequestSigned &&
      newPageState * rowsPerPageState >=
        props.dataState.length - rowsPerPageState &&
      props.nextDataLinkState !== undefined
    ) {
      newPageState--;
    }
    setPageState(newPageState);
  };

  const [dataBody, setdataBody] = React.useState<IDataTable[]>(processData());

  useEffect(() => {
    setdataBody(processData());
  }, [props.dataState, processData]);

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
            data={dataBody}
            idKey={props.idKey}
            columnHeaders={props.columnHeaders}
            onClickOnLine={props.onClickOnLine}
          />
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[nbRequetParPage]}
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
      {props.canUseSignature === true && (
        <div className="RequetesToolbarSignature">
          <BoutonSignature
            libelle={"pages.delivrance.action.signature"}
            requetes={dataBody}
            reloadData={reloadData}
          />
        </div>
      )}
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
