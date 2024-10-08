import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import { RECEContextData } from "@core/contexts/RECEContext";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import React, { useContext } from "react";
import { MenuDelivrerCS } from "./MenuDelivrerCS";
import { MenuDelivrerEC } from "./MenuDelivrerEC";
import { MenuReponseSansDelivranceCS } from "./MenuReponseSansDelivranceCS";
import { MenuReponseSansDelivranceEC } from "./MenuReponseSansDelivranceEC";
import "./scss/ChoixAction.scss";

export interface IChoixActionDelivranceProps {
  requete: IRequeteDelivrance;
  actes?: IResultatRMCActe[];
  inscriptions?: IResultatRMCInscription[];
  inscriptionsRC?: IInscriptionRc[];
  dataHistory?: any;
  menuFermer?: boolean;
  titulairesActe?: Map<string, ITitulaireActe[]>;
  nbrTitulairesActe?: Map<string, number>;
  alertesActe?: IAlerte[];
}

export const ChoixAction: React.FC<IChoixActionDelivranceProps> = props => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const checkSiMenuTransferer = () => {
    const statutPriseEnCharge =
      props.requete.statutCourant.statut === StatutRequete.PRISE_EN_CHARGE;
    const mAppartient =
      utilisateurConnecte?.idUtilisateur === props.requete.idUtilisateur;

    const utilisateurDansSCEC = utilisateurConnecte?.service?.estDansScec;

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
            provenance={props.requete.provenanceRequete}
            idUtilisateurRequete={props.requete.idUtilisateur}
          />
        )}
      </div>
    </Fieldset>
  );
};
