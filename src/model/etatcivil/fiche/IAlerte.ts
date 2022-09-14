import { storeRece } from "@util/storeRece";
import { compactObject } from "@util/Utils";
import {
  DESCRIPTION_SAGA,
  TypeAlerte,
  TypeCodeCouleur
} from "../enum/TypeAlerte";

export interface IAlerte {
  id?: string;
  idActe?: string;
  alerte?: string;
  famille?: string;
  pocopa?: string;
  annee?: string;
  support1?: string;
  support2?: string;
  numeroActe?: string;
  numeroBisTerActe?: string;
  description?: string;
  complementDescription?: string;
  idUtilisateur?: string;
  trigrammeUtilisateur?: string;
  dateCreation?: number;
  dateCreationStr?: string;
  codeCouleur?: TypeCodeCouleur;
  type?: TypeAlerte;
}

const dotCharacter = "\u2022";
const RECE = "RECE";

export const Alerte = {
  toReferenceString(alerte: IAlerte): string {
    const registre: any = {
      famille: alerte?.famille,
      pocopa: alerte?.pocopa,
      annee: alerte?.annee,
      support1: alerte?.support1,
      support2: alerte?.support2,
      numeroActe: alerte?.numeroActe,
      numeroBisTerActe: alerte?.numeroBisTerActe
    };
    const trigramme =
      alerte.idUtilisateur && alerte.trigrammeUtilisateur !== RECE
        ? ` - ${storeRece.getNomPrenomUtilisateurAPartirId(
            alerte?.idUtilisateur
          )}`
        : "";
    const complementDescription = alerte.complementDescription
      ? ` - ${alerte?.complementDescription}`
      : "";
    return `${dotCharacter} ${Object.values(compactObject(registre)).join(
      "."
    )} - ${alerte.description}${complementDescription}${trigramme} - ${
      alerte?.dateCreationStr
    }`;
  },

  toAlertString(alerte: IAlerte): string {
    const trigramme =
      alerte.idUtilisateur && alerte.trigrammeUtilisateur !== RECE
        ? ` - ${storeRece.getNomPrenomUtilisateurAPartirId(
            alerte?.idUtilisateur
          )}`
        : "";
    const complementDescription = alerte.complementDescription
      ? ` - ${alerte?.complementDescription}`
      : "";
    return `${dotCharacter} ${alerte?.description}${complementDescription}${trigramme} - ${alerte?.dateCreationStr}`;
  },

  estDeTypeDescriptionSAGA(alerte?: IAlerte) {
    return alerte?.type?.type !== DESCRIPTION_SAGA;
  }
};
