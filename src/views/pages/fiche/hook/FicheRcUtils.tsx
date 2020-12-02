import React from "react";
import { IFicheRc } from "./FicheRcInterfaces";
import { AccordionPartProps } from "../../../common/widget/accordion/AccordionPart";
import {
  getDateString,
  getDateFromDateCompose,
  getDateFromTimestamp
} from "../../../common/util/DateUtils";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { Link } from "react-router-dom";
import { getText } from "../../../common/widget/Text";

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
      { libelle: "Nature", value: retourBack.nature },
      {
        libelle: "Mandataire(s)",
        value: retourBack.mandataires.join(" / ")
      },
      //TODO modifier le link
      {
        libelle: "Type inscription",
        value: (
          <span>
            {`${retourBack.typeInscription} (RC n°`}
            {retourBack.inscriptionsImpactees.map(inscription => {
              return (
                <Link
                  key={`link-fiche-rc-${inscription.id}`}
                  to={"/"}
                  className=""
                >
                  {inscription.numero}
                </Link>
              );
            })}

            {`)`}
          </span>
        )
      },
      {
        libelle: "Inscription(s) liée(s)",
        value: retourBack.inscriptionsLiees.map((inscription, index) => (
          <span key={`inscription-liees-lien-${inscription.numeroRc}`}>
            {`${inscription.typeInscription} (${"RC n°"}`}
            <Link to={`rcrca/${inscription.idInscription}`} className="">
              {inscription.numeroRc}
            </Link>
            {`)${
              index !== retourBack.inscriptionsLiees.length - 1 ? ", " : ""
            }`}
          </span>
        ))
      },
      {
        libelle: "Date d'inscription",
        value: getDateString(getDateFromTimestamp(retourBack.dateInscription))
      },
      {
        libelle: "Durée inscription",
        value: `${retourBack.duree.nombreDuree} ${retourBack.duree.uniteDuree}`
      },
      {
        libelle: "Date fin de mesure",
        value: getDateString(
          getDateFromTimestamp(retourBack.duree.dateFinDeMesure)
        )
      }
    ],
    title: "Inscrition au répertoire civil"
  };
}

function getInteresse(retourBack: IFicheRc): AccordionPartProps[] {
  return retourBack.interesses.map((interesse, indexInteresse) => {
    return {
      contents: [
        {
          libelle: "Nom",
          value: interesse.nomFamille
        },
        {
          libelle: "Autre(s) nom(s)",
          value: interesse.autreNoms.join(", ")
        },
        {
          libelle: "Prénom(s)",
          value: interesse.prenoms.map(prenom => prenom.prenom).join(", ")
        },
        {
          libelle: "Autre(s) prénom(s)",
          value: interesse.autrePrenoms.join(", ")
        },
        {
          libelle: "Date de naissance",
          value: getDateString(getDateFromDateCompose(interesse.dateNaissance))
        },
        {
          libelle: "Lieu de naissance",
          value: `${interesse.villeNaissance} (${interesse.paysNaissance})`
        },
        {
          libelle: "Nationalité",
          value: interesse.nationalite
        },
        {
          libelle: "Sexe",
          value: interesse.sexe
        }
      ],
      title: getText("vue-rc-interesse", [indexInteresse + 1])
    };
  });
}

function getDecision(retourBack: IFicheRc): AccordionPartProps[] {
  const decision = [
    {
      contents: [
        {
          libelle: "Type",
          value: retourBack.decision.type
        },
        {
          libelle: "Date",
          value: getDateString(
            getDateFromTimestamp(retourBack.decision.dateDecision)
          )
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decision.enrolementRg
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decision.enrolementPortalis
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
          value: retourBack.decision.sourceConfirmation.type
        },
        {
          libelle: "Date",
          value: getDateString(
            getDateFromTimestamp(
              retourBack.decision.sourceConfirmation.autorite.dateDecision
            )
          )
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decision.sourceConfirmation.enrolementRg
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decision.sourceConfirmation.enrolementPortalis
        }
      ],
      title: "Confirmée par la décisio"
    });
  }

  return decision;
}

function getAutorite(retourBack: IFicheRc): AccordionPartProps[] {
  const autorite = [
    {
      contents: [
        {
          libelle: "Type",
          value: retourBack.decision.autorite.type
        },
        {
          libelle: "Ville",
          value: retourBack.decision.autorite.ville
        },
        {
          libelle: "Arrondissement",
          value: `${retourBack.decision.autorite.arrondissement}`
        },
        {
          libelle: "Département",
          value: `${retourBack.decision.autorite.libelleDepartement} (${retourBack.decision.autorite.numeroDepartement})`
        }
      ],
      title: "Autorité"
    }
  ];

  if (retourBack.decision.sourceConfirmation != null) {
    autorite.push({
      contents: [
        {
          libelle: "Type",
          value: retourBack.decision.sourceConfirmation.type
        },
        {
          libelle: "Ville",
          value: retourBack.decision.sourceConfirmation.autorite.ville
        },
        {
          libelle: "Arrondissement",
          value: `${retourBack.decision.sourceConfirmation.autorite.arrondissement}`
        },
        {
          libelle: "Département",
          value: `${retourBack.decision.sourceConfirmation.autorite.libelleDepartement} (${retourBack.decision.sourceConfirmation.autorite.numeroDepartement})`
        }
      ],
      title: ""
    });
  }

  return autorite;
}
