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

  const deux = 2;
  return sortedTitulaires.map((titulaire, index) => {
    return {
      contents: getTitulairesInfo(titulaire, index + 1),
      title: titulaire === sortedTitulaires[0] ? "Titulaires" : " ",
      columnIndex: index % deux === 0 ? 1 : deux
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
      value: <span className="nom">{TitulaireActe.getNom(titulaire)}</span>
    },
    {
      libelle: `Prénom 1`,
      value: (
        <span className="prenom">{TitulaireActe.getPrenom1(titulaire)}</span>
      )
    },
    {
      libelle: `Prénom 2`,
      value: (
        <span className={`prenom2`}>{TitulaireActe.getPrenom2(titulaire)}</span>
      )
    },
    {
      libelle: `Prénom 3`,
      value: (
        <span className={`prenom3`}>{TitulaireActe.getPrenom3(titulaire)}</span>
      )
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
