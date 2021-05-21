/* istanbul ignore file */
// TODO à supprimer lors de l'implémentation de la page

import React from "react";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import { RMCActeInscriptionResultats } from "../acteInscription/resultats/RMCActeInscriptionResultats";

export interface RMCAutoResultatsProps {
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
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
            dataRMCActe={props.dataRMCAutoActe}
            dataTableauRMCActe={props.dataTableauRMCAutoActe}
            dataRMCInscription={props.dataRMCAutoInscription}
            dataTableauRMCInscription={props.dataTableauRMCAutoInscription}
          />
        )}
    </>
  );
};
