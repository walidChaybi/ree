import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import {
  estNonRenseigne,
  estRenseigne,
  seulementUneProprieteRenseignee
} from "@util/Utils";

export const messageErreurPrenomSaisiSansNom =
  "Le critère prénom ne peut être saisi sans le nom";

export const messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire =
  'Le critère "Date de naissance" ou "Pays de naissance" ne peut être utilisé sans au moins un autre critère du titulaire';

export const messageErreurFiltreDateCreationInformatiqueSaisiSeul =
  "Ce filtre ne peut être utilisé seul";

export function prenomSaisiSansNom(
  rMCSaisie: IRMCActeInscription | IRMCRequete
): boolean {
  return (
    estRenseigne(rMCSaisie.titulaire?.prenom) &&
    estNonRenseigne(rMCSaisie.titulaire?.nom)
  );
}

export function dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire(
  rMCSaisie: IRMCActeInscription | IRMCRequete
): boolean {
  return (
    seulementUneProprieteRenseignee("dateNaissance", rMCSaisie.titulaire) ||
    seulementUneProprieteRenseignee("paysNaissance", rMCSaisie.titulaire)
  );
}

export function filtreDateCreationInformatiqueSaisi(
  rMCSaisie: IRMCActeInscription | IRMCRequete
): boolean {
  return (
    estRenseigne(rMCSaisie.datesDebutFinAnnee?.dateDebut?.annee) &&
    estRenseigne(rMCSaisie.datesDebutFinAnnee?.dateFin)
  );
}
