import { DATE_EFFET_POUR_TIERS, getContentLieu } from "@pages/fiche/hook/constructionComposants/pacs/FichePacsUtils";
import DateUtils from "@util/DateUtils";
import { SectionPartProps } from "@widget/section/SectionPart";
import { IActionDatee } from "../commun/IActionDatee";
import { IAutorite } from "../commun/IAutorite";
import { DecisionAnnulation, DecisionAnnulationUtil } from "../enum/DecisionAnnulation";

export interface IAnnulation extends IActionDatee {
  type: DecisionAnnulation;
  autorite: IAutorite;
  enrolementRG?: string;
  enrolementPortalis?: string;
}

export const AnnulationUtils = {
  getTypeDecision(annulation: IAnnulation): string {
    return DecisionAnnulationUtil.getLibelle(annulation.type);
  },
  getDate(annulation: IAnnulation): string {
    return DateUtils.getFormatDateFromTimestamp(annulation.date);
  },
  getDateEffet(annulation: IAnnulation): string {
    return DateUtils.getFormatDateFromTimestamp(annulation.dateEffet);
  },
  getJuridiction(annulation: IAnnulation): string {
    return annulation.autorite?.typeJuridiction ? annulation.autorite.typeJuridiction : "";
  },
  getEnrolementRG(annulation: IAnnulation): string {
    return annulation.enrolementRG ?? "";
  },
  getEnrolementPortalis(annulation: IAnnulation): string {
    return annulation.enrolementPortalis ?? "";
  },

  commeSectionPartProps(annulation: IAnnulation): SectionPartProps[] {
    const part1: SectionPartProps = {
      partContent: {
        contents: [
          {
            libelle: "Type de décision",
            value: AnnulationUtils.getTypeDecision(annulation)
          },
          {
            libelle: "Date",
            value: AnnulationUtils.getDate(annulation)
          },
          {
            libelle: DATE_EFFET_POUR_TIERS,
            value: AnnulationUtils.getDateEffet(annulation)
          },
          {
            libelle: "Juridiction",
            value: AnnulationUtils.getJuridiction(annulation)
          },
          {
            libelle: "Enrôlement RG",
            value: AnnulationUtils.getEnrolementRG(annulation)
          },
          {
            libelle: "Enrôlement Portalis",
            value: AnnulationUtils.getEnrolementPortalis(annulation)
          }
        ]
      }
    };

    const part2: SectionPartProps = {
      partContent: {
        contents: getContentLieu(annulation.autorite)
      }
    };

    return [part1, part2];
  }
};
