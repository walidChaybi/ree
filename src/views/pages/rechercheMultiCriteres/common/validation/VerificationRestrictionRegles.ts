import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import { estNonRenseigne, estRenseigne, seulementUneProprieteRenseignee } from "@util/Utils";

export const messageErreurPrenomSaisiSansNom = "Le critère prénom ne peut être saisi sans le nom";

export const messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire =
  'Le critère "Date de naissance" ou "Pays de naissance" ne peut être utilisé sans au moins un autre critère du titulaire';

export const messageErreurFiltreDateCreationInformatiqueSaisiSeul = "Ce filtre ne peut être utilisé seul";

export function prenomSaisiSansNom(rMCSaisie: IRMCActeInscription | IRMCRequeteForm<keyof typeof ETypeRequete | "">): boolean {
  return estRenseigne(rMCSaisie.titulaire?.prenom) && estNonRenseigne(rMCSaisie.titulaire?.nom);
}

export function dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire(
  rMCSaisie: IRMCActeInscription | IRMCRequeteForm<keyof typeof ETypeRequete | "">
): boolean {
  return (
    seulementUneProprieteRenseignee("dateNaissance", rMCSaisie.titulaire) ||
    seulementUneProprieteRenseignee("paysNaissance", rMCSaisie.titulaire)
  );
}
