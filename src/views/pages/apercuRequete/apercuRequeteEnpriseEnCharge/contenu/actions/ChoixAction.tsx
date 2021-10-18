import React from "react";
import { SousTypeDelivrance } from "../../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { SousTypeRequete } from "../../../../../../model/requete/v2/enum/SousTypeRequete";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { storeRece } from "../../../../../common/util/storeRece";
import { Fieldset } from "../../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../../common/widget/Text";
import { MenuAutre } from "./MenuAutre";
import { MenuDelivrer } from "./MenuDelivrer";
import { MenuDelivrerCS } from "./MenuDelivrerCS";
import { MenuReponseSansDelivrance } from "./MenuReponseSansDelivrance";
import { MenuReponseSansDelivranceCS } from "./MenuReponseSansDelivranceCS";
import { MenuTransfert } from "./MenuTransfert";
import "./scss/ChoixAction.scss";

export interface IActionProps {
  requete: TRequete;
  actes?: IResultatRMCActe[];
  inscriptions?: IResultatRMCInscription[];
  dataHistory?: any;
}

export const ChoixAction: React.FC<IActionProps> = props => {
  const checkSiMenuTransferer = () => {
    const statutPriseEnCharge =
      props.requete.statutCourant.statut === StatutRequete.PRISE_EN_CHARGE;
    const mAppartient =
      storeRece.utilisateurCourant?.idUtilisateur ===
      props.requete.idUtilisateur;

    const utilisateurDansSCEC =
      storeRece.utilisateurCourant?.entite?.estDansSCEC;

    return statutPriseEnCharge && mAppartient && utilisateurDansSCEC;
  };
  const sousType = (props.requete as IRequeteDelivrance).sousType;

  return (
    <Fieldset titre={getLibelle("Actions")}>
      <div className="ChoixAction">
        {soustypeRDDouRDC(sousType) && (
          <>
            <MenuDelivrer
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
              dataHistory={props.dataHistory}
            />
            <MenuReponseSansDelivrance
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
            />
          </>
        )}
        {soustypeRDCSDouRDCSC(sousType) && (
          <>
            <MenuDelivrerCS
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
              dataHistory={props.dataHistory}
            />
            <MenuReponseSansDelivranceCS
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
            />
          </>
        )}
        <MenuAutre requete={props.requete} />
        {checkSiMenuTransferer() && <MenuTransfert requete={props.requete} />}
      </div>
    </Fieldset>
  );
};

function soustypeRDDouRDC(sousType: SousTypeRequete): boolean {
  return (
    sousType === SousTypeDelivrance.RDD || sousType === SousTypeDelivrance.RDC
  );
}

function soustypeRDCSDouRDCSC(sousType: SousTypeRequete): boolean {
  return (
    sousType === SousTypeDelivrance.RDCSD ||
    sousType === SousTypeDelivrance.RDCSC
  );
}
