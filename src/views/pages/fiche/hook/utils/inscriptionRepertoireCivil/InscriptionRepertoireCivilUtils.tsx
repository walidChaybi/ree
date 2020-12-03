import React from "react";
import { IFicheRc } from "../../FicheRcInterfaces";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { LienFiche } from "../../../LienFiche";
import {
  getDateString,
  getDateFromTimestamp
} from "../../../../../common/util/DateUtils";
import { InscriptionsLiees } from "./InscriptionsLiees";

export function getInscriptionRepertoireCivil(
  retourBack: IFicheRc
): AccordionPartProps {
  return {
    contents: [
      { libelle: "Nature", value: retourBack.nature || "" },
      {
        libelle: "Mandataire(s)",
        value: retourBack.mandataires ? retourBack.mandataires.join(" / ") : ""
      },
      //TODO modifier le link
      {
        libelle: "Type inscription",
        value: (
          <span style={{ display: "flex" }}>
            {retourBack.typeInscription
              ? `${retourBack.typeInscription} (`
              : ""}

            {getInscriptionsImpactees(retourBack)}
            {")"}
          </span>
        )
      },
      {
        libelle: "Inscription(s) liée(s)",
        value: retourBack.inscriptionsLiees ? (
          <InscriptionsLiees inscriptionsLiees={retourBack.inscriptionsLiees} />
        ) : (
          ""
        )
      },
      {
        libelle: "Date d'inscription",
        value: retourBack.dateInscription
          ? getDateString(getDateFromTimestamp(retourBack.dateInscription))
          : ""
      },
      {
        libelle: "Durée inscription",
        value: retourBack.duree.uniteDuree
          ? `${retourBack.duree.nombreDuree} ${retourBack.duree.uniteDuree}`
          : `${retourBack.duree.autreDuree}`
      },
      {
        libelle: "Date fin de mesure",
        value: retourBack.duree.dateFinDeMesure
          ? getDateString(
              getDateFromTimestamp(retourBack.duree.dateFinDeMesure)
            )
          : ""
      }
    ],
    title: "Inscrition au répertoire civil"
  };
}

function getInscriptionsImpactees(retourBack: IFicheRc): JSX.Element[] {
  let inscriptionsImpactee: JSX.Element[] = [];
  if (retourBack.inscriptionsImpactees) {
    inscriptionsImpactee = retourBack.inscriptionsImpactees.map(
      (inscription, index) => {
        const key = `link-fiche-rc-${inscription.id || ""}`;
        return (
          <span key={key} style={{ display: "flex", whiteSpace: "pre" }}>
            {`RC n°`}
            <LienFiche
              identifiant={inscription.id}
              categorie={"rc"}
              numero={inscription.numero}
            />

            {retourBack.inscriptionsImpactees.length - 1 === index ? "" : ", "}
          </span>
        );
      }
    );
  }

  return inscriptionsImpactee;
}
