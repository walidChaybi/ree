/* v8 ignore start */
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { formatNom } from "@util/Utils";
import { Sexe } from "../etatcivil/enum/Sexe";
import { SEPARATOR_NUMERO_ELEMENT } from "./IRequeteTableauDelivrance";
import { QualiteFamille } from "./enum/QualiteFamille";

export interface ITitulaireRequeteTableau {
  nom: string;
  prenoms: string[];
  jourNaissance?: number;
  moisNaissance?: number;
  anneeNaissance?: number;
  villeNaissance?: string;
  paysNaissance?: string;
  sexe?: Sexe;
  qualite?: QualiteFamille;
  nationalite?: Nationalite;
  position: number;
}

export const mapTitulaires = (titulaires: any, mappingSupplementaire: boolean): ITitulaireRequeteTableau[] => {
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
    titulaire.nationalite = Nationalite.getEnumFor(t?.nationalite);
    titulaire.paysNaissance = t?.paysNaissance;
    titulaire.qualite = QualiteFamille.getEnumFor(t?.qualite);
    titulaire.position = t?.position;
    return titulaire;
  });
};

const getPrenoms = (prenoms: string[]): string[] => {
  const prenomsTitulaire: string[] = [];
  if (prenoms) {
    prenoms.forEach((p: any) => {
      prenomsTitulaire.push(p.split(SEPARATOR_NUMERO_ELEMENT)[1]);
    });
  }
  return prenomsTitulaire;
};

/* v8 ignore stop */
