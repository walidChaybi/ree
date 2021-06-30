export interface IResultatRMCActe {
  idActe: string;
  nom?: string;
  autresNoms?: string;
  prenoms?: string;
  dateNaissance?: string;
  paysNaissance?: string;
  nature?: string;
  registre?: string;
  alertes?: string;
}

export function isInstanceOfActe(data: any): data is IResultatRMCActe {
  return data && "idActe" in data;
}
