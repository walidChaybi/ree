import React from "react";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { toAlertString, toReferenceString } from "../../util/AlertesActeUtils";
import "./scss/ListeAlertes.scss";

export interface ListeAlertesProps {
  alertes: IAlerte[];
  displayReference: boolean;
}

export const ListeAlertes: React.FC<ListeAlertesProps> = ({
  alertes,
  displayReference
}) => {
  return (
    <div className="ListeAlertes">
      {alertes?.map((alerte: IAlerte, idx: number) => {
        return (
          <div
            key={`alerte-${idx}`}
            className={alerte?.codeCouleur}
            title={alerte?.complementDescription}
          >
            {displayReference === true
              ? toReferenceString(alerte)
              : toAlertString(alerte)}
          </div>
        );
      })}
    </div>
  );
};
