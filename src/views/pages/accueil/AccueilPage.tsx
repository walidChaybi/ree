import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faChartBar,
  faGavel,
  faPlusCircle,
  faSearch,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import logoRece from "../../../img/logo-rece.svg";
import { FeatureFlag } from "../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../common/util/featureFlag/gestionnaireFeatureFlag";
import { getLibelle, getText, Text } from "../../common/widget/Text";
import {
  OfficierContext,
  OfficierContextProps
} from "../../core/contexts/OfficierContext";
import { Title } from "../../core/title/Title";
import "../accueil/scss/AccueilPage.scss";
import {
  BoutonAccueilCommunication,
  BoutonAccueilEspaceCreation,
  BoutonAccueilEspaceDelivrance,
  BoutonAccueilEspaceDelivranceV2,
  BoutonAccueilEspaceMiseAjour,
  BoutonAccueilRechercheActe,
  BoutonAccueilRechercheActeOuInscription,
  BoutonAccueilRechercheRequete,
  BoutonAccueilTableau
} from "./BoutonAccueil";

export const AccueilPage: React.FC = () => {
  const etape2Active = gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2);

  return (
    <div className="AccueilPage">
      <Title titleId={"pages.accueil.titre"} />

      <img src={logoRece} alt={getText("altLogoRece")} />
      <OfficierContext.Consumer>
        {officier => (
          <>
            <div className="Titre">
              <Text
                messageId={"pages.accueil.bienvenue"}
                values={
                  officier?.officierDataState !== undefined
                    ? [
                        officier.officierDataState.prenom,
                        officier.officierDataState.nom,
                        officier.officierDataState.trigramme
                      ]
                    : []
                }
              />
            </div>
            <div className="Affectation">{getAffectation(officier)}</div>
          </>
        )}
      </OfficierContext.Consumer>
      <div className="MenuAccueil">
        {etape2Active ? (
          <BoutonAccueilEspaceDelivranceV2
            messageId="pages.accueil.boutons.delivranceV2"
            pageUrl="mesrequetesv2"
            iconFA={faGavel}
            titleId="pages.accueil.titles.delivranceV2"
          ></BoutonAccueilEspaceDelivranceV2>
        ) : (
          <BoutonAccueilEspaceDelivrance
            messageId="pages.accueil.boutons.delivrance"
            pageUrl="mesrequetes"
            iconFA={faGavel}
            titleId="pages.accueil.titles.delivrance"
          ></BoutonAccueilEspaceDelivrance>
        )}
        <BoutonAccueilEspaceMiseAjour
          messageId="pages.accueil.boutons.miseAJour"
          pageUrl="miseAJour"
          iconFA={faSync}
          titleId="pages.accueil.titles.miseAJour"
        ></BoutonAccueilEspaceMiseAjour>
        <BoutonAccueilEspaceCreation
          messageId="pages.accueil.boutons.creation"
          pageUrl="creation"
          iconFA={faPlusCircle}
          titleId="pages.accueil.titles.creation"
        ></BoutonAccueilEspaceCreation>
        <BoutonAccueilCommunication
          messageId="pages.accueil.boutons.communication"
          pageUrl="communication"
          iconFA={faEnvelope}
          titleId="pages.accueil.titles.communication"
        ></BoutonAccueilCommunication>
        <BoutonAccueilRechercheRequete
          messageId="pages.accueil.boutons.rechercherequete"
          pageUrl="rechercherequete"
          iconFA={faSearch}
          titleId="pages.accueil.titles.requete"
        ></BoutonAccueilRechercheRequete>
        <BoutonAccueilRechercheActeOuInscription
          messageId="pages.accueil.boutons.rechercheacteinscription"
          pageUrl="rechercheacteinscription"
          iconFA={faSearch}
          titleId="pages.accueil.titles.rechercheacteinscription"
        ></BoutonAccueilRechercheActeOuInscription>
        <BoutonAccueilRechercheActe
          messageId="pages.accueil.boutons.rechercheacte"
          pageUrl="rechercheacte"
          iconFA={faSearch}
          titleId="pages.accueil.titles.rechercheacte"
        ></BoutonAccueilRechercheActe>
        <BoutonAccueilTableau
          messageId="pages.accueil.boutons.tableau"
          pageUrl="tableau"
          iconFA={faChartBar}
          titleId="pages.accueil.titles.tableau"
        ></BoutonAccueilTableau>
      </div>
    </div>
  );
};

function getAffectation(officier?: OfficierContextProps): string {
  const hierarchie = getHierarchie(officier);
  let buildHierarchie = "";
  if (hierarchie.length > 0) {
    buildHierarchie = hierarchie.join(" - ");
  }
  return getLibelle(buildHierarchie);
}

function getHierarchie(officier?: OfficierContextProps): string[] {
  const hierarchie = [];
  const officierData = officier?.officierDataState;

  if (officier !== undefined && officierData !== undefined) {
    if (officierData.ministere !== undefined) {
      hierarchie.push(officierData.ministere);
    }

    if (officierData.service !== undefined) {
      hierarchie.push(officierData.service);
    }

    if (officierData.departement !== undefined) {
      hierarchie.push(officierData.departement);
    }

    if (officierData.bureau !== undefined) {
      hierarchie.push(officierData.bureau);
    }

    if (officierData.section !== undefined) {
      hierarchie.push(officierData.section);
    }
  }

  return hierarchie;
}
