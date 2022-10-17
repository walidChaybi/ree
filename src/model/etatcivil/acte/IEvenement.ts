import {
  formatAHeure,
  getDateStringFromDateCompose,
  IDateCompose
} from "@util/DateUtils";
import { estRenseigne, getValeurOuVide, numberToString } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export interface IEvenement {
  heure?: number;
  minute?: number;
  jour?: number;
  mois?: number;
  annee?: number;
  voie?: string;
  ville?: string;
  arrondissement?: string;
  region?: string;
  pays: string;
  lieuReprise?: string;
}

export const Evenement = {
  getDate(evenement?: IEvenement): string {
    return evenement
      ? `${getDateStringFromDateCompose({
          jour: numberToString(evenement.jour),
          mois: numberToString(evenement.mois),
          annee: numberToString(evenement.annee)
        })} ${formatAHeure(evenement.heure, evenement.minute)}`
      : "";
  },
  getLieu(evenement?: IEvenement): string {
    return evenement
      ? LieuxUtils.getLieu(
          evenement.ville,
          evenement.region,
          evenement.pays,
          evenement.arrondissement
        )
      : "";
  },
  getLieuCompositionExtraitPlurilingue(evenement?: IEvenement): string {
    return evenement
      ? LieuxUtils.getLieu(evenement.ville, evenement.region, evenement.pays)
      : "";
  },
  estRenseigne(evenement?: IEvenement): boolean {
    return estRenseigne(evenement?.annee);
  },

  estHeureRenseignee(evenement?: IEvenement): boolean {
    return evenement?.heure != null && evenement.minute != null;
  },
  estJourRenseigne(evenement?: IEvenement): boolean {
    return evenement?.jour != null;
  },
  estMoisRenseigne(evenement?: IEvenement): boolean {
    return evenement?.mois != null;
  },
  estAnneeRenseignee(evenement?: IEvenement): boolean {
    return evenement?.annee != null;
  },
  aucuneDonneeDuLieuRenseignee(evenement?: IEvenement): boolean {
    return (
      !evenement?.lieuReprise &&
      !evenement?.pays &&
      !evenement?.ville &&
      !evenement?.region &&
      !evenement?.arrondissement
    );
  },
  formatageDateCompositionExtraitPlurilingue(
    evenement?: IEvenement
  ): IDateCompose {
    return {
      jour: getValeurOuVide(evenement?.jour),
      mois: getValeurOuVide(evenement?.mois),
      annee: getValeurOuVide(evenement?.annee)
    };
  }
};
