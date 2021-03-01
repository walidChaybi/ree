import React, { useCallback, useState } from "react";

import {
  TableauRece,
  TableauTypeColumn
} from "../../../common/widget/tableau/TableauRece";
import { HeaderTableauRMCActe } from "../../../../model/rmc/HeaderTableauRMC";
import { IDataTableau } from "../../../common/util/GestionDesLiensApi";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  goToLinkRMC
} from "./RMCResultatsCommun";
import { FenetreFiche } from "../../fiche/FenetreFiche";
import { IResultatRMCActe } from "../../../../model/rmc/resultat/IResultatRMCActe";
import { TypeFiche } from "../../../../model/etatcivil/enum/TypeFiche";
export interface RMCResultatActeProps {
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IDataTableau;
  setRangeActe?: (range: string) => void;
  resetTableauActe?: boolean;
}

const NB_ACTE_PAR_PAGE = 10;

const columnsTableau = [
  ...commonHeadersTableauRMC,
  ...natureHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCActe.Registre],
    colLibelle: "Registre"
  })
];

export const RMCResultatsActe: React.FC<RMCResultatActeProps> = ({
  dataRMCActe,
  dataTableauRMCActe,
  setRangeActe,
  resetTableauActe
}) => {
  // Gestion du tableau
  const rowsNumberState = dataTableauRMCActe?.rowsNumberState
    ? dataTableauRMCActe?.rowsNumberState
    : 0;
  const nextDataLinkState = dataTableauRMCActe?.nextDataLinkState
    ? dataTableauRMCActe?.nextDataLinkState
    : "";
  const previousDataLinkState = dataTableauRMCActe?.previousDataLinkState
    ? dataTableauRMCActe?.previousDataLinkState
    : "";

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeActe) {
        setRangeActe(range);
      }
    },
    [setRangeActe]
  );

  // Gestion de la Fenêtre
  const [etatFenetres, setEtatFenetres] = useState<string[]>([]);

  const closeFenetre = (idActe: string) => {
    const tableau = [...etatFenetres];
    const index = tableau.indexOf(idActe);
    tableau.splice(index, 1);
    setEtatFenetres(tableau);
  };

  const onClickOnLine = (idActe: string, data: any) => {
    const tableau = [...etatFenetres];
    if (tableau.indexOf(idActe) === -1) {
      tableau.push(idActe);
      setEtatFenetres(tableau);
    }
  };

  return (
    <>
      <TableauRece
        idKey={"idActe"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsTableau}
        dataState={dataRMCActe}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        previousDataLinkState={previousDataLinkState}
        goToLink={goToLink}
        nbLignesParPage={NB_ACTE_PAR_PAGE}
        resetTableau={resetTableauActe}
      />

      {etatFenetres && etatFenetres.length > 0 && (
        <>
          {etatFenetres.map((idActe: string, index: number) => {
            return (
              <FenetreFiche
                identifiant={idActe}
                categorie={TypeFiche.ACTE}
                toClose={closeFenetre}
                key={`fiche${idActe}${index}`}
              />
            );
          })}
        </>
      )}
    </>
  );
};
