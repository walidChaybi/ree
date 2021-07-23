import React from "react";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { MenuDelivrer } from "./MenuDelivrer";
import { MenuReponseNegative } from "./MenuReponseNegative";
import "./scss/ChoixAction.scss";

export interface IActionProps {
  requete: TRequete;
  acteSelected?: IResultatRMCActe[];
  inscriptionSelected?: IResultatRMCInscription[];
}

export const ChoixAction: React.FC<IActionProps> = props => {
  return (
    <>
      <div className="bloc-choix-action">
        <div className="panel">Actions</div>
        <MenuDelivrer
          requete={props.requete}
          acteSelected={props.acteSelected}
          inscriptionSelected={props.inscriptionSelected}
        />
        <MenuReponseNegative
          requete={props.requete}
          acteSelected={props.acteSelected}
          inscriptionSelected={props.inscriptionSelected}
        />
      </div>
    </>
  );
};
