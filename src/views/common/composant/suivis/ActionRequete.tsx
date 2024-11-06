import { Action, IAction } from "@model/requete/IActions";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import "./scss/Suivis.scss";

interface ActionRequeteProps {
  action: IAction;
}

export const ActionRequete: React.FC<ActionRequeteProps> = ({ action }) => (
  <ListItemText>{`${Action.getLibelle(action)} - ${Action.getDateAction(action)}${Action.getNomPrenom(action)}`}</ListItemText>
);
