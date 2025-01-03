import { ITypeAlerte, TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import DateUtils from "@util/DateUtils";
import { triListeObjetsSurPropriete } from "@util/Utils";

export function mapAlerteActe(data: any): IAlerte {
  const typeAlerte = TypeAlerte.depuisId(data.idTypeAlerte) as ITypeAlerte;

  return {
    id: data?.id,
    idActe: data?.idActe,
    famille: data?.famille,
    pocopa: data?.pocopa,
    annee: data?.annee,
    support1: data?.support1,
    support2: data?.support2,
    numeroActe: data?.numeroActe,
    numeroBisTerActe: data?.numeroBisTerActe,
    description: typeAlerte?.description,
    complementDescription: data?.complementDescription,
    idUtilisateur: data?.idUtilisateur,
    trigrammeUtilisateur: data?.trigrammeUtilisateur,
    dateCreationStr: data?.dateCreation ? DateUtils.getDateString(DateUtils.getDateFromTimestamp(data?.dateCreation)) : "",
    codeCouleur: TypeAlerte.codeCouleurAlerte(typeAlerte),
    type: typeAlerte
  } as IAlerte;
}

export function mapAlertesActe(data: any[]): IAlerte[] {
  return trierAlertesActeParDateCreationDesc(data)?.map(mapAlerteActe);
}

export function trierAlertesActeParDateCreationDesc(data: any[]): any[] {
  return triListeObjetsSurPropriete(data, "dateCreation")?.reverse();
}
