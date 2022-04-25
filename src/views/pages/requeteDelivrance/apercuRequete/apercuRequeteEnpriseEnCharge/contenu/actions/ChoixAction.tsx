import React from "react";
import { StatutRequete } from "../../../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { MenuTransfert } from "../../../../../../common/composant/menuTransfert/MenuTransfert";
import { FeatureFlag } from "../../../../../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../../../../common/util/featureFlag/gestionnaireFeatureFlag";
import {
  soustypeRDCSDouRDCSC,
  soustypeRDDouRDCouRDDP
} from "../../../../../../common/util/RequetesUtils";
import { storeRece } from "../../../../../../common/util/storeRece";
import { getLibelle } from "../../../../../../common/util/Utils";
import { Fieldset } from "../../../../../../common/widget/fieldset/Fieldset";
import { MenuAutre } from "./MenuAutre";
import { MenuDelivrer } from "./MenuDelivrer";
import { MenuDelivrerCS } from "./MenuDelivrerCS";
import { MenuReponseSansDelivrance } from "./MenuReponseSansDelivrance";
import { MenuReponseSansDelivranceCS } from "./MenuReponseSansDelivranceCS";
import "./scss/ChoixAction.scss";

export interface IChoixActionDelivranceProps {
  requete: IRequeteDelivrance;
  actes?: IResultatRMCActe[];
  inscriptions?: IResultatRMCInscription[];
  dataHistory?: any;
  menuFermer?: boolean;
  nbrTitulairesActe?: Map<string, number>;
}

export const ChoixAction: React.FC<IChoixActionDelivranceProps> = props => {
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
  const sousType = props.requete.sousType;

  return (
    <Fieldset titre={getLibelle("Actions")}>
      <div className="ChoixAction">
        {soustypeRDDouRDCouRDDP(sousType) && (
          <>
            <MenuDelivrer
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
              dataHistory={props.dataHistory}
              nbrTitulairesActe={props.nbrTitulairesActe}
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
        {gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS) && (
          <MenuAutre requete={props.requete} />
        )}
        {checkSiMenuTransferer() && (
          <MenuTransfert
            idRequete={props.requete.id}
            sousTypeRequete={props.requete.sousType}
            typeRequete={props.requete.type}
            estTransfert={true}
            provenance={props.requete.provenanceRequete}
            idUtilisateurRequete={props.requete.idUtilisateur}
          />
        )}
      </div>
    </Fieldset>
  );
};
