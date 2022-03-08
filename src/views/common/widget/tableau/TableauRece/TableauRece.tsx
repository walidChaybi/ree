import { TablePagination } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useCallback, useEffect } from "react";
import { Box } from "reakit/Box";
import { IParamsTableau } from "../../../util/GestionDesLiensApi";
import { getLibelle } from "../../../util/Utils";
import {
  getPaginatedData,
  getSortOrder,
  laPageDAvantEstEnDehors,
  laProchainePageEstEnDehors,
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
  nbLignesParPage: number;
  nbLignesParAppel: number;
  resetTableau?: boolean;
  noRows?: JSX.Element;
  enChargement?: boolean;
}

export const TableauRece: React.FC<TableauReceProps> = props => {
  const paramsTableau = props.paramsTableau;
  const [pageState, setPageState] = React.useState(0);
  const [multiplicateur, setMultiplicateur] = React.useState(1);

  const processData = useCallback(
    (data: any[], page: number) => {
      const nbPages = props.nbLignesParAppel / props.nbLignesParPage;
      return getPaginatedData(data, page, props.nbLignesParPage, nbPages);
    },
    [props.nbLignesParPage, props.nbLignesParAppel]
  );

  // Contenu réellement affiché par ex: 15 lignes (contrairement à props.dataState qui contient toutes les données récupérées du serveur par ex 105 lignes)
  const [dataBody, setdataBody] = React.useState<any[]>(
    processData(props.dataState, pageState)
  );

  useEffect(() => {
    let page = pageState;
    if (props.resetTableau) {
      page = 0;
      setMultiplicateur(1);
    }
    setPageState(page);
    setdataBody(processData(props.dataState, page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataState, pageState, props.resetTableau]);

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
        props.nbLignesParPage,
        props.nbLignesParAppel,
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
        props.nbLignesParPage,
        props.nbLignesParAppel,
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
          newPageState - 1 * props.nbLignesParPage >= props.dataState.length
        ) {
          newPageState--;
        } else if (
          newPageState * props.nbLignesParPage >=
            props.dataState.length - props.nbLignesParPage &&
          paramsTableau.nextDataLinkState !== undefined
        ) {
          newPageState--;
        }
        setPageState(newPageState);
      }
    },
    [pageState, props, paramsTableau]
  );

  function onClickOnLine(identifiant: string, idxOnePage: number) {
    const idxDataState = pageState * props.nbLignesParPage + idxOnePage;
    props.onClickOnLine(identifiant, props.dataState, idxDataState);
  }

  // Obligatoire pour les styles qui sont chargés dynamiquement lorsque le tableau est dans une fenetre externe
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    window.top.dispatchEvent(event);
  }, []);

  return (
    <div className="TableauRece">
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
        rowsPerPageOptions={[props.nbLignesParPage]}
        component="div"
        count={paramsTableau.rowsNumberState || 0}
        rowsPerPage={props.nbLignesParPage}
        labelDisplayedRows={({ from, to, count }) =>
          getLibelle(`${from}-${to} sur ${count}`)
        }
        page={
          pageState > 0 && paramsTableau.rowsNumberState === 0 ? 0 : pageState
        }
        onPageChange={handleChangePage}
        backIconButtonText={getLibelle("Page précédente")}
        nextIconButtonText={getLibelle("Page suivante")}
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
    </div>
  );
};
