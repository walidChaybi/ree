import React from "react";
import {
  IFicheRc,
  IDureeInscription
} from "../../../../../../model/ficheRcRca/FicheRcInterfaces";
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
      {
        libelle: "Type inscription",
        value: getTypeInscription(retourBack)
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
        value: getUniteDuree(retourBack.duree)
      },
      {
        libelle: "Date fin de mesure",
        value:
          retourBack.duree && retourBack.duree.dateFinDeMesure
            ? getDateString(
                getDateFromTimestamp(retourBack.duree.dateFinDeMesure)
              )
            : ""
      }
    ],
    title: "Inscrition au répertoire civil"
  };
}

function getTypeInscription(retourBack: IFicheRc): JSX.Element {
  return (
    <span style={{ display: "flex" }}>
      {`${retourBack.typeInscription} ${
        retourBack.inscriptionsImpactees &&
        retourBack.inscriptionsImpactees.length > 0
          ? "("
          : ""
      }`}

      {getInscriptionsImpactees(retourBack)}
      {retourBack.inscriptionsImpactees &&
      retourBack.inscriptionsImpactees.length > 0
        ? ")"
        : ""}
    </span>
  );
}

function getUniteDuree(duree?: IDureeInscription) {
  if (duree) {
    if (duree.uniteDuree) {
      return `${duree.nombreDuree} ${duree.uniteDuree}`;
    } else {
      return `${duree.autreDuree}`;
    }
  }
  return "";
}

function getInscriptionsImpactees(retourBack: IFicheRc): JSX.Element[] {
  let inscriptionsImpactee: JSX.Element[] = [];
  if (
    retourBack.inscriptionsImpactees &&
    retourBack.inscriptionsImpactees.length > 0
  ) {
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
