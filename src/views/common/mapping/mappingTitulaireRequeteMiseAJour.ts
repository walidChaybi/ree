import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteMiseAJour } from "@model/requete/ITitulaireRequeteMiseAJour";
import { mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";

export const mappingTitulaireActeVersTitulaireRequetMaj = (
  titulaires: any[]
): ITitulaireRequeteMiseAJour[] => {
  return titulaires.map(titulaire => {
    return {
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
      prenoms: mapPrenomsVersPrenomsOrdonnes(titulaire.prenoms)
    };
  });
};
