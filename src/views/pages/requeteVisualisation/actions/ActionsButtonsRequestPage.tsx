import React from "react";
import { NavigationButton } from "./NavigationButton";
import { BoutonSignature } from "../../../common/widget/signature/BoutonSignature";
import { BoutonRetour } from "../../../common/widget/BoutonRetour";
import "./sass/ActionButtonsRequestPage.scss";
import { IDataTable } from "../../requetes/MesRequetesDelivrancePage";
import { BoutonRetourSaga } from "./BoutonRetourSaga";

export interface ActionsProps {
  indexRequete: number;
  maxRequetes: number;
  setIndexRequete: (index: number) => void;
  requetes: IDataTable[];
  idRequete: string;
  reloadData: () => void;
}

export const ActionsButtonsRequestPage: React.FC<ActionsProps> = ({
  indexRequete,
  setIndexRequete,
  maxRequetes,
  requetes,
  idRequete,
  reloadData
}) => {
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
          <BoutonRetourSaga idRequete={idRequete} />
        </div>
        <div>
          <BoutonSignature
            libelle={"pages.delivrance.apercu.signatureElectronique"}
            requetes={requetes}
            reloadData={reloadData}
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
