import { ListItemText } from "@material-ui/core";
import React from "react";
import { Action, IAction } from "../../../../model/requete/v2/IActions";
import "./scss/Suivis.scss";

interface ActionRequeteProps {
  action: IAction;
}

export const ActionRequete: React.FC<ActionRequeteProps> = props => {
  return (
    <ListItemText>
      {`${Action.getLibelle(props.action)} - ${Action.getDateAction(
        props.action
      )} ${
        Action.getTrigramme(props.action) !== ""
          ? `- ${Action.getTrigramme(props.action)}`
          : ""
      }`}
    </ListItemText>
  );
};
