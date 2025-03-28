/* v8 ignore start A TESTER 03/25 */
export interface IDateForm {
  jour: string;
  mois: string;
  annee: string;
  heure?: string;
  minute?: string;
}

export const DateForm = {
  valeursDefauts: (date?: IDateForm | null): IDateForm => ({
    jour: date?.jour ? `${date.jour}`.padStart(2, "0") : "",
    mois: date?.mois ? `${date.mois}`.padStart(2, "0") : "",
    annee: date?.annee ? `${date.annee}`.padStart(2, "0") : ""
  })
};
/* v8 ignore end */
