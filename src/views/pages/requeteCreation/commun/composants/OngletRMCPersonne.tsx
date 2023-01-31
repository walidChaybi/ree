import { IRMCAutoPersonneResultat } from "@model/rmc/personne/IRMCAutoPersonneResultat";
import { TableauRMCAutoPersonne } from "@pages/rechercheMultiCriteres/autoPersonne/TableauRMCAutoPersonne";
import React from "react";

interface OngletRMCPersonneProps {
  rmcAutoPersonneResultat: IRMCAutoPersonneResultat[];
}

export const OngletRMCPersonne: React.FC<OngletRMCPersonneProps> = props => {
  return <TableauRMCAutoPersonne data={props.rmcAutoPersonneResultat} />;
};
