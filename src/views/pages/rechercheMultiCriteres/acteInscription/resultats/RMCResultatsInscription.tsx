import React, { useCallback, useState } from "react";
import {
  TableauRece,
  TableauTypeColumn
} from "../../../../common/widget/tableau/TableauRece";
import { IDataTableau } from "../../../../common/util/GestionDesLiensApi";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  goToLinkRMC
} from "./RMCResultatsCommun";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { TypeFiche } from "../../../../../model/etatcivil/enum/TypeFiche";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { HeaderTableauRMCInscription } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";

export interface RMCResultatInscriptionProps {
  dataRMCInscription: IResultatRMCInscription[];
  dataTableauRMCInscription: IDataTableau;
  setRangeInscription?: (range: string) => void;
  resetTableauInscription?: boolean;
}

const NB_INSCRIPTION_PAR_PAGE = 5;

const columnsTableau = [
  ...commonHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.NumeroRef],
    colLibelle: "N° Réf."
  }),
  ...natureHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Type],
    colLibelle: "Type"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Statut],
    colLibelle: "Statut fiche"
  })
];

export const RMCResultatsInscription: React.FC<RMCResultatInscriptionProps> = ({
  dataRMCInscription,
  dataTableauRMCInscription,
  setRangeInscription,
  resetTableauInscription
}) => {
  // Gestion du tableau
  const rowsNumberState = dataTableauRMCInscription?.rowsNumberState
    ? dataTableauRMCInscription?.rowsNumberState
    : 0;
  const nextDataLinkState = dataTableauRMCInscription?.nextDataLinkState
    ? dataTableauRMCInscription?.nextDataLinkState
    : "";
  const previousDataLinkState = dataTableauRMCInscription?.previousDataLinkState
    ? dataTableauRMCInscription?.previousDataLinkState
    : "";

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeInscription) {
        setRangeInscription(range);
      }
    },
    [setRangeInscription]
  );

  // Gestion de la Fenêtre
  const [etatFenetres, setEtatFenetres] = useState<string[]>([]);

  const closeFenetre = (idInscription: string) => {
    const tableau = [...etatFenetres];
    const index = tableau.indexOf(idInscription);
    tableau.splice(index, 1);
    setEtatFenetres(tableau);
  };

  const onClickOnLine = (idInscription: string, data: any) => {
    const tableau = [...etatFenetres];
    if (tableau.indexOf(idInscription) === -1) {
      tableau.push(idInscription);
      setEtatFenetres(tableau);
    }
  };

  return (
    <>
      <TableauRece
        idKey={"idInscription"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsTableau}
        dataState={dataRMCInscription}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        previousDataLinkState={previousDataLinkState}
        goToLink={goToLink}
        nbLignesParPage={NB_INSCRIPTION_PAR_PAGE}
        resetTableau={resetTableauInscription}
      />

      {etatFenetres && etatFenetres.length > 0 && (
        <>
          {etatFenetres.map(idInscription => {
            return (
              <FenetreFiche
                identifiant={idInscription}
                categorie={
                  getCategorieFiche(
                    idInscription,
                    dataRMCInscription
                  ) as TypeFiche
                }
                onClose={closeFenetre}
                key={`fiche${idInscription}`}
              />
            );
          })}
        </>
      )}
    </>
  );
};

function getCategorieFiche(
  id: string,
  data: IResultatRMCInscription[]
): string {
  let categorie = "";
  data.forEach(repertoire => {
    if (repertoire.typeInscription && repertoire.idInscription === id) {
      categorie = repertoire.typeInscription;
    }
  });
  return categorie;
}
