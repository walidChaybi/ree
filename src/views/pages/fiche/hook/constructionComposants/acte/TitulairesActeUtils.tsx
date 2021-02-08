import React from "react";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { triListeObjetsSurPropriete } from "../../../../../common/util/Utils";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import {
  ITitulaireActe,
  TitulaireActe
} from "../../../../../../model/etatcivil/acte/ITitulaireActe";

export function getTitulaires(acte: IFicheActe): AccordionPartProps[] {
  const sortedTitulaires = triListeObjetsSurPropriete(
    [...acte.titulaires],
    "numeroOrdreSaisi"
  );

  return sortedTitulaires.map((titulaire, index) => {
    return {
      contentsPart: {
        contents: getTitulairesInfo(titulaire, index + 1)
      }
    };
  });
}

function getTitulairesInfo(
  titulaire: ITitulaireActe,
  index: number
): AccordionContentProps[] {
  return [
    {
      libelle: `Nom Titulaire ${index}`,
      value: <span>{TitulaireActe.getNom(titulaire)}</span>
    },
    {
      libelle: `Prénom 1`,
      value: <span>{TitulaireActe.getPrenom1(titulaire)}</span>
    },
    {
      libelle: `Prénom 2`,
      value: <span>{TitulaireActe.getPrenom2(titulaire)}</span>
    },
    {
      libelle: `Prénom 3`,
      value: <span>{TitulaireActe.getPrenom3(titulaire)}</span>
    },
    {
      libelle: "Né(e) le",
      value: <span>{TitulaireActe.getDateNaissance(titulaire)}</span>
    },
    {
      libelle: "Sexe",
      value: <span>{TitulaireActe.getSexe(titulaire)}</span>
    },
    {
      libelle: "Lieu de naissance",
      value: <span>{TitulaireActe.getLieuNaissance(titulaire)}</span>
    }
  ];
}
