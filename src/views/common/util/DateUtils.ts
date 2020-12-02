export interface IDateCompose {
  jour: string;
  mois: string;
  annee: string;
}

export enum FormatDate {
  DDMMYYYY = "DD/MM/YYYY",
  DDMMYYYHHmm = "DD/MM/YYY HH:mm"
}

export function getDateFromDateCompose(date: IDateCompose): Date {
  return new Date(
    Date.UTC(
      parseInt(date.annee, 10),
      parseInt(date.mois),
      parseInt(date.jour),
      0,
      0
    )
  );
}

export function getDateString(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

export function getDateFromTimestamp(date: number): Date {
  return new Date(date);
}
