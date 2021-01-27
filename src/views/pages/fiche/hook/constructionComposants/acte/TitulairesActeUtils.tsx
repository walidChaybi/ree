import React from "react";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { triListeObjetsSurPropriete } from "../../../../../common/util/Utils";
import { LieuxUtils } from "../../../../../../model/Lieux";
import { SexeUtil } from "../../../../../../model/etatcivil/Sexe";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { ITitulaireActe } from "../../../../../../model/etatcivil/acte/ITitulaireActe";

export function getTitulaires(retourBack: IFicheActe): AccordionPartProps[] {
  const sortedTitulaires = triListeObjetsSurPropriete(
    [...retourBack.titulaires],
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
  const indexPrenom3 = 2;
  return [
    {
      libelle: `Nom Titulaire ${index}`,
      value: <span className="nom">{titulaire.nom || ""}</span>
    },
    {
      libelle: `Prénom 1`,
      value: (
        <span className="prenom">
          {titulaire.prenoms[0] ? titulaire.prenoms[0] : ""}
        </span>
      )
    },
    {
      libelle: `Prénom 2`,
      value: (
        <span className={`prenom2`}>
          {titulaire.prenoms[1] ? titulaire.prenoms[1] : ""}
        </span>
      )
    },
    {
      libelle: `Prénom 3`,
      value: (
        <span className={`prenom3`}>
          {titulaire.prenoms[indexPrenom3]
            ? titulaire.prenoms[indexPrenom3]
            : ""}
        </span>
      )
    },
    {
      libelle: "Né(e) le",
      value: (
        <span>
          {titulaire.naissance
            ? getDateStringFromDateCompose({
                jour: titulaire.naissance.jour.toString(),
                mois: titulaire.naissance.mois.toString(),
                annee: titulaire.naissance.annee.toString()
              })
            : ""}
        </span>
      )
    },
    {
      libelle: "Sexe",
      value: (
        <span>{titulaire.sexe ? SexeUtil.getLibelle(titulaire.sexe) : ""}</span>
      )
    },
    {
      libelle: "Lieu de naissance",
      value: (
        <span>
          {LieuxUtils.getLieu(
            titulaire.naissance.ville,
            titulaire.naissance.region,
            titulaire.naissance.pays,
            titulaire.naissance.arrondissement
          )}
        </span>
      )
    }
  ];
}
