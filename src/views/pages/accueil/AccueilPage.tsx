import React from "react";
import { Text, getText } from "../../common/widget/Text";
import {
  BoutonAccueil,
  BoutonAccueilEspaceMiseAjour,
  BoutonAccueilEspaceCreation,
  BoutonAccueilCommunication,
  BoutonAccueilRechercheRequete,
  BoutonAccueilRechercheActeOuInscription
} from "./BoutonAccueil";
import "../accueil/sass/AccueilPage.scss";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faPlusCircle,
  faSearch,
  faGavel,
  faChartBar,
  faSync,
  faUsersCog
} from "@fortawesome/free-solid-svg-icons";
import logoRece from "../../../img/logo-rece.svg";
import { Title } from "../../core/title/Title";
import {
  OfficierContext,
  OfficierContextProps
} from "../../core/contexts/OfficierContext";
import { Badge } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { URL_ACCUEIL_RECE_ADMIN } from "../../router/ReceUrls";

export const AccueilPage: React.FC = () => {
  const history = useHistory();
  const onClickBadgeAdmin = () => {
    history.push(URL_ACCUEIL_RECE_ADMIN);
    history.go(0);
  };

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
              {officier &&
                officier.officierDataState?.profils.includes("RECE_ADMIN") && (
                  <Badge
                    className={"BadgeAdmin"}
                    badgeContent={0}
                    onClick={onClickBadgeAdmin}
                  >
                    <FontAwesomeIcon
                      className={"IconeBouton"}
                      icon={faUsersCog}
                    />
                  </Badge>
                )}
            </div>
            <div className="Affectation">
              <Text
                messageId={`pages.accueil.affectation.${
                  getHierarchie(officier).length
                }`}
                values={getHierarchie(officier)}
              />
            </div>
          </>
        )}
      </OfficierContext.Consumer>
      <div className="MenuAccueil">
        <BoutonAccueil
          messageId="pages.accueil.boutons.delivrance"
          pageUrl="mesrequetes"
          iconFA={faGavel}
          titleId="pages.accueil.titles.delivrance"
        ></BoutonAccueil>
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
          messageId="pages.accueil.boutons.requete"
          pageUrl="rechercheRequete"
          iconFA={faSearch}
          titleId="pages.accueil.titles.requete"
        ></BoutonAccueilRechercheRequete>
        <BoutonAccueilRechercheActeOuInscription
          messageId="pages.accueil.boutons.acte"
          pageUrl="rechercheActe"
          iconFA={faSearch}
          titleId="pages.accueil.titles.acte"
        ></BoutonAccueilRechercheActeOuInscription>
        <BoutonAccueil
          messageId="pages.accueil.boutons.tableau"
          pageUrl="tableau"
          iconFA={faChartBar}
          disabled={true}
          titleId="pages.accueil.titles.tableau"
        ></BoutonAccueil>
      </div>
    </div>
  );
};

function getHierarchie(officier?: OfficierContextProps): string[] {
  const hierarchie = [];
  const officierData = officier?.officierDataState;

  if (officier !== undefined && officierData !== undefined) {
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
