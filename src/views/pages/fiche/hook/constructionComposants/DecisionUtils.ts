import { DecisionUtil } from "../../../../../model/etatcivil/TypeDecision";
import {
  getDateString,
  getDateFromTimestamp
} from "../../../../common/util/DateUtils";
import {
  IFicheRcRca,
  IDecisionRc
} from "../../../../../model/etatcivil/FicheInterfaces";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";
import { AccordionContentProps } from "../../../../common/widget/accordion/AccordionContent";
import { TypeAutoriteUtil } from "../../../../../model/etatcivil/TypeAutorite";
import { FicheUtil, TypeFiche } from "../../../../../model/etatcivil/TypeFiche";

export function getDecision(retourBack: IFicheRcRca): AccordionPartProps[] {
  let contentsDecision: AccordionContentProps[] = [];

  if (
    TypeAutoriteUtil.isJuridiction(retourBack.decision.autorite.typeAutorite)
  ) {
    contentsDecision = [
      ...getContentJuridiction(retourBack.decision, retourBack.categorie)
    ];
  } else if (
    TypeAutoriteUtil.isNotaire(retourBack.decision.autorite.typeAutorite) ||
    (TypeAutoriteUtil.isOnac(retourBack.decision.autorite.typeAutorite) &&
      FicheUtil.isFicheRca(retourBack.categorie))
  ) {
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
      contents: [
        ...getContentConfirmationDecision(
          retourBack.decision,
          retourBack.categorie
        )
      ],
      title: "Confirmée par la décision"
    });
  }
  return decision;
}

function getContentJuridiction(
  decision: IDecisionRc,
  typeFiche: TypeFiche
): AccordionContentProps[] {
  const result = [
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

  if (
    FicheUtil.isFicheRca(typeFiche) &&
    decision.dateDecisionEtrangere != null
  ) {
    result.push({
      libelle: "Date décision étrangère",
      value: decision.dateDecisionEtrangere
        ? getDateString(getDateFromTimestamp(decision.dateDecisionEtrangere))
        : ""
    });
  }

  return result.concat([
    {
      libelle: "Enrôlement RG",
      value: decision.enrolementRg || ""
    },
    {
      libelle: "Enrôlement Portalis",
      value: decision.enrolementPortalis || ""
    }
  ]);
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
  decision: IDecisionRc,
  typeFiche: TypeFiche
): AccordionContentProps[] {
  if (
    TypeAutoriteUtil.isJuridiction(
      decision.sourceConfirmation.autorite.typeAutorite
    )
  ) {
    const confirmationDecision = [
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
      }
    ];

    if (
      FicheUtil.isFicheRca(typeFiche) &&
      decision.sourceConfirmation.dateDecisionEtrangere != null &&
      TypeAutoriteUtil.isJuridiction(
        decision.sourceConfirmation.autorite.typeAutorite
      )
    ) {
      confirmationDecision.push({
        libelle: "Date décision étrangère",
        value: decision.sourceConfirmation.dateDecisionEtrangere
          ? getDateString(
              getDateFromTimestamp(
                decision.sourceConfirmation.dateDecisionEtrangere
              )
            )
          : ""
      });
    }

    return confirmationDecision.concat([
      {
        libelle: "Enrôlement RG",
        value: decision.sourceConfirmation.enrolementRg || ""
      },
      {
        libelle: "Enrôlement Portalis",
        value: decision.sourceConfirmation.enrolementPortalis || ""
      }
    ]);
  } else {
    return [];
  }
}
