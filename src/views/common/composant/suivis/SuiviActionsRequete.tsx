import { List } from "@mui/material";
import { IAction } from "@model/requete/IActions";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { ActionRequete } from "./ActionRequete";
import "./scss/Suivis.scss";

interface SuiviActionsRequeteProps {
  actions?: IAction[];
}

export const SuiviActionsRequete: React.FC<SuiviActionsRequeteProps> = props => {
  return (
    <div className="suivis-requete">
      <AccordionRece titre={"Suivi requête"} disabled={false} expanded={false}>
        <List>
          {props.actions
            ?.sort((a, b) => (a.numeroOrdre > b.numeroOrdre ? -1 : 1))
            .map(el => (
              <ActionRequete key={el.id} action={el} />
            ))}
        </List>
      </AccordionRece>
    </div>
  );
};
