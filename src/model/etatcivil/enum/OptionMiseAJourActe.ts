import { SousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import { Option } from "@util/Type";

export enum EOptionMiseAJourActe {
  MENTION_SUITE_AVIS = "Apposer mention(s) suite à avis",
  MENTION_AUTRE = "Apposer mention(s) autre",
  ANALYSE_MARGINALE = "Modifier l'analyse marginale"
}

export const OptionMiseAJourActe = {
  commeOptions: (droitsMiseAJour: {
    mentions: boolean;
    analyseMarginale: boolean;
  }): Option[] => [
    ...(droitsMiseAJour.mentions
      ? [
          {
            cle: EOptionMiseAJourActe.MENTION_SUITE_AVIS,
            libelle: EOptionMiseAJourActe.MENTION_SUITE_AVIS
          },
          {
            cle: EOptionMiseAJourActe.MENTION_AUTRE,
            libelle: EOptionMiseAJourActe.MENTION_AUTRE
          }
        ]
      : []),
    ...(droitsMiseAJour.analyseMarginale
      ? [
          {
            cle: EOptionMiseAJourActe.ANALYSE_MARGINALE,
            libelle: EOptionMiseAJourActe.ANALYSE_MARGINALE
          }
        ]
      : [])
  ],

  getSousType: (
    optionMiseAJour: EOptionMiseAJourActe
  ): typeof SousTypeMiseAJour.RMAC | typeof SousTypeMiseAJour.RMAR =>
    optionMiseAJour === EOptionMiseAJourActe.MENTION_SUITE_AVIS
      ? SousTypeMiseAJour.RMAC
      : SousTypeMiseAJour.RMAR
} as const;
