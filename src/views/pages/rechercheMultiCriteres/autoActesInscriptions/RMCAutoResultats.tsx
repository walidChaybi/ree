import React from "react";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "../../../common/widget/tableau/v2/TableauPaginationConstantes";
import { RMCActeInscriptionResultats } from "../acteInscription/resultats/RMCActeInscriptionResultats";

export interface RMCAutoResultatsProps {
  dataAlertes: IAlerte[];
  ajoutAlertePossible: boolean;
  dataRequete: TRequete;
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
  onClickCheckboxTableauActes: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void;
  onClickCheckboxTableauInscriptions: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void;
  resetRMC?: boolean;
  setRangeActe?: (range: string) => void;
  setRangeInscription?: (range: string) => void;
  // Données propre à une fiche Acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
  idFicheActe?: string;
  dataRMCFicheActe?: IResultatRMCActe[];
  dataTableauRMCFicheActe?: IParamsTableau;
  // Données propre à une fiche Inscription pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesInscription?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
  idFicheInscription?: string;
  dataRMCFicheInscription?: IResultatRMCInscription[];
  dataTableauRMCFicheInscription?: IParamsTableau;
}

export const RMCAutoResultats: React.FC<RMCAutoResultatsProps> = ({
  dataAlertes,
  ajoutAlertePossible,
  dataRequete,
  dataRMCAutoActe,
  dataTableauRMCAutoActe,
  dataRMCAutoInscription,
  dataTableauRMCAutoInscription,
  onClickCheckboxTableauActes,
  onClickCheckboxTableauInscriptions,
  resetRMC,
  setRangeInscription,
  setRangeActe,
  // Données propre à une fiche Acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe,
  idFicheActe,
  dataRMCFicheActe,
  dataTableauRMCFicheActe,
  // Données propre à une fiche Inscription pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesInscription,
  idFicheInscription,
  dataRMCFicheInscription,
  dataTableauRMCFicheInscription
}) => {
  return (
    <>
      {dataRMCAutoActe &&
        dataTableauRMCAutoActe &&
        dataRMCAutoInscription &&
        dataTableauRMCAutoInscription && (
          <RMCActeInscriptionResultats
            typeRMC="Auto"
            dataAlertes={dataAlertes}
            ajoutAlertePossible={ajoutAlertePossible}
            dataRequete={dataRequete}
            dataRMCActe={dataRMCAutoActe}
            dataTableauRMCActe={dataTableauRMCAutoActe}
            dataRMCInscription={dataRMCAutoInscription}
            dataTableauRMCInscription={dataTableauRMCAutoInscription}
            onClickCheckboxTableauActes={onClickCheckboxTableauActes}
            onClickCheckboxTableauInscriptions={
              onClickCheckboxTableauInscriptions
            }
            resetRMC={resetRMC}
            setRangeInscription={setRangeInscription}
            setRangeActe={setRangeActe}
            nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
            nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
            nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
            nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
            getLignesSuivantesOuPrecedentesActe={
              getLignesSuivantesOuPrecedentesActe
            }
            idFicheActe={idFicheActe}
            dataRMCFicheActe={dataRMCFicheActe}
            dataTableauRMCFicheActe={dataTableauRMCFicheActe}
            getLignesSuivantesOuPrecedentesInscription={
              getLignesSuivantesOuPrecedentesInscription
            }
            idFicheInscription={idFicheInscription}
            dataRMCFicheInscription={dataRMCFicheInscription}
            dataTableauRMCFicheInscription={dataTableauRMCFicheInscription}
          />
        )}
    </>
  );
};
