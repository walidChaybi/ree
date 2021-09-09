import React from "react";
import { IAlerte } from "../../../../../../model/etatcivil/fiche/IAlerte";
import { AccordionRece } from "../../../../../common/widget/accordion/AccordionRece";
import { BoutonAjouterAlerte } from "../../../../../common/widget/alertes/ajouterAlerte/BoutonAjouterAlerte";
import { IAjouterAlerteFormValue } from "../../../../../common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { ListeAlertes } from "../../../../../common/widget/alertes/listeAlertes/ListeAlertes";
import { getLibelle } from "../../../../../common/widget/Text";
import "./scss/AlertesActes.scss";

export interface AlertesActesProps {
  alertes: Map<string, IAlerte[]>;
  ajoutAlertePossible: boolean;
  ajouterAlerteCallBack: (
    idActe: string,
    value: IAjouterAlerteFormValue
  ) => void;
  supprimerAlerteCallBack: (idAlerteActe: string, idActe: string) => void;
}

export const AlertesActes: React.FC<AlertesActesProps> = ({
  alertes = new Map([]),
  ajoutAlertePossible,
  ajouterAlerteCallBack,
  supprimerAlerteCallBack
}) => {
  return (
    <div className="AlertesActes">
      <AccordionRece
        titre={getLibelle("Alertes")}
        disabled={false}
        expanded={alertes.size > 0}
      >
        <div className="Liste">
          {Array.from(alertes.entries()).map(
            (entry: [string, IAlerte[]], index: number) => (
              <div
                key={`alertes-${index}`}
                className={`Alertes ${index === 0 ? "" : "SeparateurAlertes"}`}
              >
                <BoutonAjouterAlerte
                  key={`bouton-ajouter-alerte-${index}`}
                  ajoutAlertePossible={ajoutAlertePossible}
                  ajouterAlerteCallBack={ajouterAlerteCallBack.bind(
                    null,
                    entry?.[0]
                  )}
                />
                <ListeAlertes
                  key={`liste-alertes-${index}`}
                  ajoutAlertePossible={ajoutAlertePossible}
                  alertes={entry?.[1]}
                  displayReference={true}
                  supprimerAlerteCallBack={supprimerAlerteCallBack}
                />
              </div>
            )
          )}
        </div>
      </AccordionRece>
    </div>
  );
};
