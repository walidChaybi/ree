import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { getDateFromTimestamp, getDateString } from "@util/DateUtils";
import { compactObject, triListeObjetsSurPropriete } from "@util/Utils";

const dotCharacter = "\u2022";

export function mapAlerteActe(data: any): IAlerte {
  const typeAlerte = TypeAlerte.getEnumFor(data?.idTypeAlerte);
  return {
    id: data?.id,
    idActe: data?.idActe,
    type: typeAlerte?.type,
    famille: data?.famille,
    pocopa: data?.pocopa,
    annee: data?.annee,
    support1: data?.support1,
    support2: data?.support2,
    numeroActe: data?.numeroActe,
    numeroBisTerActe: data?.numeroBisTerActe,
    description: `${typeAlerte?.type} ${typeAlerte?.libelle}`,
    complementDescription: data?.complementDescription,
    trigrammeUtilisateur: data?.trigrammeUtilisateur,
    dateCreationStr: data?.dateCreation
      ? getDateString(getDateFromTimestamp(data?.dateCreation))
      : "",
    codeCouleur: TypeAlerte.getCodeCouleurAlerte(typeAlerte?.type)
  } as IAlerte;
}

export function mapAlertesActe(data: any[]): IAlerte[] {
  return trierAlertesActeParDateCreationDesc(data)?.map(
    (alerteActe: any, index: number) => {
      const typeAlerte = TypeAlerte.getEnumFor(alerteActe?.idTypeAlerte);
      return {
        id: alerteActe?.id,
        idActe: alerteActe?.idActe,
        type: typeAlerte?.type,
        famille: alerteActe?.famille,
        pocopa: alerteActe?.pocopa,
        annee: alerteActe?.annee,
        support1: alerteActe?.support1,
        support2: alerteActe?.support2,
        numeroActe: alerteActe?.numeroActe,
        numeroBisTerActe: alerteActe?.numeroBisTerActe,
        description: `${typeAlerte?.type} ${typeAlerte?.libelle}`,
        complementDescription: alerteActe?.complementDescription,
        trigrammeUtilisateur: alerteActe?.trigrammeUtilisateur,
        dateCreationStr: alerteActe?.dateCreation
          ? getDateString(getDateFromTimestamp(alerteActe?.dateCreation))
          : "",
        codeCouleur: TypeAlerte.getCodeCouleurAlerte(typeAlerte?.type)
      } as IAlerte;
    }
  );
}

export function trierAlertesActeParDateCreationDesc(data: any[]): any[] {
  return triListeObjetsSurPropriete(data, "dateCreation")?.reverse();
}

export function toReferenceString(alerte: IAlerte): string {
  const registre: any = {
    famille: alerte?.famille,
    pocopa: alerte?.pocopa,
    annee: alerte?.annee,
    support1: alerte?.support1,
    support2: alerte?.support2,
    numeroActe: alerte?.numeroActe,
    numeroBisTerActe: alerte?.numeroBisTerActe
  };
  return `${dotCharacter} ${Object.values(compactObject(registre)).join(
    "."
  )} - ${alerte?.description} - ${alerte?.trigrammeUtilisateur} - ${
    alerte?.dateCreationStr
  }`;
}

export function toAlertString(alerte: IAlerte): string {
  return `${dotCharacter} ${alerte?.description} - ${alerte?.trigrammeUtilisateur} - ${alerte?.dateCreationStr}`;
}
