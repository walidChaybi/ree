import { ActionRequete } from "@model/requete/ActionRequete";
import { ListItemText } from "@mui/material";
import List from "@mui/material/List";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import "./scss/Suivis.scss";

//TODO Supprimer ce composant et utiliser le nouveau une fois la refonte de la page effectué

interface IHistoriqueActionsRequeteProps {
  actions?: ActionRequete[];
}

export const HistoriqueActionsRequete: React.FC<IHistoriqueActionsRequeteProps> = ({ actions }) => {
  return actions ? (
    <div className="historique-actions">
      <AccordionRece
        titre={"Historique des actions"}
        disabled={false}
        expanded={false}
      >
        <List>
          {actions.map(action => (
            <ListItemText key={action.id}>{action.phraseHistorique}</ListItemText>
          ))}
        </List>
      </AccordionRece>
    </div>
  ) : (
    <></>
  );
};
