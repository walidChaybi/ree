import React from "react";
import { FicheUtil } from "../../../../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { IInteresse } from "../../../../../../model/etatcivil/rcrca/IInteresse";
import { LieuxUtils } from "../../../../../../model/LieuxUtils";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { triListeObjetsSurPropriete } from "../../../../../common/util/Utils";
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";
import { getLibelle, getText } from "../../../../../common/widget/Text";
import { Mariage } from "./Mariage";

export function getInteresse(rcrca: IFicheRcRca): SectionPartProps[] {
  const sortedInteresses = triListeObjetsSurPropriete(
    [...rcrca.interesses],
    "numeroOrdreSaisi"
  );

  const interessePart: SectionPartProps[] = sortedInteresses.map(interesse => {
    return {
      partContent: {
        contents: FicheUtil.isFicheRca(rcrca.categorie)
          ? getInteresseInfoRca(interesse)
          : getInteresseInfo(interesse),
        title: getText("vue-rc-interesse", [interesse.numeroOrdreSaisi])
      }
    };
  });

  if (rcrca.mariageInteresses) {
    interessePart.push({
      partContent: {
        contents: [
          {
            libelle: "",
            value: <Mariage {...rcrca.mariageInteresses} />
          }
        ]
      },
      classNameContent: "mariageContainer"
    });
  }

  return interessePart;
}

function getInteresseInfoRca(interesse: IInteresse): SectionContentProps[] {
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

function getInteresseInfo(interesse: IInteresse): SectionContentProps[] {
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
                .map(prenom => prenom.valeur)
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
