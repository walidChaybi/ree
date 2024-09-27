import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IPrenomOrdonnes, PrenomsOrdonnes } from "./IPrenomOrdonnes";

export interface ITitulaireRequeteMiseAJour {
  position: number;
  nomNaissance: string;
  anneeNaissance?: number;
  moisNaissance?: number;
  jourNaissance?: number;
  villeEtrangereNaissance?: string;
  regionNaissance?: string;
  arrondissementNaissance?: string;
  paysNaissance?: string;
  sexe: string;
  prenoms: IPrenomOrdonnes[];
}

export const TitulaireRequeteMiseAJour = {
  listeDepuisDonneesFiche: (titulaires: any[]): ITitulaireRequeteMiseAJour[] =>
    titulaires.map(titulaire => ({
      position: titulaire.ordre,
      nomNaissance: titulaire.nom,
      anneeNaissance: titulaire.naissance?.annee,
      moisNaissance: titulaire.naissance?.mois,
      jourNaissance: titulaire.naissance?.jour,
      villeEtrangereNaissance: titulaire.naissance?.ville,
      regionNaissance: titulaire.naissance?.region,
      arrondissementNaissance: titulaire.naissance?.region,
      paysNaissance: titulaire.naissance?.pays,
      sexe: Sexe.getKey(Sexe.getEnumFromLibelle(titulaire.sexe?.libelle)),
      prenoms: PrenomsOrdonnes.listeDepuisTableau(titulaire.prenoms)
    }))
} as const;
