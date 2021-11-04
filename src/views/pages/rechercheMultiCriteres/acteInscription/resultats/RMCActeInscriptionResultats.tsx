import React from "react";
import { IAlerte } from "../../../../../model/etatcivil/fiche/IAlerte";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
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
}

export const RMCActeInscriptionResultats: React.FC<RMCActeInscriptionResultatsProps> = ({
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
  nbLignesParAppelInscription
}) => {
  return (
    <div className={`ResultatsRMC${typeRMC}`}>
      <Fieldset titre={getLibelle("Résultats de la recherche multi-critères")}>
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>{getLibelle("Recherche dans les registres")}</span>
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
          />
        </div>
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>
              {getLibelle(
                "Recherche dans les repertoires de greffe et registre des PACS étrangers"
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
          />
        </div>
      </Fieldset>
    </div>
  );
};
