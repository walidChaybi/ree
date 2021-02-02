import React from "react";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import {
  IFicheRcRca,
  IInteresse
} from "../../../../../../model/etatcivil/FicheInterfaces";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { triListeObjetsSurPropriete } from "../../../../../common/util/Utils";
import { getText } from "../../../../../common/widget/Text";
import { Mariage } from "./Mariage";
import { LieuxUtils } from "../../../../../../model/Lieux";
import { FicheUtil } from "../../../../../../model/etatcivil/TypeFiche";
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
            value: <Mariage {...retourBack.mariageInteresses} />,
            className: "mariageContainer"
          }
        ],
        title: "",
        columnIndex: "0"
      }
    });
  }

  return interessePart;
}

function getInteresseInfoRca(interesse: IInteresse): AccordionContentProps[] {
  let interesseIno = getInteresseInfo(interesse);
  if (interesse.dateDeces != null) {
    interesseIno = interesseIno.concat([
      {
        libelle: "Date de décès",
        value: interesse.dateDeces
          ? getDateStringFromDateCompose(interesse.dateDeces)
          : ""
      },
      {
        libelle: "Lieu de décès",
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
      libelle: "Nom",
      value: <span className="nom">{interesse.nomFamille || ""}</span>
    },
    {
      libelle: "Autre(s) nom(s)",
      value: (
        <span className="nom">
          {interesse.autreNoms ? interesse.autreNoms.join(", ") : ""}
        </span>
      )
    },
    {
      libelle: "Prénom(s)",
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
      libelle: "Autre(s) prénom(s)",
      value: (
        <span className="prenom">
          {interesse.autrePrenoms ? interesse.autrePrenoms.join(", ") : ""}
        </span>
      )
    },
    {
      libelle: "Date de naissance",
      value: interesse.dateNaissance
        ? getDateStringFromDateCompose(interesse.dateNaissance)
        : ""
    },
    {
      libelle: "Lieu de naissance",
      value: LieuxUtils.getLieu(
        interesse.villeNaissance,
        interesse.regionNaissance,
        interesse.paysNaissance,
        interesse.arrondissementNaissance
      )
    },
    {
      libelle: "Nationalité",
      value: interesse.nationalite || ""
    },
    {
      libelle: "Sexe",
      value: interesse.sexe || ""
    }
  ];
}
