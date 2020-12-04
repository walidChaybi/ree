import { DecisionUtil } from "../../../../../model/ficheRcRca/TypeDecision";
import {
  getDateString,
  getDateFromTimestamp
} from "../../../../common/util/DateUtils";
import {
  IFicheRc,
  IDecisionRc
} from "../../../../../model/ficheRcRca/FicheRcInterfaces";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";
import { AccordionContentProps } from "../../../../common/widget/accordion/AccordionContent";
import { AutoriteUtil } from "../../../../../model/ficheRcRca/TypeAutorite";

export function getDecision(retourBack: IFicheRc): AccordionPartProps[] {
  let contentsDecision: AccordionContentProps[] = [];

  if (AutoriteUtil.isJuridiction(retourBack.decision.autorite.type)) {
    contentsDecision = [...getContentJuridiction(retourBack.decision)];
  } else if (AutoriteUtil.isNotaire(retourBack.decision.autorite.type)) {
    contentsDecision = [...getContentNotaire(retourBack.decision)];
  }

  const decision: AccordionPartProps[] = [
    {
      contents: contentsDecision,
      title: "Décision"
    }
  ];

  if (
    retourBack.decision.sourceConfirmation != null &&
    retourBack.decision.type != null
  ) {
    decision.push({
      contents: [...getContentConfirmationDecision(retourBack.decision)],
      title: "Confirmée par la décision"
    });
  }

  return decision;
}

function getContentJuridiction(decision: IDecisionRc): AccordionContentProps[] {
  return [
    {
      libelle: "Type",
      value: DecisionUtil.getLibelle(decision.type)
    },
    {
      libelle: "Date",
      value:
        decision.dateDecision != null
          ? getDateString(getDateFromTimestamp(decision.dateDecision))
          : ""
    },
    {
      libelle: "Enrôlement RG",
      value: decision.enrolementRg || ""
    },
    {
      libelle: "Enrôlement Portalis",
      value: decision.enrolementPortalis || ""
    }
  ];
}

function getContentNotaire(decision: IDecisionRc): AccordionContentProps[] {
  return [
    {
      libelle: "Type",
      value: DecisionUtil.getLibelle(decision.type)
    },
    {
      libelle: "Date",
      value:
        decision.dateDecision != null
          ? getDateString(getDateFromTimestamp(decision.dateDecision))
          : ""
    }
  ];
}

function getContentConfirmationDecision(
  decision: IDecisionRc
): AccordionContentProps[] {
  if (AutoriteUtil.isJuridiction(decision.sourceConfirmation.autorite.type)) {
    return [
      {
        libelle: "Type",
        value: DecisionUtil.getLibelle(decision.sourceConfirmation.type)
      },
      {
        libelle: "Date",
        value: decision.sourceConfirmation.dateDecision
          ? getDateString(
              getDateFromTimestamp(decision.sourceConfirmation.dateDecision)
            )
          : ""
      },
      {
        libelle: "Enrôlement RG",
        value: decision.sourceConfirmation.enrolementRg || ""
      },
      {
        libelle: "Enrôlement Portalis",
        value: decision.sourceConfirmation.enrolementPortalis || ""
      }
    ];
  } else {
    return [];
  }
}
