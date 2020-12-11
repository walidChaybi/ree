import React from "react";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { IFicheRc } from "../../../../../../model/ficheRcRca/FicheRcInterfaces";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { sortObjectWithNumeroOrdre } from "../../../../../common/util/Utils";
import { getText } from "../../../../../common/widget/Text";
import { Mariage } from "./Mariage";
import { LieuxUtils } from "../../../../../../model/Lieux";

export function getInteresse(retourBack: IFicheRc): AccordionPartProps[] {
  const sortedInteresses = [...retourBack.interesses].sort((i1, i2) =>
    sortObjectWithNumeroOrdre(i1, i2, "numeroOrdreSaisi")
  );

  const interessePart: AccordionPartProps[] = sortedInteresses.map(
    interesse => {
      return {
        contents: [
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
                  ? [...interesse.prenoms]
                      .sort((p1, p2) =>
                        sortObjectWithNumeroOrdre(p1, p2, "numeroOrdre")
                      )
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
                {interesse.autrePrenoms
                  ? interesse.autrePrenoms.join(", ")
                  : ""}
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
        ],
        title: getText("vue-rc-interesse", [interesse.numeroOrdreSaisi])
      };
    }
  );

  if (retourBack.mariageInteresses) {
    interessePart.push({
      contents: [
        {
          libelle: "",
          value: <Mariage {...retourBack.mariageInteresses} />,
          className: "mariageContainer"
        }
      ],
      title: "",
      columnIndex: 0
    });
  }

  return interessePart;
}
