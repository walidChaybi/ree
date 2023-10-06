import { TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getLibelle } from "@util/Utils";
import React, { useCallback, useEffect } from "react";
import { Box } from "reakit/Box";
import {
  getItemAriaLabel,
  getPaginatedData,
  getSortOrder,
  laPageDAvantEstEnDehors,
  laProchainePageEstEnDehors,
  SortOrder
} from "../TableUtils";
import { TableauBody } from "./TableauBody";
import { TableauHeader } from "./TableauHeader";
import { TableauTypeColumn } from "./TableauTypeColumn";

export interface IconeParams {
  keyColonne: string;
  getIcone: (
    id: string,
    sousType: string,
    idUtilisateur: string,
    statut?: string
  ) => JSX.Element;
}

export interface TableauReceProps {
  idKey: string;
  sortOrderByState?: string;
  sortOrderState?: SortOrder;
  columnHeaders: TableauTypeColumn[];
  dataState: any[];
  paramsTableau: IParamsTableau;
  canUseSignature?: boolean;
  icone?: IconeParams;
  handleChangeSort?: (tri: string, sens: SortOrder) => void;
  onClickOnLine: (id: string, data: any[], idxGlobal: number) => void;
  goToLink?: (value: string) => void;
  handleReload?: () => void;
  nbLignesParPage: number;
  nbLignesParAppel: number;
  resetTableau?: boolean;
  noRows?: JSX.Element;
  enChargement?: boolean;
  stickyHeader?: boolean;
  getRowClassName?: (data: any) => string;
  onChangementDePage?: () => void;
  afficheBoutonsNavigationRapide?: boolean;
}

export const TableauRece: React.FC<TableauReceProps> = props => {
  const paramsTableau = props.paramsTableau;
  const [pageState, setPageState] = React.useState(0);
  const [multiplicateur, setMultiplicateur] = React.useState(1);

  const nbPages = props.nbLignesParAppel / props.nbLignesParPage;

  const estTableauPagine = useCallback(() => {
    return props.nbLignesParPage !== -1;
  }, [props.nbLignesParPage]);

  const processData = useCallback(
    (data: any[], page: number) => {
      return estTableauPagine()
        ? getPaginatedData(data, page, props.nbLignesParPage, nbPages)
        : data;
    },
    [props.nbLignesParPage, nbPages, estTableauPagine]
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
      props.goToLink &&
      laProchainePageEstEnDehors(
        newPage,
        pageState,
        props.nbLignesParPage,
        props.nbLignesParAppel,
        multiplicateur
      ) &&
      paramsTableau.nextDataLinkState
    ) {
      setMultiplicateur(Number(multiplicateur) + 1);
      props.goToLink(paramsTableau.nextDataLinkState);
    } else if (
      props.goToLink &&
      laPageDAvantEstEnDehors(
        pageState,
        newPage,
        props.nbLignesParPage,
        props.nbLignesParAppel,
        multiplicateur
      ) &&
      paramsTableau.previousDataLinkState
    ) {
      setMultiplicateur(Number(multiplicateur) - 1);
      props.goToLink(paramsTableau.previousDataLinkState);
    }
    setPageState(newPage);
    props.onChangementDePage && props.onChangementDePage();
  };

  const reloadData = useCallback(
    (allRequestSigned: boolean) => {
      if (props.handleReload !== undefined) {
        props.handleReload();
      }

      if (allRequestSigned && pageState > 0) {
        // Si toutes les requêtes de la page étaient à signer et qu'elles ont été signées alors on revient sur la page d'avant
        let newPageState = pageState;
        if (
          (paramsTableau.nextDataLinkState === undefined &&
            newPageState - 1 * props.nbLignesParPage >=
              props.dataState.length) ||
          (newPageState * props.nbLignesParPage >=
            props.dataState.length - props.nbLignesParPage &&
            paramsTableau.nextDataLinkState !== undefined)
        ) {
          newPageState--;
        }
        setPageState(newPageState);
      }
    },
    [pageState, props, paramsTableau]
  );

  function onClickOnLine(identifiant: string, idxOnePage: number) {
    const idxDataState = estTableauPagine()
      ? (pageState % nbPages) * props.nbLignesParPage + idxOnePage
      : idxOnePage;
    props.onClickOnLine(identifiant, props.dataState, idxDataState);
  }

  // Obligatoire pour les styles qui sont chargés dynamiquement lorsque le tableau est dans une fenetre externe
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  return (
    <div className="TableauRece">
      <TableContainer component={Paper}>
        <Box
          as={Table}
          role="presentation"
          size="small"
          stickyHeader={props.stickyHeader}
        >
          <TableauHeader
            order={props.sortOrderState}
            orderBy={props.sortOrderByState}
            onRequestSort={handleColumnSort}
            columnHeaders={props.columnHeaders}
            dataBody={dataBody}
          />
          <TableauBody
            data={dataBody}
            idKey={props.idKey}
            columnHeaders={props.columnHeaders}
            onClickOnLine={onClickOnLine}
            noRows={props.noRows}
            enChargement={props.enChargement}
            icone={props.icone}
            getRowClassName={props.getRowClassName}
          />
        </Box>
      </TableContainer>
      {estTableauPagine() && (
        <TablePagination
          rowsPerPageOptions={[props.nbLignesParPage]}
          component="div"
          count={paramsTableau.rowsNumberState || 0}
          rowsPerPage={props.nbLignesParPage}
          labelDisplayedRows={({ from, to, count }) =>
            getLibelle(`${from}-${to} sur ${count}`)
          }
          showFirstButton={props.afficheBoutonsNavigationRapide}
          showLastButton={props.afficheBoutonsNavigationRapide}
          page={
            pageState > 0 && paramsTableau.rowsNumberState === 0 ? 0 : pageState
          }
          onPageChange={handleChangePage}
          getItemAriaLabel={(type: string) =>
            getItemAriaLabel(type, paramsTableau.maxRangeState)
          }
        />
      )}
      <div className="ToolbarBottom">
        {props.children &&
          React.Children.map(props.children, (child: any) => {
            return React.cloneElement(child, {
              requetesASigner: dataBody.map(requete => ({
                requete,
                acte: undefined
              })),
              reloadData
            });
          })}
      </div>
    </div>
  );
};
