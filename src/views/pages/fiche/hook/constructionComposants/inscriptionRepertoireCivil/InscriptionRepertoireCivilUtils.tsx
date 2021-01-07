import React from "react";
import {
  IFicheRcRca,
  IDureeInscription
} from "../../../../../../model/etatcivil/FicheInterfaces";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { LienFiche } from "../../../LienFiche";
import {
  getDateString,
  getDateFromTimestamp
} from "../../../../../common/util/DateUtils";
import { InscriptionsLiees } from "./InscriptionsLiees";
import {
  NatureFicheRcUtil,
  TypeNatureFicheRc
} from "../../../../../../model/etatcivil/NatureRc";
import { MandataireUtil } from "../../../../../../model/etatcivil/Mandataires";
import { InscriptionRcUtil } from "../../../../../../model/etatcivil/InscriptionRc";
import { FicheUtil } from "../../../../../../model/etatcivil/TypeFiche";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";
import {
  NatureFicheRcaUtil,
  TypeNatureFicheRca
} from "../../../../../../model/etatcivil/NatureRca";

export function getInscriptionRepertoireCivil(
  retourBack: IFicheRcRca
): AccordionPartProps {
  return {
    contents: FicheUtil.isFicheRca(retourBack.categorie)
      ? getInteresseRca(retourBack)
      : getInteresseRc(retourBack),
    title: FicheUtil.isFicheRca(retourBack.categorie)
      ? "Inscrition au répertoire civil annexe"
      : "Inscrition au répertoire civil"
  };
}

function getInteresseRc(retourBack: IFicheRcRca): AccordionContentProps[] {
  return [
    {
      libelle: "Nature",
      value: NatureFicheRcUtil.getLibelle(
        retourBack.nature as TypeNatureFicheRc
      )
    },
    {
      libelle: "Mandataire(s)",
      value: retourBack.mandataires
        ? retourBack.mandataires
            .map(mandataire => MandataireUtil.getLibelle(mandataire))
            .join(" / ")
        : ""
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
  ];
}

function getInteresseRca(retourBack: IFicheRcRca): AccordionContentProps[] {
  return [
    {
      libelle: "Nature",
      value: NatureFicheRcaUtil.getLibelle(
        retourBack.nature as TypeNatureFicheRca
      )
    },
    {
      libelle: "Type inscription",
      value: getTypeInscription(retourBack)
    },

    {
      libelle: "Date d'inscription",
      value: retourBack.dateInscription
        ? getDateString(getDateFromTimestamp(retourBack.dateInscription))
        : ""
    }
  ];
}

function getTypeInscription(retourBack: IFicheRcRca): JSX.Element {
  return (
    <span style={{ display: "flex" }}>
      {`${InscriptionRcUtil.getLibelle(retourBack.typeInscription)} ${
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

function getInscriptionsImpactees(retourBack: IFicheRcRca): JSX.Element[] {
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
              numero={`${inscription.annee} - ${inscription.numero}`}
            />

            {retourBack.inscriptionsImpactees.length - 1 === index ? "" : ", "}
          </span>
        );
      }
    );
  }

  return inscriptionsImpactee;
}
