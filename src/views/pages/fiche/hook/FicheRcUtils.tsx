import React from "react";
import { IFicheRc, IInteresse } from "./FicheRcInterfaces";
import { AccordionPartProps } from "../../../common/widget/accordion/AccordionPart";
import {
  getDateString,
  getDateFromTimestamp,
  getDateStringFromDateCompose
} from "../../../common/util/DateUtils";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getText } from "../../../common/widget/Text";
import { AutoriteUtil } from "../../../../model/ficheRcRca/TypeAutorite";
import { DecisionUtil } from "../../../../model/ficheRcRca/TypeDecision";
import { LienFiche } from "../LienFiche";

export function getRcRcaVue(retourBack: IFicheRc): AccordionReceProps {
  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(retourBack)] },
          { parts: getInteresse(retourBack) },
          { parts: getDecision(retourBack) },
          { parts: getAutorite(retourBack) }
        ],
        title: "Vue du RC"
      }
    ]
  };
}

function getInscriptionRepertoireCivil(
  retourBack: IFicheRc
): AccordionPartProps {
  return {
    contents: [
      { libelle: "Nature", value: retourBack.nature || "" },
      {
        libelle: "Mandataire(s)",
        value: retourBack.mandataires ? retourBack.mandataires.join(" / ") : ""
      },
      //TODO modifier le link
      {
        libelle: "Type inscription",
        value: (
          <span style={{ display: "flex" }}>
            {retourBack.typeInscription
              ? `${retourBack.typeInscription} (`
              : ""}

            {getInscriptionsImpactees(retourBack)}
            {")"}
          </span>
        )
      },
      {
        libelle: "Inscription(s) liée(s)",
        value: retourBack.inscriptionsLiees ? (
          <span style={{ display: "flex" }}>
            {retourBack.inscriptionsLiees.map((inscription, index) => (
              <span
                key={`inscription-liees-lien-${inscription.numeroRc}`}
                style={{ display: "flex", whiteSpace: "pre" }}
              >
                {`${inscription.typeInscription} (${"RC n°"}`}
                <LienFiche
                  identifiant={inscription.idInscription}
                  categorie={"rc"}
                  numero={inscription.numeroRc}
                />

                {`)${
                  index !== retourBack.inscriptionsLiees.length - 1 ? ", " : ""
                }`}
              </span>
            ))}
          </span>
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
        value: retourBack.duree.uniteDuree
          ? `${retourBack.duree.nombreDuree} ${retourBack.duree.uniteDuree}`
          : `${retourBack.duree.autreDuree}`
      },
      {
        libelle: "Date fin de mesure",
        value: retourBack.duree.dateFinDeMesure
          ? getDateString(
              getDateFromTimestamp(retourBack.duree.dateFinDeMesure)
            )
          : ""
      }
    ],
    title: "Inscrition au répertoire civil"
  };
}

function getInscriptionsImpactees(retourBack: IFicheRc): JSX.Element[] {
  let inscriptionsImpactee: JSX.Element[] = [];
  if (retourBack.inscriptionsImpactees) {
    inscriptionsImpactee = retourBack.inscriptionsImpactees.map(
      (inscription, index) => {
        const key = `link-fiche-rc-${inscription.id || ""}`;
        return (
          <span key={key} style={{ display: "flex", whiteSpace: "pre" }}>
            {`RC n°`}
            <LienFiche
              identifiant={inscription.id}
              categorie={"rc"}
              numero={inscription.numero}
            />

            {retourBack.inscriptionsImpactees.length - 1 === index ? "" : ", "}
          </span>
        );
      }
    );
  }

  return inscriptionsImpactee;
}

function getInteresse(retourBack: IFicheRc): AccordionPartProps[] {
  return retourBack.interesses.sort(sortInteresse).map(interesse => {
    return {
      contents: [
        {
          libelle: "Nom",
          value: interesse.nomFamille || ""
        },
        {
          libelle: "Autre(s) nom(s)",
          value: interesse.autreNoms ? interesse.autreNoms.join(", ") : ""
        },
        {
          libelle: "Prénom(s)",
          value: interesse.prenoms
            ? interesse.prenoms.map(prenom => prenom.prenom).join(", ")
            : ""
        },
        {
          libelle: "Autre(s) prénom(s)",
          value: interesse.autrePrenoms ? interesse.autrePrenoms.join(", ") : ""
        },
        {
          libelle: "Date de naissance",
          value: interesse.dateNaissance
            ? getDateStringFromDateCompose(interesse.dateNaissance)
            : ""
        },
        {
          libelle: "Lieu de naissance",
          value: `${interesse.villeNaissance || ""} (${
            interesse.paysNaissance || ""
          })`
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
  });
}

function sortInteresse(interesse1: IInteresse, interesse2: IInteresse) {
  if (interesse1.numeroOrdreSaisi < interesse2.numeroOrdreSaisi) {
    return -1;
  } else if (interesse1.numeroOrdreSaisi > interesse2.numeroOrdreSaisi) {
    return 1;
  } else {
    return 0;
  }
}

function getDecision(retourBack: IFicheRc): AccordionPartProps[] {
  const decision = [
    {
      contents: [
        {
          libelle: "Type",
          value: DecisionUtil.getLibelle(retourBack.decision.type)
        },
        {
          libelle: "Date",
          value: retourBack.decision.dateDecision
            ? getDateString(
                getDateFromTimestamp(retourBack.decision.dateDecision)
              )
            : ""
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decision.enrolementRg || ""
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decision.enrolementPortalis || ""
        }
      ],
      title: "Décision"
    }
  ];

  if (retourBack.decision.sourceConfirmation != null) {
    decision.push({
      contents: [
        {
          libelle: "Type",
          value: DecisionUtil.getLibelle(
            retourBack.decision.sourceConfirmation.type
          )
        },
        {
          libelle: "Date",
          value: retourBack.decision.sourceConfirmation.dateDecision
            ? getDateString(
                getDateFromTimestamp(
                  retourBack.decision.sourceConfirmation.dateDecision
                )
              )
            : ""
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decision.sourceConfirmation.enrolementRg || ""
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decision.sourceConfirmation.enrolementPortalis || ""
        }
      ],
      title: "Confirmée par la décisio"
    });
  }

  return decision;
}

function getAutorite(retourBack: IFicheRc): AccordionPartProps[] {
  const autorite: AccordionPartProps[] = [
    {
      contents: [
        {
          libelle: "Type",
          value: AutoriteUtil.getLibelle(retourBack.decision.autorite.type)
        },
        {
          libelle: "Ville",
          value: retourBack.decision.autorite.ville || ""
        },
        {
          libelle: "Arrondissement",
          value: `${retourBack.decision.autorite.arrondissement || ""}`
        },
        {
          libelle: "Département",
          value: `${retourBack.decision.autorite.libelleDepartement || ""} (${
            retourBack.decision.autorite.numeroDepartement || ""
          })`
        }
      ],
      title: "Autorité"
    }
  ];

  if (retourBack.decision.sourceConfirmation != null) {
    autorite.push(getSourceConfirmation(retourBack));
  }

  return autorite;
}

function getSourceConfirmation(retourBack: IFicheRc): AccordionPartProps {
  return {
    contents: [
      {
        libelle: "Type",
        value: DecisionUtil.getLibelle(
          retourBack.decision.sourceConfirmation.type
        )
      },
      {
        libelle: "Ville",
        value: retourBack.decision.sourceConfirmation.autorite.ville || ""
      },
      {
        libelle: "Arrondissement",
        value: `${
          retourBack.decision.sourceConfirmation.autorite.arrondissement || ""
        }`
      },
      {
        libelle: "Département",
        value: `${
          retourBack.decision.sourceConfirmation.autorite.libelleDepartement ||
          ""
        } (${
          retourBack.decision.sourceConfirmation.autorite.numeroDepartement ||
          ""
        })`
      }
    ],
    title: ""
  };
}
