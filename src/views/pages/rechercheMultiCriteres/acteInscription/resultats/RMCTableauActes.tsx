import React, { useCallback, useState } from "react";

import {
  TableauRece,
  TableauTypeColumn
} from "../../../../common/widget/tableau/TableauRece";
import { HeaderTableauRMCActe } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
import { IDataTableau } from "../../../../common/util/GestionDesLiensApi";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  goToLinkRMC
} from "./RMCTableauCommun";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { TypeFiche } from "../../../../../model/etatcivil/enum/TypeFiche";
import { getValeurOuVide } from "../../../../common/util/Utils";

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
    title: "Registre"
  })
];

export const RMCTableauActes: React.FC<RMCResultatActeProps> = ({
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

  const closeFenetre = (idActe: string, idx: number) => {
    const tableau = [...etatFenetres];
    if (tableau[idx] === idActe) {
      tableau[idx] = "";
      setEtatFenetres(tableau);
    }
  };

  const onClickOnLine = (idActe: string, data: any, idx: number) => {
    const tableau = [...etatFenetres];
    if (tableau[idx] !== idActe) {
      tableau[idx] = idActe;
      setEtatFenetres(tableau);
    }
  };

  const datasFiches = dataRMCActe.map(data => ({
    identifiant: getValeurOuVide(data.idActe),
    categorie: TypeFiche.ACTE
  }));

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
              idActe &&
              idActe !== "" && (
                <FenetreFiche
                  key={`fiche${idActe}${index}`}
                  identifiant={idActe}
                  categorie={TypeFiche.ACTE}
                  datasFiches={datasFiches}
                  index={index}
                  onClose={closeFenetre}
                />
              )
            );
          })}
        </>
      )}
    </>
  );
};
