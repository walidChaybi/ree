import React from "react";
import { NavigationButton } from "./NavigationButton";
import { BoutonSignature } from "../BoutonSignature";
import { BoutonRetour } from "../../../common/widget/BoutonRetour";
import "./sass/ActionButtonsRequestPage.scss";
import { useHistory } from "react-router-dom";
import { SeparateurUrl } from "../../../router/UrlManager";

export interface ActionsProps {
  indexRequete: number;
  maxRequetes: number;
  setIndexRequete: (index: number) => void;
  contenuDesDocuments: string[];
}

export const ActionsButtonsRequestPage: React.FC<ActionsProps> = ({
  indexRequete,
  setIndexRequete,
  maxRequetes,
  contenuDesDocuments,
}) => {
  const history = useHistory();

  const pathnames = history.location.pathname
    .split(SeparateurUrl)
    .filter((x) => x);
  pathnames.shift();

  return (
    <div className="ActionsButtons">
      <NavigationButton
        direction={"left"}
        indexRequete={indexRequete}
        maxRequetes={maxRequetes}
        setIndexRequete={setIndexRequete}
      />
      <div className="event-button">
        <div>
          <BoutonRetour messageId={"boutons.retourMesRequetes"} />
        </div>
        <div>
          <BoutonSignature
            libelle={"pages.delivrance.apercu.signatureElectronique"}
            contenuDesDocuments={contenuDesDocuments}
          />
        </div>
      </div>

      <NavigationButton
        direction={"right"}
        indexRequete={indexRequete}
        maxRequetes={maxRequetes}
        setIndexRequete={setIndexRequete}
      />
    </div>
  );
};
