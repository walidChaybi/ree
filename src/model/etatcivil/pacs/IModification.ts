import DateUtils from "@util/DateUtils";
import { SectionPartProps } from "@widget/section/SectionPart";
import {
  DATE_EFFET_POUR_TIERS,
  getContentAutorite,
  getContentLieu,
  getContentNotaire
} from "../../../views/pages/fiche/hook/constructionComposants/pacs/FichePacsUtils";
import { IActionDatee } from "../commun/IActionDatee";
import { IAutorite } from "../commun/IAutorite";

export interface IModification extends IActionDatee {
  autorite: IAutorite;
}

export const ModificationUtils = {
  getDate(modification: IModification) {
    return DateUtils.getFormatDateFromTimestamp(modification.date);
  },
  getDateEffet(modification: IModification) {
    return DateUtils.getFormatDateFromTimestamp(modification.dateEffet);
  },

  commeSectionPartProps(modification: IModification): SectionPartProps[] {
    const part1: SectionPartProps = {
      partContent: {
        contents: [
          getContentAutorite(modification.autorite),
          ...getContentNotaire(modification.autorite),
          {
            libelle: "Date d'enregistrement de la convention modificative",
            value: ModificationUtils.getDate(modification)
          },
          {
            libelle: DATE_EFFET_POUR_TIERS,
            value: ModificationUtils.getDateEffet(modification)
          }
        ]
      }
    };

    const part2: SectionPartProps = {
      partContent: {
        contents: getContentLieu(modification.autorite)
      }
    };

    return [part1, part2];
  }
};
