import { Action, IAction } from "@model/requete/IActions";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import "./scss/Suivis.scss";

interface ActionRequeteProps {
  action: IAction;
}

export const ActionRequete: React.FC<ActionRequeteProps> = props => {
  const trigramme = ` - ${props.action.trigramme}`;

  return <ListItemText>{`${Action.getLibelle(props.action)} - ${Action.getDateAction(props.action)}${trigramme}`}</ListItemText>;
};
