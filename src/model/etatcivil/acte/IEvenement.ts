import {
  formatAHeure,
  getDateStringFromDateCompose,
  IDateCompose
} from "@util/DateUtils";
import { estRenseigne, getValeurOuVide, numberToString } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export interface IEvenement {
  id?: string;
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
  lieuFormate?: string;
  neDansLeMariage?: boolean;
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

  getLieuFormate(evenement?: IEvenement): string {
    return evenement?.lieuFormate ?? "";
  },

  getLieuDeRepriseOuLieuEvenement(evenement?: IEvenement): string {
    if (evenement?.lieuReprise) {
      return evenement.lieuReprise;
    } else {
      return evenement
        ? LieuxUtils.getLocalisationEtrangere(
            evenement.ville,
            evenement.region,
            evenement.pays
          )
        : "";
    }
  },

  estPartiellementRenseigne(evenement?: IEvenement): boolean {
    return (
      estRenseigne(evenement?.jour) ||
      estRenseigne(evenement?.mois) ||
      estRenseigne(evenement?.annee)
    );
  },

  estTotalementRenseigne(evenement?: IEvenement): boolean {
    return (
      estRenseigne(evenement?.jour) &&
      estRenseigne(evenement?.mois) &&
      estRenseigne(evenement?.annee)
    );
  },

  estNonRenseigne(evenement?: IEvenement): boolean {
    return !this.estPartiellementRenseigne(evenement);
  },

  estHeureRenseignee(evenement?: IEvenement): boolean {
    return evenement?.heure != null && evenement.minute != null;
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
