import React from "react";
import { NavigationButton } from "./NavigationButton";
import { BoutonSignature } from "../../../common/widget/signature/BoutonSignature";
import { BoutonRetour } from "../../../common/widget/BoutonRetour";
import "./sass/ActionButtonsRequestPage.scss";
import { IDataTable } from "../../requetes/MesRequetesDelivrancePage";
import { IOfficierSSOApi } from "../../../core/login/LoginHook";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { BoutonARetraiterSaga } from "./BoutonARetraiterSaga";

export interface ActionsProps {
  indexRequete: number;
  maxRequetes: number;
  setIndexRequete: (index: number) => void;
  requetes: IDataTable[];
  idRequete: string;
  reloadData: () => void;
  connectedUser?: IOfficierSSOApi;
}

export const ActionsButtonsRequestPage: React.FC<ActionsProps> = ({
  indexRequete,
  setIndexRequete,
  maxRequetes,
  requetes,
  idRequete,
  reloadData,
  connectedUser
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
          {canSign(requetes, indexRequete) === true && (
            <BoutonSignature
              libelle={"pages.delivrance.apercu.signatureElectronique"}
              requetes={[requetes[indexRequete]]}
              reloadData={reloadData}
              uniqueSignature={true}
              connectedUser={connectedUser}
            />
          )}
        </div>
        <div className="boutonARetraiterSaga">
          <BoutonARetraiterSaga idRequete={idRequete} />
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

const canSign = (requetes: IDataTable[], indexRequete: number): boolean => {
  return (
    requetes.length > 0 &&
    requetes[indexRequete].statut === StatutRequete.ASigner
  );
};
