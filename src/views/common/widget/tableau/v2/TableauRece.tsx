import { TablePagination } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useCallback, useEffect } from "react";
import { Box } from "reakit/Box";
import { IParamsTableau } from "../../../util/GestionDesLiensApi";
import { getText } from "../../Text";
import {
  getPaginatedData,
  getSortOrder,
  laPageDAvantEstEnDehors,
  laProchainePageEstEnDehors,
  NB_LIGNES_PAR_APPEL,
  NB_LIGNES_PAR_PAGE,
  SortOrder
} from "../TableUtils";
import { TableauBody } from "./TableauBody";
import { TableauHeader } from "./TableauHeader";
import { TableauTypeColumn } from "./TableauTypeColumn";

export interface TableauReceProps {
  idKey: string;
  sortOrderByState?: string;
  sortOrderState?: SortOrder;
  columnHeaders: TableauTypeColumn[];
  dataState: any[];
  paramsTableau: IParamsTableau;
  canUseSignature?: boolean;
  handleChangeSort?: (tri: string, sens: SortOrder) => void;
  onClickOnLine: (id: string, data: any[], idxGlobal: number) => void;
  goToLink: (value: string) => void;
  handleReload?: () => void;
  nbLignesParPage?: number;
  resetTableau?: boolean;
  noRows?: JSX.Element;
  enChargement?: boolean;
}

export const TableauRece: React.FC<TableauReceProps> = props => {
  const paramsTableau = props.paramsTableau;
  const [rowsPerPageState] = React.useState(
    props.nbLignesParPage ? props.nbLignesParPage : NB_LIGNES_PAR_PAGE
  );
  const [pageState, setPageState] = React.useState(0);
  const [multiplicateur, setMultiplicateur] = React.useState(1);

  const handleColumnSort = (
    event: React.MouseEvent<unknown>,
    columnKey: string
  ) => {
    if (
      props.sortOrderByState &&
      props.sortOrderState &&
      props.handleChangeSort
    ) {
      setPageState(0);
      setMultiplicateur(1);
      props.handleChangeSort(
        columnKey,
        getSortOrder(columnKey, props.sortOrderByState, props.sortOrderState)
      );
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (
      laProchainePageEstEnDehors(
        newPage,
        pageState,
        rowsPerPageState,
        multiplicateur
      ) &&
      paramsTableau.nextDataLinkState
    ) {
      setMultiplicateur(multiplicateur + 1);
      props.goToLink(paramsTableau.nextDataLinkState);
    } else if (
      laPageDAvantEstEnDehors(
        pageState,
        newPage,
        rowsPerPageState,
        multiplicateur
      ) &&
      paramsTableau.previousDataLinkState
    ) {
      setMultiplicateur(multiplicateur - 1);
      props.goToLink(paramsTableau.previousDataLinkState);
    }
    setPageState(newPage);
  };

  const reloadData = useCallback(
    (allRequestSigned: boolean) => {
      if (props.handleReload !== undefined) {
        props.handleReload();
      }

      if (allRequestSigned) {
        // Si toutes les requêtes de la page étaient à signer et qu'elles ont été signées alors on revient sur la page d'avant
        let newPageState = pageState;
        if (
          newPageState > 0 &&
          paramsTableau.nextDataLinkState === undefined &&
          newPageState - 1 * rowsPerPageState >= props.dataState.length
        ) {
          newPageState--;
        } else if (
          newPageState * rowsPerPageState >=
            props.dataState.length - rowsPerPageState &&
          paramsTableau.nextDataLinkState !== undefined
        ) {
          newPageState--;
        }
        setPageState(newPageState);
      }
    },
    [pageState, props, rowsPerPageState, paramsTableau]
  );

  const processData = useCallback(() => {
    const nbLignesParPage = NB_LIGNES_PAR_APPEL;
    return getPaginatedData(
      props.dataState,
      pageState,
      rowsPerPageState,
      nbLignesParPage / rowsPerPageState
    );
  }, [props.dataState, pageState, rowsPerPageState]);

  const [dataBody, setdataBody] = React.useState<any[]>(processData());

  useEffect(() => {
    if (props.resetTableau) {
      setPageState(0);
    }
    setdataBody(processData());
  }, [props.dataState, processData, props.resetTableau]);

  function onClickOnLine(identifiant: string, idxOnePage: number) {
    const idxDataState = pageState * rowsPerPageState + idxOnePage;
    props.onClickOnLine(identifiant, props.dataState, idxDataState);
  }

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
            onClickOnLine={onClickOnLine}
            noRows={props.noRows}
            enChargement={props.enChargement}
          />
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPageState]}
        component="div"
        count={paramsTableau.rowsNumberState || 0}
        rowsPerPage={rowsPerPageState}
        labelRowsPerPage={getText("pagination.rowsPerPage", [
          getText("pagination.donneePaginee")
        ])}
        labelDisplayedRows={({ from, to, count }) =>
          getText("pagination.navigationLabel", [from, to, count])
        }
        page={
          pageState > 0 && paramsTableau.rowsNumberState === 0 ? 0 : pageState
        }
        onChangePage={handleChangePage}
        backIconButtonText={getText("pagination.pagePrecedente")}
        nextIconButtonText={getText("pagination.pageSuivante")}
      />
      <div className="ToolbarBottom">
        {props.children &&
          React.Children.map(props.children, (child: any) => {
            return React.cloneElement(child, {
              requetes: dataBody,
              reloadData
            });
          })}
      </div>
    </>
  );
};
