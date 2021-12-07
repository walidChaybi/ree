import { ListItemText } from "@material-ui/core";
import React from "react";
import { Action, IAction } from "../../../../model/requete/IActions";
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
