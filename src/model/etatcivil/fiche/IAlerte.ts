import { Utilisateur } from "@model/agent/Utilisateur";
import { compactObject } from "@util/Utils";
import { A_NE_PAS_DELIVRER, DESCRIPTION_SAGA, ITypeAlerte, TypeCodeCouleur } from "../enum/TypeAlerte";

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
  type?: ITypeAlerte;
}

const dotCharacter = "\u2022";
const RECE = "RECE";

export const Alerte = {
  toReferenceString(alerte: IAlerte, utilisateurs: Utilisateur[]): string {
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
        ? ` - ${utilisateurs.find(utilisateur => utilisateur.id === alerte?.idUtilisateur)?.prenomNom ?? ""}`
        : "";
    const complementDescription = alerte.complementDescription ? ` - ${alerte?.complementDescription}` : "";
    return `${dotCharacter} ${Object.values(compactObject(registre)).join(
      "."
    )} - ${alerte.description}${complementDescription}${trigramme} - ${alerte?.dateCreationStr}`;
  },

  toAlertString(alerte: IAlerte, utilisateurs: Utilisateur[]): string {
    const trigramme =
      alerte.idUtilisateur && alerte.trigrammeUtilisateur !== RECE
        ? ` - ${utilisateurs.find(utilisateur => utilisateur.id === alerte?.idUtilisateur)?.prenomNom ?? ""}`
        : "";
    const complementDescription = alerte.complementDescription ? ` - ${alerte?.complementDescription}` : "";
    return `${dotCharacter} ${alerte?.description}${complementDescription}${trigramme} - ${alerte?.dateCreationStr}`;
  },

  estDeTypeDescriptionSAGA(alerte?: IAlerte) {
    return alerte?.type?.type !== DESCRIPTION_SAGA;
  },

  estDeTypeANePasDelivrer(alerte?: IAlerte) {
    return alerte?.type?.type === A_NE_PAS_DELIVRER;
  }
};
