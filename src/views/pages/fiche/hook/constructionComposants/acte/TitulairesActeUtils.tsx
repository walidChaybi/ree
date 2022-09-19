import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import {
  remplaceSNP,
  remplaceSPC,
  triListeObjetsSurPropriete
} from "@util/Utils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";
import React from "react";

export function getTitulaires(acte: IFicheActe): SectionPartProps[] {
  const sortedTitulaires = acte.titulaires
    ? triListeObjetsSurPropriete([...acte.titulaires], "numeroOrdreSaisi")
    : [];

  return sortedTitulaires.map((titulaire, index) => {
    return {
      partContent: {
        contents: getTitulairesInfo(titulaire, Number(index) + 1)
      }
    };
  });
}

function getTitulairesInfo(
  titulaire: ITitulaireActe,
  index: number
): SectionContentProps[] {
  return [
    {
      libelle: `Nom Titulaire ${index}`,
      value: <span>{remplaceSNP(TitulaireActe.getNom(titulaire))}</span>
    },
    {
      libelle: `Prénom 1`,
      value: <span>{remplaceSPC(TitulaireActe.getPrenom1(titulaire))}</span>
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
      value: <span>{TitulaireActe.getSexeOuVide(titulaire)}</span>
    },
    {
      libelle: "Lieu de naissance",
      value: <span>{TitulaireActe.getLieuNaissance(titulaire)}</span>
    }
  ];
}
