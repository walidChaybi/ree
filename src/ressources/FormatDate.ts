export interface DateCompose {
  jour: number;
  mois: number;
  annee: number;
}

export enum FormatDate {
  DDMMYYYY = "DD/MM/YYYY",
  DDMMYYYHHmm = "DD/MM/YYY HH:mm"
}

export function getDateFromDateCompose(date: DateCompose): Date {
  return new Date(Date.UTC(date.annee, date.mois, date.jour, 0, 0));
}

export function getDateString(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

export function getDateFromTimestamp(date: number): Date {
  return new Date(date);
}
