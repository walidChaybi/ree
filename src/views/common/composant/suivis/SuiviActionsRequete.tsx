import { List } from "@material-ui/core";
import React from "react";
import { IAction } from "../../../../model/requete/v2/IActions";
import { AccordionRece } from "../../widget/accordion/AccordionRece";
import { ActionRequete } from "./ActionRequete";
import "./scss/Suivis.scss";

interface SuiviActionsRequeteProps {
  actions?: IAction[];
}

export const SuiviActionsRequete: React.FC<SuiviActionsRequeteProps> = props => {
  return (
    <div className="suivis-requete">
      <AccordionRece titre={"Suivi requête"} disabled={false} expanded={true}>
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
