import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { Fieldset } from "@widget/fieldset/Fieldset";
import React, { useContext } from "react";
import { RECEContextData } from "../../../../../../../contexts/RECEContextProvider";
import { MenuDelivrerCS } from "./MenuDelivrerCS";
import { MenuDelivrerEC } from "./MenuDelivrerEC";
import { MenuReponseSansDelivranceCS } from "./MenuReponseSansDelivranceCS";
import { MenuReponseSansDelivranceEC } from "./MenuReponseSansDelivranceEC";
import "./scss/ChoixAction.scss";

export interface IChoixActionDelivranceProps {
  requete: IRequeteDelivrance;
  actes?: ResultatRMCActe[];
  inscriptions?: TResultatRMCInscription[];
  inscriptionsRC?: IInscriptionRc[];
  dataHistory?: any;
  titulairesActe?: Map<string, TitulaireActe[]>;
  nbrTitulairesActe?: Map<string, number>;
  alertesActe?: IAlerte[];
}

export const ChoixAction: React.FC<IChoixActionDelivranceProps> = props => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const checkSiMenuTransferer = () => {
    const statutPriseEnCharge = props.requete.statutCourant.statut === StatutRequete.PRISE_EN_CHARGE;
    const mAppartient = utilisateurConnecte?.id === props.requete.idUtilisateur;

    const utilisateurDansSCEC = utilisateurConnecte.estDuSCEC;

    return statutPriseEnCharge && mAppartient && utilisateurDansSCEC;
  };
  const sousType = props.requete.sousType;

  return (
    <Fieldset titre={"Actions"}>
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
              alertesActe={props.alertesActe}
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
              inscriptionsRC={props.inscriptionsRC}
            />
            <MenuReponseSansDelivranceCS
              requete={props.requete}
              actes={props.actes}
              inscriptions={props.inscriptions}
            />
          </>
        )}
        {checkSiMenuTransferer() && (
          <MenuTransfert
            idRequete={props.requete.id}
            sousTypeRequete={props.requete.sousType}
            typeRequete={props.requete.type}
            estTransfert={true}
            idUtilisateurRequete={props.requete.idUtilisateur}
          />
        )}
      </div>
    </Fieldset>
  );
};
