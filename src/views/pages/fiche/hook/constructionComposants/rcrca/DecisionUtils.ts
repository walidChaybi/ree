import { TypeAutoriteUtil } from "@model/etatcivil/enum/TypeAutorite";
import { FicheUtil, TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { IDecisionRcRca } from "@model/etatcivil/rcrca/DecisionRcRca";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import DateUtils from "@util/DateUtils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";

export function getDecision(rcrca: FicheRcRca): SectionPartProps[] {
  let contentsDecision: SectionContentProps[] = [];

  if (rcrca.decision) {
    if (TypeAutoriteUtil.isJuridiction(rcrca.decision.autorite.typeAutorite)) {
      contentsDecision = [...getContentJuridiction(rcrca.decision, rcrca.categorie)];
    } else if (
      TypeAutoriteUtil.isNotaire(rcrca.decision.autorite.typeAutorite) ||
      (TypeAutoriteUtil.isOnac(rcrca.decision.autorite.typeAutorite) && FicheUtil.isFicheRca(rcrca.categorie))
    ) {
      contentsDecision = [...getContentNotaire(rcrca.decision)];
    }
  }

  const decision: SectionPartProps[] = [
    {
      partContent: {
        contents: contentsDecision,
        title: "Décision"
      }
    }
  ];

  if (rcrca.decision?.sourceConfirmation != null && rcrca.decision.type != null) {
    decision.push({
      partContent: {
        contents: [...getContentConfirmationDecision(rcrca.decision, rcrca.categorie)],
        title: "Confirmée par la décision"
      }
    });
  }
  return decision;
}

function getContentJuridiction(decision: IDecisionRcRca, typeFiche: TypeFiche): SectionContentProps[] {
  const result = [
    {
      libelle: "Type",
      value: decision.type
    },
    {
      libelle: "Date",
      value: decision.dateDecision != null ? DateUtils.getDateString(DateUtils.getDateFromTimestamp(decision.dateDecision)) : ""
    }
  ];

  if (FicheUtil.isFicheRca(typeFiche) && decision.dateDecisionEtrangere != null) {
    result.push({
      libelle: "Date décision étrangère",
      value: decision.dateDecisionEtrangere ? DateUtils.getDateString(DateUtils.getDateFromTimestamp(decision.dateDecisionEtrangere)) : ""
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

function getContentNotaire(decision: IDecisionRcRca): SectionContentProps[] {
  return [
    {
      libelle: "Type",
      value: decision.type
    },
    {
      libelle: "Date",
      value: decision.dateDecision != null ? DateUtils.getDateString(DateUtils.getDateFromTimestamp(decision.dateDecision)) : ""
    }
  ];
}

function getContentConfirmationDecision(decision: IDecisionRcRca, typeFiche: TypeFiche): SectionContentProps[] {
  if (TypeAutoriteUtil.isJuridiction(decision.sourceConfirmation?.autorite.typeAutorite)) {
    const confirmationDecision = [
      {
        libelle: "Type",
        value: decision.sourceConfirmation?.type ?? ""
      },
      {
        libelle: "Date",
        value: decision.sourceConfirmation?.dateDecision
          ? DateUtils.getDateString(DateUtils.getDateFromTimestamp(decision.sourceConfirmation.dateDecision))
          : ""
      }
    ];

    if (
      FicheUtil.isFicheRca(typeFiche) &&
      decision.sourceConfirmation?.dateDecisionEtrangere != null &&
      TypeAutoriteUtil.isJuridiction(decision.sourceConfirmation.autorite.typeAutorite)
    ) {
      confirmationDecision.push({
        libelle: "Date décision étrangère",
        value: decision.sourceConfirmation.dateDecisionEtrangere
          ? DateUtils.getDateString(DateUtils.getDateFromTimestamp(decision.sourceConfirmation.dateDecisionEtrangere))
          : ""
      });
    }

    return confirmationDecision.concat([
      {
        libelle: "Enrôlement RG",
        value: decision.sourceConfirmation?.enrolementRg ?? ""
      },
      {
        libelle: "Enrôlement Portalis",
        value: decision.sourceConfirmation?.enrolementPortalis ?? ""
      }
    ]);
  } else {
    return [];
  }
}
