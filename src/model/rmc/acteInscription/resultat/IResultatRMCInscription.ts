export interface IResultatRMCInscription {
  idInscription: string;
  nom?: string;
  autresNoms?: string;
  prenoms?: string;
  dateNaissance?: string;
  paysNaissance?: string;
  numeroInscription?: string;
  nature?: string;
  typeInscription?: string;
  statutInscription?: string;
  categorie: string;
}

export function isInstanceOfInscription(
  data: any
): data is IResultatRMCInscription {
  return data && "idInscription" in data;
}
