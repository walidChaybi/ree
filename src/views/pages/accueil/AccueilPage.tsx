import React from "react";
import { Text } from "../../common/widget/Text";
import { BoutonAccueil } from "./BoutonAccueil";
import "../accueil/sass/AccueilPage.scss";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faPlusCircle,
  faSearch,
  faGavel,
  faChartBar,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import logoRece from "../../../img/logo-rece.svg";
import { Title } from "../../core/title/Title";
import { getText } from "../../common/widget/Text";
import officier from "../../../api/mock/officier.json";

export const AccueilPage: React.FC = () => {
  return (
    <>
      <Title titleId={"pages.accueil.titre"} />

      <img src={logoRece} alt={getText("altLogoRece")} />
      <div className="Titre">
        <Text
          messageId={"pages.accueil.bienvenue"}
          values={[officier.prenom, officier.nom, officier.trigramme]}
        />
      </div>
      <div className="Affectation">
        <Text
          messageId={"pages.accueil.affectation"}
          values={[
            officier.service,
            officier.departement,
            officier.bureau,
            officier.section
          ]}
        />
      </div>
      <div className="MenuAccueil">
        <BoutonAccueil
          messageId="pages.accueil.boutons.delivrance"
          pageUrl="mesrequetes"
          iconFA={faGavel}
          titleId="pages.accueil.titles.delivrance"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.miseAJour"
          pageUrl="miseAJour"
          iconFA={faSync}
          disabled={true}
          titleId="pages.accueil.titles.miseAJour"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.creation"
          pageUrl="creation"
          iconFA={faPlusCircle}
          disabled={true}
          titleId="pages.accueil.titles.creation"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.communication"
          pageUrl="communication"
          iconFA={faEnvelope}
          disabled={true}
          titleId="pages.accueil.titles.communication"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.requete"
          pageUrl="rechercheRequete"
          iconFA={faSearch}
          disabled={true}
          titleId="pages.accueil.titles.requete"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.acte"
          pageUrl="rechercheActe"
          iconFA={faSearch}
          disabled={true}
          titleId="pages.accueil.titles.acte"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.tableau"
          pageUrl="tableau"
          iconFA={faChartBar}
          disabled={true}
          titleId="pages.accueil.titles.tableau"
        ></BoutonAccueil>
      </div>
    </>
  );
};
