import React from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { storeRece } from "../../../../common/util/storeRece";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { MenuDelivrer } from "./MenuDelivrer";
import { MenuReponseNegative } from "./MenuReponseNegative";
import { MenuReponseSansDelivrance } from "./MenuReponseSansDelivrance";
import { MenuTransfert } from "./MenuTransfert";

export interface IActionProps {
  requete: TRequete;
  acteSelected?: IResultatRMCActe[];
  inscriptionSelected?: IResultatRMCInscription[];
}

export const ChoixAction: React.FC<IActionProps> = props => {
  const checkSiMenuTransferer =
    props.requete.statutCourant.statut === StatutRequete.PRISE_EN_CHARGE &&
    storeRece.utilisateurCourant?.idUtilisateur === props.requete.idUtilisateur;

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
      {checkSiMenuTransferer && <MenuTransfert requete={props.requete} />}
    </Fieldset>
  );
};
