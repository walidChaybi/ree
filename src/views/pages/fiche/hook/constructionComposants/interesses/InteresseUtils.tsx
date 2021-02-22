import React from "react";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { IInteresse } from "../../../../../../model/etatcivil/fiche/IInteresse";
import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { triListeObjetsSurPropriete } from "../../../../../common/util/Utils";
import { getText, getLibelle } from "../../../../../common/widget/Text";
import { Mariage } from "./Mariage";
import { LieuxUtils } from "../../../../../../model/LieuxUtils";
import { FicheUtil } from "../../../../../../model/etatcivil/enum/TypeFiche";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";

export function getInteresse(retourBack: IFicheRcRca): AccordionPartProps[] {
  const sortedInteresses = triListeObjetsSurPropriete(
    [...retourBack.interesses],
    "numeroOrdreSaisi"
  );

  const interessePart: AccordionPartProps[] = sortedInteresses.map(
    interesse => {
      return {
        contentsPart: {
          contents: FicheUtil.isFicheRca(retourBack.categorie)
            ? getInteresseInfoRca(interesse)
            : getInteresseInfo(interesse),
          title: getText("vue-rc-interesse", [interesse.numeroOrdreSaisi])
        }
      };
    }
  );

  if (retourBack.mariageInteresses) {
    interessePart.push({
      contentsPart: {
        contents: [
          {
            libelle: "",
            value: <Mariage {...retourBack.mariageInteresses} />
          }
        ]
      },
      classNameContent: "mariageContainer"
    });
  }

  return interessePart;
}

function getInteresseInfoRca(interesse: IInteresse): AccordionContentProps[] {
  let interesseIno = getInteresseInfo(interesse);
  if (interesse.dateDeces != null) {
    interesseIno = interesseIno.concat([
      {
        libelle: getLibelle("Date de décès"),
        value: interesse.dateDeces
          ? getDateStringFromDateCompose(interesse.dateDeces)
          : ""
      },
      {
        libelle: getLibelle("Lieu de décès"),
        value: LieuxUtils.getLieu(
          interesse.villeDeces,
          interesse.regionDeces,
          interesse.paysDeces,
          interesse.arrondissementDeces
        )
      }
    ]);
  }

  return interesseIno;
}

function getInteresseInfo(interesse: IInteresse): AccordionContentProps[] {
  return [
    {
      libelle: getLibelle("Nom"),
      value: <span className="nom">{interesse.nomFamille || ""}</span>
    },
    {
      libelle: getLibelle("Autre(s) nom(s)"),
      value: (
        <span className="nom">
          {interesse.autreNoms ? interesse.autreNoms.join(", ") : ""}
        </span>
      )
    },
    {
      libelle: getLibelle("Prénom(s)"),
      value: (
        <span className="prenom">
          {interesse.prenoms
            ? triListeObjetsSurPropriete([...interesse.prenoms], "numeroOrdre")
                .map(prenom => prenom.prenom)
                .join(", ")
            : ""}
        </span>
      )
    },
    {
      libelle: getLibelle("Autre(s) prénom(s)"),
      value: (
        <span className="prenom">
          {interesse.autrePrenoms ? interesse.autrePrenoms.join(", ") : ""}
        </span>
      )
    },
    {
      libelle: getLibelle("Date de naissance"),
      value: interesse.dateNaissance
        ? getDateStringFromDateCompose(interesse.dateNaissance)
        : ""
    },
    {
      libelle: getLibelle("Lieu de naissance"),
      value: LieuxUtils.getLieu(
        interesse.villeNaissance,
        interesse.regionNaissance,
        interesse.paysNaissance,
        interesse.arrondissementNaissance
      )
    },
    {
      libelle: getLibelle("Nationalité"),
      value: interesse.nationalite || ""
    },
    {
      libelle: getLibelle("Sexe"),
      value: interesse.sexe || ""
    }
  ];
}
