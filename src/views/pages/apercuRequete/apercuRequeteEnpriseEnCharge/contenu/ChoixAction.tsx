import React from "react";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { MenuDelivrer } from "./MenuDelivrer";
import { MenuReponseNegative } from "./MenuReponseNegative";
import { MenuReponseSansDelivrance } from "./MenuReponseSansDelivrance";

export interface IActionProps {
  requete: TRequete;
  acteSelected?: IResultatRMCActe[];
  inscriptionSelected?: IResultatRMCInscription[];
}

export const ChoixAction: React.FC<IActionProps> = props => {
  return (
    <Fieldset titre={getLibelle("Actions")}>
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
      <MenuReponseSansDelivrance
        requete={props.requete}
        acteSelected={props.acteSelected}
      />
    </Fieldset>
  );
};
