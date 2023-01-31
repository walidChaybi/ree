import { HeaderTableauRMCPersonne } from "@model/rmc/personne/HeaderTableauRMCPersonne";
import ReportIcon from "@mui/icons-material/Report";
import { getLibelle, TROIS } from "@util/Utils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC
} from "../acteInscription/resultats/RMCTableauCommun";

export const colonnesTableauRMCAutoPersonne: TableauTypeColumn[] = [
  ...commonHeadersTableauRMC.slice(0, TROIS),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCPersonne.Sexe],
    title: "Sexe",
    style: { width: "4rem" }
  }),
  commonHeadersTableauRMC[TROIS],
  new TableauTypeColumn({
    keys: [HeaderTableauRMCPersonne.LieuNaissance],
    title: "Lieu de naissance"
  }),
  ...natureHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCPersonne.Reference],
    title: "Référence",
    className: "ColOverflow"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCPersonne.StatutOuType],
    title: "Statut / Type",
    className: "ColOverflow"
  })
];

export function getMessageAucunResultat(): JSX.Element {
  return (
    <>
      <ReportIcon />
      <div>
        {getLibelle("Aucun résultat trouvé pour ces critères de recherche.")}
      </div>
    </>
  );
}
