import { ListItemText } from "@material-ui/core";
import { Action, IAction } from "@model/requete/IActions";
import React from "react";
import "./scss/Suivis.scss";

interface ActionRequeteProps {
  action: IAction;
}

export const ActionRequete: React.FC<ActionRequeteProps> = props => {
  const trigramme = ` - ${Action.getTrigramme(props.action)}` || "";

  return (
    <ListItemText>
      {`${Action.getLibelle(props.action)} - ${Action.getDateAction(
        props.action
      )}${trigramme}`}
    </ListItemText>
  );
};
