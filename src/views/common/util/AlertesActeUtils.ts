import { TypeAlerte } from "../../../model/etatcivil/enum/TypeAlerte";
import { IAlerte } from "../../../model/etatcivil/fiche/IAlerte";
import { IDataFicheApi } from "../../pages/fiche/hook/FichePageApiHook";
import { getDateFromTimestamp, getDateString } from "./DateUtils";
import { triListeObjetsSurPropriete } from "./Utils";

const dotCharacter = "\u2022";

export function mapAlertesActeFromApi(
  data: any[],
  idActe: string,
  registre: string
): IAlerte[] {
  return trierAlertesActeParDateCreationDesc(data)?.map(
    (alerte: any, index: number) => {
      const type = TypeAlerte.getEnumFor(alerte?.typeAlerte?.id);
      return {
        idActe,
        type: type?.type,
        description: `${type?.type} ${type?.libelle}`,
        complementDescription: alerte?.complementDescription,
        trigramme: alerte?.trigrammeUtilisateur,
        dateCreationStr: alerte?.dateCreation
          ? getDateString(getDateFromTimestamp(alerte?.dateCreation))
          : "",
        codeCouleur: TypeAlerte.getCodeCouleurAlerte(type?.type),
        registre
      } as IAlerte;
    }
  );
}

export function mapAlertesActeFromDataFiche(data: IDataFicheApi): IAlerte[] {
  return trierAlertesActeParDateCreationDesc(data?.data?.alerteActes)?.map(
    (alerte: any, index: number) => {
      const type = TypeAlerte.getEnumFor(alerte?.typeAlerte?.id);
      return {
        famille: data?.data?.registre?.famille,
        pocopa: data?.data?.registre?.pocopa,
        annee: data?.data?.registre?.annee,
        support1: data?.data?.registre?.support1,
        support2: data?.data?.registre?.support2,
        numeroActe: data?.data?.numero,
        numeroBisTer: data?.data?.numeroBisTer,
        description: `${type?.type} ${type?.libelle}`,
        complementDescription: alerte?.complementDescription,
        trigramme: alerte?.trigrammeUtilisateur,
        dateCreationStr: alerte?.dateCreation
          ? getDateString(getDateFromTimestamp(alerte?.dateCreation))
          : "",
        codeCouleur: TypeAlerte.getCodeCouleurAlerte(type?.type)
      } as IAlerte;
    }
  );
}

export function trierAlertesActeParDateCreationDesc(data: any[]): any[] {
  return triListeObjetsSurPropriete(data, "dateCreation")?.reverse();
}

export function toReferenceString(alerte: IAlerte): string {
  return `${dotCharacter} ${alerte?.registre} - ${alerte?.description} - ${alerte?.trigramme} - ${alerte?.dateCreationStr}`;
}

export function toAlertString(alerte: IAlerte): string {
  return `${dotCharacter} ${alerte?.description} - ${alerte?.trigramme} - ${alerte?.dateCreationStr}`;
}
