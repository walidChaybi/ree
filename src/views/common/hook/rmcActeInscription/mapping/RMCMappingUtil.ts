import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";

export function getCriteresTitulaire(criteres: IRMCActeInscription | IRMCActeArchive) {
  return {
    nomTitulaire: criteres.titulaire?.nom || undefined,
    prenomTitulaire: criteres.titulaire?.prenom || undefined,
    jourNaissance: criteres.titulaire?.dateNaissance?.jour || undefined,
    moisNaissance: criteres.titulaire?.dateNaissance?.mois || undefined,
    anneeNaissance: criteres.titulaire?.dateNaissance?.annee || undefined,
    paysNaissance: criteres.titulaire?.paysNaissance || undefined
  };
}
