import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IRMCRegistre } from "@model/rmc/acteInscription/rechercheForm/IRMCRegistre";
import {
  getMessageSiVerificationEnErreur,
  IVerificationErreur
} from "@pages/rechercheMultiCriteres/common/validation/VerificationRestrictionProcesseur";
import {
  dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
  filtreDateCreationInformatiqueSaisi,
  messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
  messageErreurFiltreDateCreationInformatiqueSaisiSeul,
  messageErreurPrenomSaisiSansNom,
  prenomSaisiSansNom
} from "@pages/rechercheMultiCriteres/common/validation/VerificationRestrictionRegles";
import {
  aucuneProprieteRenseignee,
  estNonRenseigne,
  estRenseigne,
  tousRenseignes
} from "@util/Utils";
import {
  seulementAnneeRegistreSaisi,
  seulementDateEvenementSaisi,
  seulementFamilleRegistreSaisi,
  seulementNatureActeSaisi,
  seulementNatureNumeroInscriptionSaisi,
  seulementPaysEvenementSaisi,
  seulementPocopaSaisi,
  seulementTypeRepertoireSaisi
} from "./VerificationRestrictionChampUtiliseSeul";

const verificationsRestrictionCriteresErreurs: IVerificationErreur[] = [
  {
    test: seulementUnCritereSaisiSeulNonAutorise,
    messageErreur: "Ce critère ne peut être utilisé seul"
  },
  {
    test: prenomSaisiSansNom,
    messageErreur: messageErreurPrenomSaisiSansNom
  },
  {
    test: dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
    messageErreur:
      messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire
  },
  {
    test: filtreDateCreationInformatiqueSaisiSeul,
    messageErreur: messageErreurFiltreDateCreationInformatiqueSaisiSeul
  },
  {
    test: familleRegistreCSLouACQSaisieSansPocopa,
    messageErreur:
      'Le critère "Poste Commune Pays" est obligatoire pour cette famille de registre'
  },
  {
    test: tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi,
    messageErreur:
      "Complétez votre recherche ou a minima utilisez le triplet (Nature, Famille et Année)"
  },
  {
    test: numeroActeSaisiSansFamilleRegistreEtPocopa,
    messageErreur:
      'Complétez votre recherche avec la Famille de registre et le "Poste Commune Pays"'
  }
];

export function getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
  rMCSaisie: IRMCActeInscription,
  verifications = verificationsRestrictionCriteresErreurs
): string | undefined {
  return getMessageSiVerificationEnErreur(rMCSaisie, verifications);
}

export function numeroActeSaisiSansFamilleRegistreEtPocopa(
  rMCSaisie: IRMCActeInscription
): boolean {
  const registre = rMCSaisie.registreRepertoire?.registre;
  return (
    estRenseigne(registre?.numeroActe) &&
    (estNonRenseigne(registre?.familleRegistre) ||
      estNonRenseigne(registre?.pocopa))
  );
}

export function tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(
  rMCSaisie: IRMCActeInscription
): boolean {
  const registre = rMCSaisie?.registreRepertoire?.registre;
  return (
    tripletNatureFamilleAnneeIncomplet(registre) &&
    estNonRenseigne(registre?.numeroActe) &&
    estNonRenseigne(registre?.pocopa) &&
    aucuneProprieteRenseignee(rMCSaisie.evenement) &&
    aucuneProprieteRenseignee(rMCSaisie.datesDebutFinAnnee) &&
    aucuneProprieteRenseignee(rMCSaisie.titulaire)
  );
}

function tripletNatureFamilleAnneeIncomplet(
  registre: IRMCRegistre | undefined
): boolean {
  return (
    sontRenseignesNatureActeEtFamilleRegistreEtNonRenseigneAnneeRegistre(
      registre
    ) ||
    sontRenseignesNatureActeEtAnneeRegistreEtNonRenseigneFamilleRegistre(
      registre
    ) ||
    sontRenseignesFamilleRegistreEtAnneeRegistreEtNonRenseigneNatureActe(
      registre
    )
  );
}

function sontRenseignesNatureActeEtFamilleRegistreEtNonRenseigneAnneeRegistre(
  registre?: IRMCRegistre
): boolean {
  return (
    tousRenseignes(registre?.natureActe, registre?.familleRegistre) &&
    estNonRenseigne(registre?.anneeRegistre)
  );
}

function sontRenseignesNatureActeEtAnneeRegistreEtNonRenseigneFamilleRegistre(
  registre?: IRMCRegistre
): boolean {
  return (
    tousRenseignes(registre?.natureActe, registre?.anneeRegistre) &&
    estNonRenseigne(registre?.familleRegistre)
  );
}

function sontRenseignesFamilleRegistreEtAnneeRegistreEtNonRenseigneNatureActe(
  registre?: IRMCRegistre
): boolean {
  return (
    tousRenseignes(registre?.familleRegistre, registre?.anneeRegistre) &&
    estNonRenseigne(registre?.natureActe)
  );
}

export function filtreDateCreationInformatiqueSaisiSeul(
  rMCSaisie: IRMCActeInscription
): boolean {
  return (
    filtreDateCreationInformatiqueSaisi(rMCSaisie) &&
    aucuneProprieteRenseignee(rMCSaisie.evenement) &&
    aucuneProprieteRenseignee(rMCSaisie.registreRepertoire) &&
    aucuneProprieteRenseignee(rMCSaisie.titulaire)
  );
}

export function familleRegistreCSLouACQSaisieSansPocopa(
  rMCSaisie: IRMCActeInscription
): boolean {
  const familleRegistre =
    rMCSaisie.registreRepertoire?.registre?.familleRegistre;
  return (
    (familleRegistre === TypeFamille.getKey(TypeFamille.CSL) ||
      familleRegistre === TypeFamille.getKey(TypeFamille.ACQ)) &&
    estNonRenseigne(rMCSaisie?.registreRepertoire?.registre?.pocopa)
  );
}

function seulementUnCritereSaisiSeulNonAutorise(
  rMCSaisie: IRMCActeInscription
): boolean {
  return (
    seulementNatureActeSaisi(rMCSaisie) ||
    seulementFamilleRegistreSaisi(rMCSaisie) ||
    seulementAnneeRegistreSaisi(rMCSaisie) ||
    seulementPocopaSaisi(rMCSaisie) ||
    seulementTypeRepertoireSaisi(rMCSaisie) ||
    seulementNatureNumeroInscriptionSaisi(rMCSaisie) ||
    seulementDateEvenementSaisi(rMCSaisie) ||
    seulementPaysEvenementSaisi(rMCSaisie)
  );
}
