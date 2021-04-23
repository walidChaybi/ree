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
} from "./RMCTableauCommun";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import {
  TypeFiche,
  FicheUtil
} from "../../../../../model/etatcivil/enum/TypeFiche";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { HeaderTableauRMCInscription } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
import { Droit } from "../../../../../model/Droit";
import { officierALeDroitSurLePerimetre } from "../../../../../model/IOfficierSSOApi";
import { getValeurOuVide } from "../../../../common/util/Utils";

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
    title: "N° Réf."
  }),
  ...natureHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Type],
    title: "Type"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Statut],
    title: "Statut fiche"
  })
];

export const RMCTableauInscriptions: React.FC<RMCResultatInscriptionProps> = ({
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

  const closeFenetre = (idInscription: string, idx: number) => {
    const tableau = [...etatFenetres];
    if (tableau[idx] === idInscription) {
      tableau[idx] = "";
      setEtatFenetres(tableau);
    }
  };

  const onClickOnLine = (idInscription: string, data: any, idx: number) => {
    if (officierALeDroitSurLePerimetre(Droit.CONSULTER, "MEAE")) {
      const tableau = [...etatFenetres];
      if (tableau[idx] !== idInscription) {
        tableau[idx] = idInscription;
        setEtatFenetres(tableau);
      }
    }
  };

  const datasFiches = dataRMCInscription.map(data => ({
    identifiant: getValeurOuVide(data.idInscription),
    categorie: getCategorieFiche(data.idInscription, dataRMCInscription)
  }));

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
          {etatFenetres.map((idInscription: string, index: number) => {
            return (
              idInscription &&
              idInscription !== "" && (
                <FenetreFiche
                  key={`fiche${idInscription}${index}`}
                  identifiant={idInscription}
                  categorie={getCategorieFiche(
                    idInscription,
                    dataRMCInscription
                  )}
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

function getCategorieFiche(
  id: string,
  data: IResultatRMCInscription[]
): TypeFiche {
  let categorie = "";
  data.forEach(repertoire => {
    if (repertoire.typeInscription && repertoire.idInscription === id) {
      categorie = repertoire.typeInscription;
    }
  });
  return FicheUtil.getTypeFicheFromString(categorie);
}
