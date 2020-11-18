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
import { BoutonSignature } from "../signature/BoutonSignature";

export const NB_LIGNES_PAR_APPEL = 105;

export interface RequeteTableauHeaderProps {
  idKey: string;
  sortOrderByState: string;
  sortOrderState: SortOrder;
  columnHeaders: TableauTypeColumn[];
  dataState: any[];
  rowsNumberState: number;
  nextDataLinkState: string;
  canUseSignature?: boolean;
  previousDataLinkState: string;
  handleChangeSort: (tri: string, sens: SortOrder) => void;
  onClickOnLine: (id: string) => string;
  goToLink: (value: string) => void;
  handleReload?: () => void;
}

type alignType = "left" | "center" | "right" | "justify" | "inherit";
export interface ITableauTypeColumnParam {
  keys: string[];
  colLibelle: string;
  getTextRefentiel?: boolean;
  align?: alignType;
  style?: React.CSSProperties;
  width?: string | number;
  rowLibelle?: string;
  getIcon?: (value: any, selectedValue?: string) => JSX.Element;
}

export class TableauTypeColumn {
  public keys: string[];
  public colLibelle: string;
  public getTextRefentiel?: boolean;
  public align?: alignType;
  public style?: React.CSSProperties;
  public width?: string | number;
  public rowLibelle?: string;
  public getIcon?: (value: any, selectedValue?: string) => JSX.Element;

  constructor(params: ITableauTypeColumnParam) {
    this.keys = params.keys;
    this.colLibelle = params.colLibelle;
    this.getTextRefentiel = params.getTextRefentiel;
    this.align = params.align;
    this.style = params.style;
    this.width = params.width;
    this.rowLibelle = params.rowLibelle;
    this.getIcon = params.getIcon;
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
  const nbRequetParPage = 15;
  const [rowsPerPageState, setRowsPerPageState] = React.useState(
    nbRequetParPage
  );
  const [pageState, setPageState] = React.useState(0);
  const [multiplicateur, setMultiplicateur] = React.useState(1);

  const handleColumnSort = (
    event: React.MouseEvent<unknown>,
    columnKey: string
  ) => {
    setPageState(0);
    setMultiplicateur(1);
    props.handleChangeSort(
      columnKey,
      getSortOrder(columnKey, props.sortOrderByState, props.sortOrderState)
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (
      laProchainePageEstEnDehors(
        newPage,
        pageState,
        rowsPerPageState,
        multiplicateur
      ) &&
      props.nextDataLinkState
    ) {
      setMultiplicateur(multiplicateur + 1);
      props.goToLink(props.nextDataLinkState);
    } else if (
      laPageDAvantEstEnDehors(
        pageState,
        newPage,
        rowsPerPageState,
        multiplicateur
      ) &&
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
      NB_LIGNES_PAR_APPEL / nbRequetParPage
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

  const [dataBody, setdataBody] = React.useState<any[]>(processData());

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
            onRequestSort={handleColumnSort}
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
          getText("pagination.donneePaginee")
        ])}
        labelDisplayedRows={({ from, to, count }) =>
          getText("pagination.navigationLabel", [from, to, count])
        }
        page={pageState > 0 && props.rowsNumberState === 0 ? 0 : pageState}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        backIconButtonText={getText("pagination.pagePrecedente")}
        nextIconButtonText={getText("pagination.pageSuivante")}
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

/**
 * Regarde si la page d'après qui va s'afficher est en dehors des données stockée actuellement dans props.dataState
 * Si c'est le cas il faudra refaire un appel serveur
 */
function laProchainePageEstEnDehors(
  newPage: number,
  pageState: number,
  rowsPerPageState: number,
  multiplicateur: number
) {
  return (
    newPage > pageState &&
    newPage * rowsPerPageState >= NB_LIGNES_PAR_APPEL * multiplicateur &&
    !(pageState * rowsPerPageState > NB_LIGNES_PAR_APPEL * multiplicateur)
  );
}

/**
 * Regarde si la page d'avant qui va s'afficher est en dehors des données stockée actuellement dans props.dataState
 * Si c'est le cas il faudra refaire un appel serveur
 */
function laPageDAvantEstEnDehors(
  pageState: number,
  newPage: number,
  rowsPerPageState: number,
  multiplicateur: number
) {
  return (
    pageState > 0 &&
    newPage < pageState &&
    // La numérotation des pages commence à zéro donc c'est newPage+1 qu'il faut tester (= pageState car newPage < pageState)
    pageState * rowsPerPageState <= NB_LIGNES_PAR_APPEL * (multiplicateur - 1)
  );
}

function getSortOrder(
  columnKey: string,
  sortOrderBy: string,
  sortOrder: SortOrder
): SortOrder {
  let result: SortOrder = "ASC";
  if (sortOrderBy !== columnKey) {
    result = "ASC";
  } else if (sortOrder === "ASC") {
    result = "DESC";
  } else if (sortOrder === "DESC") {
    result = "ASC";
  }
  return result;
}
