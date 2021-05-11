import React from "react";
import ReportIcon from "@material-ui/icons/Report";
import LabelIcon from "@material-ui/icons/Label";
import ClearIcon from "@material-ui/icons/Clear";
import { Box } from "@material-ui/core";
import "./scss/RequeteUtils.scss";
import { Priorite } from "../../../../model/requete/v2/enum/Priorite";
import { getLibelle } from "../../widget/Text";

export function prioriteDeLaRequete(priorite: string): string {
  switch (Priorite.getEnumFor(priorite)) {
    case Priorite.BASSE:
      return "PrioriteBasse";
    case Priorite.MOYENNE:
      return "PrioriteMoyenne";
    case Priorite.HAUTE:
      return "PrioriteHaute";
    default:
      return "";
  }
}

export function getIconPrioriteRequete(data: any): JSX.Element {
  const priorite = data.priorite;
  if (priorite && priorite !== "") {
    return (
      <Box
        title={Priorite.getEnumFor(priorite).libelle}
        aria-label={Priorite.getEnumFor(priorite).libelle}
        aria-hidden={true}
      >
        <LabelIcon className={prioriteDeLaRequete(priorite)} />
      </Box>
    );
  } else {
    return (
      <Box
        title={getLibelle("Erreur priorité")}
        aria-label={getLibelle("Erreur priorité")}
        aria-hidden={true}
      >
        <ClearIcon className="ClearIcon" />
      </Box>
    );
  }
}

export function getObservationsNumeroRequete(data: any): JSX.Element {
  const observations = data.observations;
  let titleObservations = "";

  if (observations != null && observations.length >= 1) {
    observations.forEach((observation: string) => {
      titleObservations += `${observation}\n`;
    });
  }

  return (
    <>
      {titleObservations !== "" && (
        <Box
          title={titleObservations}
          aria-label={titleObservations}
          aria-hidden={true}
        >
          <ReportIcon className="ReportIcon" />
        </Box>
      )}
    </>
  );
}

export function getCellTitulaires(data: any): JSX.Element {
  const titulaires = data.titulaires;
  let titleTitulaires = "";
  const celluleTitulaires: string[] = [];

  if (titulaires != null && titulaires.length >= 1) {
    titulaires.forEach((titulaire: string) => {
      celluleTitulaires.push(titulaire[0]);
      titleTitulaires += `${titulaire[1]}\n`;
    });
  }

  return (
    <div title={titleTitulaires}>
      {celluleTitulaires.map((titulaire: string, index: number) => {
        return <div key={titulaire.trim()}>{titulaire}</div>;
      })}
    </div>
  );
}
