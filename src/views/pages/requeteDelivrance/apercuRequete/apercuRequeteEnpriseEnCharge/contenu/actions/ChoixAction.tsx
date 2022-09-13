import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "@util/storeRece";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import React from "react";
import { MenuAutre } from "./MenuAutre";
import { MenuDelivrerCS } from "./MenuDelivrerCS";
import { MenuDelivrerEC } from "./MenuDelivrerEC";
import { MenuReponseSansDelivranceCS } from "./MenuReponseSansDelivranceCS";
import { MenuReponseSansDelivranceEC } from "./MenuReponseSansDelivranceEC";
import "./scss/ChoixAction.scss";

export interface IChoixActionDelivranceProps {
  requete: IRequeteDelivrance;
  actes?: IResultatRMCActe[];
  inscriptions?: IResultatRMCInscription[];
  dataHistory?: any;
  menuFermer?: boolean;
  titulairesActe?: Map<string, ITitulaireActe[]>;
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
        {SousTypeDelivrance.estRDDouRDCouRDDP(sousType) && (
          <>
            <MenuDelivrerEC
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
              dataHistory={props.dataHistory}
              titulairesActe={props.titulairesActe}
              nbrTitulairesActe={props.nbrTitulairesActe}
            />
            <MenuReponseSansDelivranceEC
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
            />
          </>
        )}
        {SousTypeDelivrance.estRDCSDouRDCSC(sousType) && (
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
        {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) && (
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
