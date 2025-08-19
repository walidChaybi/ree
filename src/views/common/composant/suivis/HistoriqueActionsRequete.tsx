import { IAction } from "@model/requete/IActions";
import List from "@mui/material/List";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { ActionRequete } from "./ActionRequete";
import "./scss/Suivis.scss";

interface HistoriqueActionsRequeteProps {
  actions?: IAction[];
}

export const HistoriqueActionsRequete: React.FC<HistoriqueActionsRequeteProps> = props => (
  <div className="historique-actions">
    <AccordionRece
      titre={"Historique des actions"}
      disabled={false}
      expanded={false}
    >
      <List>
        {props.actions
          ?.sort((a, b) => (a.numeroOrdre > b.numeroOrdre ? -1 : 1))
          .map(el => (
            <ActionRequete
              key={el.id}
              action={el}
            />
          ))}
      </List>
    </AccordionRece>
  </div>
);
