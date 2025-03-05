import {
  DATE_EFFET_POUR_TIERS,
  getContentAutorite,
  getContentLieu,
  getContentNotaire
} from "@pages/fiche/hook/constructionComposants/pacs/FichePacsUtils";
import DateUtils from "@util/DateUtils";
import { SectionPartProps } from "@widget/section/SectionPart";
import { IActionDatee } from "../commun/IActionDatee";
import { IAutorite } from "../commun/IAutorite";

export interface IDissolution extends IActionDatee {
  autorite: IAutorite;
  motif: string;
}

export const DissolutionUtils = {
  getDate(dissolution: IDissolution) {
    return DateUtils.getFormatDateFromTimestamp(dissolution.date);
  },
  getDateEffet(dissolution: IDissolution) {
    return DateUtils.getFormatDateFromTimestamp(dissolution.dateEffet);
  },
  getMotif(dissolution: IDissolution) {
    return dissolution.motif;
  },
  commeSectionPartProps(dissolution: IDissolution): SectionPartProps[] {
    const part1: SectionPartProps = {
      partContent: {
        contents: [
          getContentAutorite(dissolution.autorite),
          ...getContentNotaire(dissolution.autorite),
          {
            libelle: "Date d'enregistrement de la dissolution",
            value: DissolutionUtils.getDate(dissolution)
          },
          {
            libelle: DATE_EFFET_POUR_TIERS,
            value: DissolutionUtils.getDateEffet(dissolution)
          },
          {
            libelle: "Motif",
            value: DissolutionUtils.getMotif(dissolution)
          }
        ]
      }
    };

    const part2: SectionPartProps = {
      partContent: {
        title: "",
        contents: getContentLieu(dissolution.autorite)
      }
    };

    return [part1, part2];
  }
};
