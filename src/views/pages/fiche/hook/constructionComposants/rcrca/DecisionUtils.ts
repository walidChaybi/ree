import { TypeAutoriteUtil } from "../../../../../../model/etatcivil/enum/TypeAutorite";
import { DecisionUtil } from "../../../../../../model/etatcivil/enum/TypeDecision";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../../model/etatcivil/enum/TypeFiche";
import { IDecisionRc } from "../../../../../../model/etatcivil/fiche/IDecisionRc";
import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import {
  getDateFromTimestamp,
  getDateString
} from "../../../../../common/util/DateUtils";
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";

export function getDecision(rcrca: IFicheRcRca): SectionPartProps[] {
  let contentsDecision: SectionContentProps[] = [];

  if (rcrca.decision) {
    if (TypeAutoriteUtil.isJuridiction(rcrca.decision.autorite.typeAutorite)) {
      contentsDecision = [
        ...getContentJuridiction(rcrca.decision, rcrca.categorie)
      ];
    } else if (
      TypeAutoriteUtil.isNotaire(rcrca.decision.autorite.typeAutorite) ||
      (TypeAutoriteUtil.isOnac(rcrca.decision.autorite.typeAutorite) &&
        FicheUtil.isFicheRca(rcrca.categorie))
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

  if (
    rcrca.decision &&
    rcrca.decision.sourceConfirmation != null &&
    rcrca.decision.type != null
  ) {
    decision.push({
      partContent: {
        contents: [
          ...getContentConfirmationDecision(rcrca.decision, rcrca.categorie)
        ],
        title: "Confirmée par la décision"
      }
    });
  }
  return decision;
}

function getContentJuridiction(
  decision: IDecisionRc,
  typeFiche: TypeFiche
): SectionContentProps[] {
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

function getContentNotaire(decision: IDecisionRc): SectionContentProps[] {
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
): SectionContentProps[] {
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
