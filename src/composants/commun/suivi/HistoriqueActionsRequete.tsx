import { ActionRequete } from "@model/requete/ActionRequete";
import React from "react";
import ConteneurAccordeon from "../conteneurs/accordeon/ConteneurAccordeon";

interface IHistoriqueActionsRequeteProps {
  actions?: ActionRequete[];
}

const HistoriqueActionsRequete: React.FC<IHistoriqueActionsRequeteProps> = ({ actions }) => {
  return actions ? (
    <div className="pr-4">
      <ConteneurAccordeon
        titre={"Historique des actions"}
        ouvertParDefaut={true}
      >
        <ul className="max-h-32 overflow-y-auto pl-8">
          {actions.map(action => {
            return (
              <li
                key={action.numeroOrdre}
                className="list-none text-start"
              >
                {action.phraseHistorique}
              </li>
            );
          })}
        </ul>
      </ConteneurAccordeon>
    </div>
  ) : (
    <></>
  );
};

export default HistoriqueActionsRequete;
