import { formatNom, formatPrenom } from "../../views/common/util/Utils";
import { Sexe } from "../etatcivil/enum/Sexe";
import { SEPARATOR_NUMERO_ELEMENT } from "./IRequeteTableauDelivrance";

export interface ITitulaireRequeteTableau {
  nom: string;
  prenoms: string[];
  jourNaissance: number;
  moisNaissance: number;
  anneeNaissance: number;
  villeNaissance?: string;
  paysNaissance?: string;
  sexe: Sexe;
}

export function mapTitulaires(
  titulaires: any,
  mappingSupplementaire: boolean
): ITitulaireRequeteTableau[] {
  return titulaires?.map((t: any) => {
    const titulaire = {} as ITitulaireRequeteTableau;
    titulaire.nom = formatNom(t?.nom);
    if (mappingSupplementaire) {
      titulaire.prenoms = getPrenoms(t?.prenoms);
    } else {
      titulaire.prenoms = t?.prenoms;
    }
    titulaire.jourNaissance = t?.jourNaissance;
    titulaire.moisNaissance = t?.moisNaissance;
    titulaire.anneeNaissance = t?.anneeNaissance;
    titulaire.sexe = Sexe.getEnumFor(t?.sexe);
    titulaire.villeNaissance = t?.villeNaissance;
    titulaire.paysNaissance = t?.paysNaissance;
    return titulaire;
  });
}

function getPrenoms(prenoms: string[]): string[] {
  const prenomsTitulaire: string[] = [];
  if (prenoms) {
    prenoms.forEach((p: any) => {
      prenomsTitulaire.push(formatPrenom(p.split(SEPARATOR_NUMERO_ELEMENT)[1]));
    });
  }
  return prenomsTitulaire;
}
