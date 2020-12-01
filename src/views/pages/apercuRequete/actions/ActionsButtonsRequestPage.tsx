import React from "react";
import { NavigationButton } from "./NavigationButton";
import { BoutonSignature } from "../../../common/widget/signature/BoutonSignature";
import { BoutonRetour } from "../../../common/widget/BoutonRetour";
import "./sass/ActionButtonsRequestPage.scss";
import { IDataTable } from "../../espaceDelivrance/MesRequetesPage";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { BoutonARetraiterSaga } from "./BoutonARetraiterSaga";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";

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
  const estRequeteASigner = estASigner(requetes, indexRequete);
  const estRequeteATraiter = estATraiter(requetes, indexRequete);
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
          {estRequeteASigner && (
            <BoutonSignature
              libelle={"pages.delivrance.apercu.signatureElectronique"}
              requetes={[requetes[indexRequete]]}
              reloadData={reloadData}
              uniqueSignature={true}
              connectedUser={connectedUser}
            />
          )}
        </div>
        {!estRequeteATraiter && (
          <div className="boutonARetraiterSaga">
            <BoutonARetraiterSaga idRequete={idRequete} />
          </div>
        )}
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

const estASigner = (requetes: IDataTable[], indexRequete: number): boolean => {
  return estRequeteStatut(requetes, indexRequete, StatutRequete.ASigner);
};

const estATraiter = (requetes: IDataTable[], indexRequete: number): boolean => {
  return estRequeteStatut(requetes, indexRequete, StatutRequete.ATraiter);
};

const estRequeteStatut = (
  requetes: IDataTable[],
  indexRequete: number,
  statut: StatutRequete
): boolean => {
  return requetes.length > 0 && requetes[indexRequete].statut === statut;
};
