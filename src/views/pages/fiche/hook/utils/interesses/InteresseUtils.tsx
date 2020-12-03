import React from "react";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { IFicheRc, IInteresse } from "../../FicheRcInterfaces";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { sortObjectWithNumeroOrdre } from "../../../../../common/util/Utils";
import { getText } from "../../../../../common/widget/Text";
import { Mariage } from "./Mariage";

import "./sass/Interesse.scss";

const VILLES_NAISSANCE = ["MARSEILLE", "LYON", "PARIS"];

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
            value: interesse.nomFamille || ""
          },
          {
            libelle: "Autre(s) nom(s)",
            value: (
              <span className="interesseAutreNom">
                {interesse.autreNoms ? interesse.autreNoms.join(", ") : ""}
              </span>
            )
          },
          {
            libelle: "Prénom(s)",
            value: interesse.prenoms
              ? [...interesse.prenoms]
                  .sort((p1, p2) =>
                    sortObjectWithNumeroOrdre(p1, p2, "numeroOrdre")
                  )
                  .map(prenom => prenom.prenom)
                  .join(", ")
              : ""
          },
          {
            libelle: "Autre(s) prénom(s)",
            value: interesse.autrePrenoms
              ? interesse.autrePrenoms.join(", ")
              : ""
          },
          {
            libelle: "Date de naissance",
            value: interesse.dateNaissance
              ? getDateStringFromDateCompose(interesse.dateNaissance)
              : ""
          },
          {
            libelle: "Lieu de naissance",
            value: getLieuNaissance(interesse)
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

  interessePart.push({
    contents: [
      {
        libelle: "",
        value: <Mariage {...retourBack.mariageInteresses} />,
        className: "interesseMariage"
      }
    ],
    title: "",
    columnIndex: 0
  });

  return interessePart;
}

function getLieuNaissance(interesse: IInteresse): string {
  if (
    interesse.paysNaissance &&
    interesse.paysNaissance.toUpperCase() === "FRANCE"
  ) {
    if (!VILLES_NAISSANCE.includes(interesse.villeNaissance.toUpperCase())) {
      return `${interesse.villeNaissance} (${interesse.regionNaissance})`;
    } else if (interesse.villeNaissance.toUpperCase() !== "PARIS") {
      return `${interesse.villeNaissance} Arrdt${interesse.arrondissementNaissance} (${interesse.regionNaissance})`;
    } else {
      return `${interesse.villeNaissance} Arrdt${interesse.arrondissementNaissance}`;
    }
  } else {
    const region = `- ${interesse.regionNaissance}`;
    return `${interesse.villeNaissance} ${
      interesse.regionNaissance ? region : ""
    } (${interesse.paysNaissance})`;
  }
}
