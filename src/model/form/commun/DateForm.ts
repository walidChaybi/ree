export interface IDateHeureForm {
  jour?: string;
  mois?: string;
  annee?: string;
  heure?: string;
  minute?: string;
}

export const DateHeureFormUtils = {
  valeursDefauts: (date?: IDateHeureForm | null, avecHeureMinute: boolean = false): IDateHeureForm => {
    return {
      jour: date?.jour ? date.jour.toString().padStart(2, "0") : "",
      mois: date?.mois ? date.mois.padStart(2, "0") : "",
      annee: date?.annee ? date.annee.padStart(2, "0") : "",
      ...(avecHeureMinute && {
        heure: date?.heure ? date.heure.padStart(2, "0") : "",
        minute: date?.minute ? date.minute.padStart(2, "0") : ""
      })
    };
  }
};
