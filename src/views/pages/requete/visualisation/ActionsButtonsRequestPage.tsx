import React from "react";
import { NavigationButton } from "./NavigationButton";
import { BoutonSignature } from "../BoutonSignature";
import { BoutonRetour } from "../../../common/widget/BoutonRetour";
import "./sass/ActionButtonsRequestPage.scss";
import { getAppUrl, AppUrls } from "../../../router/UrlManager";
export interface ActionsProps {
  indexRequete: number;
  maxRequetes: number;
  setIndexRequete: (index: number) => void;
}

export const ActionsButtonsRequestPage: React.FC<ActionsProps> = ({
  indexRequete,
  setIndexRequete,
  maxRequetes
}) => {
  return (
    <div className="actions-buttons">
      <NavigationButton
        direction={"left"}
        indexRequete={indexRequete}
        maxRequetes={maxRequetes}
        setIndexRequete={setIndexRequete}
      />
      <div className="event-button">
        <div>
          <BoutonRetour
            url={getAppUrl(AppUrls.MesRequetesUrl)}
            messageId={"boutons.retourMesRequetes"}
          />
        </div>
        <div className="todo">
          <BoutonSignature
            libelle={"pages.requetes.apercu.signatureElectronique"}
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
