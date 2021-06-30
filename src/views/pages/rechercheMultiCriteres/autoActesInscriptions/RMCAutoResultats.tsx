import React from "react";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import { RMCActeInscriptionResultats } from "../acteInscription/resultats/RMCActeInscriptionResultats";

export interface RMCAutoResultatsProps {
  dataRequete: TRequete;
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
  onClickCheckboxTableauActes: (
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void;
  onClickCheckboxTableauInscriptions: (
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void;
}

export const RMCAutoResultats: React.FC<RMCAutoResultatsProps> = props => {
  return (
    <>
      {props.dataRMCAutoActe &&
        props.dataTableauRMCAutoActe &&
        props.dataRMCAutoInscription &&
        props.dataTableauRMCAutoInscription && (
          <RMCActeInscriptionResultats
            typeRMC="Auto"
            dataRequete={props.dataRequete}
            dataRMCActe={props.dataRMCAutoActe}
            dataTableauRMCActe={props.dataTableauRMCAutoActe}
            dataRMCInscription={props.dataRMCAutoInscription}
            dataTableauRMCInscription={props.dataTableauRMCAutoInscription}
            onClickCheckboxTableauActes={props.onClickCheckboxTableauActes}
            onClickCheckboxTableauInscriptions={
              props.onClickCheckboxTableauInscriptions
            }
          />
        )}
    </>
  );
};
