import { DecisionUtil } from "../../../../../model/ficheRcRca/TypeDecision";
import {
  getDateString,
  getDateFromTimestamp
} from "../../../../common/util/DateUtils";
import { IFicheRc } from "../FicheRcInterfaces";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";

export function getDecision(retourBack: IFicheRc): AccordionPartProps[] {
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
