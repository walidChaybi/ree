import DateUtils, { IDateCompose } from "@util/DateUtils";
import { estRenseigne, getValeurOuVide, numberToString } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { ILieuEvenement } from "../commun/ILieuEvenement";

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

export interface IEvenementDto {
  id?: string;
  heure?: number | null;
  minute?: number | null;
  jour?: number;
  mois?: number;
  annee?: number;
  voie?: string | null;
  ville?: string;
  arrondissement?: string | null;
  region?: string;
  pays: string;
  lieuReprise?: string | null;
  lieuFormate?: string;
  neDansLeMariage?: boolean;
}

export const Evenement = {
  getDate(evenement?: IEvenement): string {
    return evenement
      ? `${DateUtils.getDateStringFromDateCompose({
          jour: numberToString(evenement.jour),
          mois: numberToString(evenement.mois),
          annee: numberToString(evenement.annee)
        })} ${DateUtils.formatAHeure(evenement.heure, evenement.minute)}`
      : "";
  },

  getLieuFormate(evenement?: IEvenement): string {
    return evenement?.lieuFormate ?? "";
  },

  getLieuDeRepriseOuLieuEvenement(evenement?: IEvenement): string {
    if (evenement?.lieuReprise) {
      return evenement.lieuReprise;
    } else {
      return evenement ? LieuxUtils.getLocalisationEtrangere(evenement.ville, evenement.region, evenement.pays) : "";
    }
  },

  estPartiellementRenseigne(evenement?: IEvenement): boolean {
    return estRenseigne(evenement?.jour) || estRenseigne(evenement?.mois) || estRenseigne(evenement?.annee);
  },

  estTotalementRenseigne(evenement?: IEvenement): boolean {
    return estRenseigne(evenement?.jour) && estRenseigne(evenement?.mois) && estRenseigne(evenement?.annee);
  },

  estNonRenseigne(evenement?: IEvenement): boolean {
    return !this.estPartiellementRenseigne(evenement);
  },

  estHeureRenseignee(evenement?: IEvenement): boolean {
    return evenement?.heure != null && evenement.minute != null;
  },

  aucuneDonneeDuLieuRenseignee(evenement?: IEvenement): boolean {
    return !evenement?.lieuReprise && !evenement?.pays && !evenement?.ville && !evenement?.region && !evenement?.arrondissement;
  },

  formatageDateCompositionExtraitPlurilingue(evenement?: IEvenement): IDateCompose {
    return {
      jour: getValeurOuVide(evenement?.jour),
      mois: getValeurOuVide(evenement?.mois),
      annee: getValeurOuVide(evenement?.annee)
    };
  },

  getLieuEvenement: (evenementNaissance: IEvenement | IEvenementDto): ILieuEvenement => {
    return {
      arrondissement: evenementNaissance.arrondissement ?? "",
      pays: evenementNaissance.pays,
      region: evenementNaissance.region ?? "",
      ville: evenementNaissance.ville ?? ""
    };
  },

  getDateCompose: (evenement: IEvenement | IEvenementDto): IDateCompose => {
    return {
      jour: evenement.jour?.toString(),
      mois: evenement.mois?.toString(),
      annee: evenement.annee?.toString()
    } as IDateCompose;
  }
};
