import React from "react";
import { IAlerte } from "../../../../../../model/etatcivil/fiche/IAlerte";
import { AccordionRece } from "../../../../../common/widget/accordion/AccordionRece";
import { BoutonAjouterAlertes } from "../../../../../common/widget/alertes/BoutonAjouterAlertes";
import { ListeAlertes } from "../../../../../common/widget/alertes/ListeAlertes";
import { getLibelle } from "../../../../../common/widget/Text";
import "./scss/AlertesActes.scss";

export interface AlertesActesProps {
  alertesActes: Map<string, IAlerte[]>;
  ajouterAlerte: boolean;
}

export const AlertesActes: React.FC<AlertesActesProps> = ({
  alertesActes = new Map([]),
  ajouterAlerte
}) => {
  return (
    <div className="AlertesActes">
      <AccordionRece
        titre={getLibelle("Alertes")}
        disabled={false}
        expanded={alertesActes.size > 0}
      >
        <div className="Liste">
          {Array.from(alertesActes.values()).map(
            (alertes: IAlerte[], index: number) => {
              return (
                <div
                  key={`alertes-${index}`}
                  className={`Alertes ${
                    index === 0 ? "" : "SeparateurAlertes"
                  }`}
                >
                  {ajouterAlerte === true && (
                    <BoutonAjouterAlertes
                      key={`bouton-ajouter-alertes-${index}`}
                    />
                  )}
                  {alertes?.length > 0 && (
                    <ListeAlertes
                      key={`alertes-actes-${index}`}
                      alertes={alertes}
                      displayReference={true}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </AccordionRece>
    </div>
  );
};
