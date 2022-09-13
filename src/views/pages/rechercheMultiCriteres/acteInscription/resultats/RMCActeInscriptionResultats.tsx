import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { TRequete } from "@model/requete/IRequete";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import React from "react";
import "../scss/RMCActeInscriptionResultats.scss";
import { RMCTableauActes } from "./RMCTableauActes";
import { TypeRMC } from "./RMCTableauCommun";
import { RMCTableauInscriptions } from "./RMCTableauInscriptions";

export interface RMCActeInscriptionResultatsProps {
  typeRMC: TypeRMC;
  dataAlertes?: IAlerte[];
  ajoutAlertePossible?: boolean;
  dataRequete?: TRequete;
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  dataRMCInscription: IResultatRMCInscription[];
  dataTableauRMCInscription: IParamsTableau;
  setRangeActe?: (range: string) => void;
  setRangeInscription?: (range: string) => void;
  resetRMC?: boolean;
  onClickCheckboxTableauActes?: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void;
  onClickCheckboxTableauInscriptions?: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void;
  nbLignesParPageActe: number;
  nbLignesParAppelActe: number;
  nbLignesParPageInscription: number;
  nbLignesParAppelInscription: number;
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

export const RMCActeInscriptionResultats: React.FC<
  RMCActeInscriptionResultatsProps
> = ({
  typeRMC,
  dataAlertes,
  ajoutAlertePossible = false,
  dataRequete,
  dataRMCActe,
  dataTableauRMCActe,
  dataRMCInscription,
  dataTableauRMCInscription,
  setRangeActe,
  setRangeInscription,
  resetRMC,
  onClickCheckboxTableauActes,
  onClickCheckboxTableauInscriptions,
  nbLignesParPageActe,
  nbLignesParAppelActe,
  nbLignesParPageInscription,
  nbLignesParAppelInscription,
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
    <div className={`ResultatsRMC${typeRMC}`}>
      <Fieldset titre={getLibelle("Résultats de la recherche multi-critères")}>
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>
              {getLibelle("Recherche dans les registres d'état civil")}
            </span>
          </div>
          <RMCTableauActes
            typeRMC={typeRMC}
            dataRequete={dataRequete}
            dataAlertes={dataAlertes}
            ajoutAlertePossible={ajoutAlertePossible}
            dataRMCActe={dataRMCActe}
            dataTableauRMCActe={dataTableauRMCActe}
            setRangeActe={setRangeActe}
            resetTableauActe={resetRMC}
            onClickCheckboxCallBack={onClickCheckboxTableauActes}
            nbLignesParPage={nbLignesParPageActe}
            nbLignesParAppel={nbLignesParAppelActe}
            getLignesSuivantesOuPrecedentesActe={
              getLignesSuivantesOuPrecedentesActe
            }
            idFicheActe={idFicheActe}
            dataRMCFicheActe={dataRMCFicheActe}
            dataTableauRMCFicheActe={dataTableauRMCFicheActe}
          />
        </div>
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>
              {getLibelle(
                "Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger"
              )}
            </span>
          </div>
          <RMCTableauInscriptions
            typeRMC={typeRMC}
            dataRequete={dataRequete}
            dataRMCInscription={dataRMCInscription}
            dataTableauRMCInscription={dataTableauRMCInscription}
            setRangeInscription={setRangeInscription}
            resetTableauInscription={resetRMC}
            onClickCheckboxCallBack={onClickCheckboxTableauInscriptions}
            nbLignesParPage={nbLignesParPageInscription}
            nbLignesParAppel={nbLignesParAppelInscription}
            getLignesSuivantesOuPrecedentesInscription={
              getLignesSuivantesOuPrecedentesInscription
            }
            idFicheInscription={idFicheInscription}
            dataRMCFicheInscription={dataRMCFicheInscription}
            dataTableauRMCFicheInscription={dataTableauRMCFicheInscription}
          />
        </div>
      </Fieldset>
    </div>
  );
};
