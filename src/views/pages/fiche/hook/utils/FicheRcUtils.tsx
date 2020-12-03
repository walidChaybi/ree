import React from "react";
import { IFicheRc } from "../FicheRcInterfaces";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";
import {
  getDateString,
  getDateFromTimestamp
} from "../../../../common/util/DateUtils";
import { AccordionReceProps } from "../../../../common/widget/accordion/AccordionRece";
import { AutoriteUtil } from "../../../../../model/ficheRcRca/TypeAutorite";
import { DecisionUtil } from "../../../../../model/ficheRcRca/TypeDecision";
import { getInscriptionRepertoireCivil } from "./InscriptionRepertoireCivilUtils";
import { getInteresse } from "./InteresseUtils";

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
