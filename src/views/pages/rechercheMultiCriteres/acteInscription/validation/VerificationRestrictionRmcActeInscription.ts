import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRMCActe } from "@model/rmc/acteInscription/rechercheForm/IRMCActe";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import {
  getMessageSiVerificationEnErreur,
  IVerificationErreur
} from "@pages/rechercheMultiCriteres/common/validation/VerificationRestrictionProcesseur";
import {
  dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
  messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
  messageErreurFiltreDateCreationInformatiqueSaisiSeul,
  messageErreurPrenomSaisiSansNom,
  prenomSaisiSansNom
} from "@pages/rechercheMultiCriteres/common/validation/VerificationRestrictionRegles";
import { aucuneProprieteRenseignee, estNonRenseigne, estRenseigne, tousRenseignes } from "@util/Utils";
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
    messageErreur: messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire
  },
  {
    test: filtreDateCreationInformatiqueSaisiSeul,
    messageErreur: messageErreurFiltreDateCreationInformatiqueSaisiSeul
  },
  {
    test: familleRegistreCSLouACQSaisieSansPocopa,
    messageErreur: 'Le critère "Type / Poste / Commune / Pays" est obligatoire pour cette famille de registre'
  },
  {
    test: tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi,
    messageErreur: "Complétez votre recherche ou a minima utilisez le triplet (Nature, Famille et Année)"
  },
  {
    test: numeroActeSaisiSansFamilleRegistreEtPocopa,
    messageErreur: 'Complétez votre recherche avec la Famille de registre et le critère "Type / Poste / Commune / Pays"'
  }
];

export function getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
  rMCSaisie: IRMCActeInscription,
  verifications = verificationsRestrictionCriteresErreurs
): string | undefined {
  return getMessageSiVerificationEnErreur(rMCSaisie, verifications);
}

function numeroActeSaisiSansFamilleRegistreEtPocopa(rMCSaisie: IRMCActeInscription): boolean {
  const registre = rMCSaisie.registreRepertoire?.registre;
  return (
    estRenseigne(registre?.numeroActe?.numeroActe) && (estNonRenseigne(registre?.familleRegistre) || estNonRenseigne(registre?.pocopa))
  );
}

function tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(rMCSaisie: IRMCActeInscription): boolean {
  const registre = rMCSaisie?.registreRepertoire?.registre;
  return (
    tripletNatureFamilleAnneeIncomplet(registre) &&
    estNonRenseigne(registre?.numeroActe?.numeroActe) &&
    estNonRenseigne(registre?.pocopa) &&
    aucuneProprieteRenseignee(rMCSaisie.evenement) &&
    aucuneProprieteRenseignee(rMCSaisie.titulaire)
  );
}

function tripletNatureFamilleAnneeIncomplet(registre: IRMCActe | undefined): boolean {
  return (
    sontRenseignesNatureActeEtFamilleRegistreEtNonRenseigneAnneeRegistre(registre) ||
    sontRenseignesNatureActeEtAnneeRegistreEtNonRenseigneFamilleRegistre(registre) ||
    sontRenseignesFamilleRegistreEtAnneeRegistreEtNonRenseigneNatureActe(registre)
  );
}

function sontRenseignesNatureActeEtFamilleRegistreEtNonRenseigneAnneeRegistre(registre?: IRMCActe): boolean {
  return (
    tousRenseignes(registre?.natureActe, registre?.familleRegistre) &&
    estNonRenseigne(registre?.anneeRegistre) &&
    !estFamilleRegistreOP2OuOP3(registre)
  );
}

function sontRenseignesNatureActeEtAnneeRegistreEtNonRenseigneFamilleRegistre(registre?: IRMCActe): boolean {
  return tousRenseignes(registre?.natureActe, registre?.anneeRegistre) && estNonRenseigne(registre?.familleRegistre);
}

function sontRenseignesFamilleRegistreEtAnneeRegistreEtNonRenseigneNatureActe(registre?: IRMCActe): boolean {
  return tousRenseignes(registre?.familleRegistre, registre?.anneeRegistre) && estNonRenseigne(registre?.natureActe);
}

function estFamilleRegistreOP2OuOP3(registre?: IRMCActe): boolean {
  const enumFamilleRegistre = TypeFamille.getEnumFor(registre?.familleRegistre ?? "");
  return TypeFamille.estOP2(enumFamilleRegistre) || TypeFamille.estOP3(enumFamilleRegistre);
}

function filtreDateCreationInformatiqueSaisiSeul(rMCSaisie: IRMCActeInscription): boolean {
  return (
    aucuneProprieteRenseignee(rMCSaisie.evenement) &&
    aucuneProprieteRenseignee(rMCSaisie.registreRepertoire) &&
    aucuneProprieteRenseignee(rMCSaisie.titulaire)
  );
}

function familleRegistreCSLouACQSaisieSansPocopa(rMCSaisie: IRMCActeInscription): boolean {
  const familleRegistre = rMCSaisie.registreRepertoire?.registre?.familleRegistre;
  return (
    (familleRegistre === TypeFamille.getKey(TypeFamille.CSL) || familleRegistre === TypeFamille.getKey(TypeFamille.ACQ)) &&
    estNonRenseigne(rMCSaisie?.registreRepertoire?.registre?.pocopa)
  );
}

function seulementUnCritereSaisiSeulNonAutorise(rMCSaisie: IRMCActeInscription): boolean {
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
