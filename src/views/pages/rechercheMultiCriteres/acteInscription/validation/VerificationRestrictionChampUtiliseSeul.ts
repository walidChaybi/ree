import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { seulementUneProprieteRenseignee } from "@util/Utils";

export function seulementNatureActeSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("registreRepertoire.registre.natureActe", rMCSaisie);
}

export function seulementFamilleRegistreSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("registreRepertoire.registre.familleRegistre", rMCSaisie);
}

export function seulementAnneeRegistreSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("registreRepertoire.registre.anneeRegistre", rMCSaisie);
}

export function seulementPocopaSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("registreRepertoire.registre.pocopa", rMCSaisie);
}

export function seulementTypeRepertoireSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("registreRepertoire.repertoire.typeRepertoire", rMCSaisie);
}

export function seulementNatureNumeroInscriptionSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("registreRepertoire.repertoire.numeroInscription", rMCSaisie);
}

export function seulementDateEvenementSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("evenement.dateEvenement", rMCSaisie);
}

export function seulementPaysEvenementSaisi(rMCSaisie?: IRMCActeInscription): boolean {
  return seulementUneProprieteRenseignee("registreRepertoire.evenement.paysEvenement", rMCSaisie);
}
