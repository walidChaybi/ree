import React from "react";
import { IAlerte } from "../../../../../model/etatcivil/fiche/IAlerte";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { BoutonAjouterRMC } from "../../../apercuRequete/apercuRequeteEnpriseEnCharge/contenu/BoutonAjouterRMC";
import "../scss/RMCActeInscriptionResultats.scss";
import { RMCTableauActes } from "./RMCTableauActes";
import { TypeRMC } from "./RMCTableauCommun";
import { RMCTableauInscriptions } from "./RMCTableauInscriptions";

export interface RMCActeInscriptionResultatsProps {
  typeRMC: TypeRMC;
  dataAlertes?: IAlerte[];
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
  enableBoutonAjouterRMC?: boolean;
}

export const RMCActeInscriptionResultats: React.FC<RMCActeInscriptionResultatsProps> = props => {
  return (
    <div className={`ResultatsRMC${props.typeRMC}`}>
      <Fieldset titre={getLibelle("Résultats de la recherche multi-critères")}>
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>{getLibelle("Recherche dans les registres")}</span>
          </div>
          <RMCTableauActes
            typeRMC={props.typeRMC}
            dataAlertes={props.dataAlertes}
            dataRMCActe={props.dataRMCActe}
            dataTableauRMCActe={props.dataTableauRMCActe}
            setRangeActe={props.setRangeActe}
            resetTableauActe={props.resetRMC}
            onClickCheckboxCallBack={props.onClickCheckboxTableauActes}
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
            typeRMC={props.typeRMC}
            dataRequete={props.dataRequete}
            dataRMCInscription={props.dataRMCInscription}
            dataTableauRMCInscription={props.dataTableauRMCInscription}
            setRangeInscription={props.setRangeInscription}
            resetTableauInscription={props.resetRMC}
            onClickCheckboxCallBack={props.onClickCheckboxTableauInscriptions}
          />
        </div>
        {props.enableBoutonAjouterRMC ? (
          <BoutonAjouterRMC
            libelle={getLibelle("Ajouter une recherche multicritères")}
          />
        ) : null}
      </Fieldset>
    </div>
  );
};
