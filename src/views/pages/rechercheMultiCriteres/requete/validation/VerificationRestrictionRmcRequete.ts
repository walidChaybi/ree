import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
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
  tousNonRenseignes
} from "@util/Utils";

const verificationsRestrictionCriteresErreurs: IVerificationErreur[] = [
  {
    test: typeRequeteSaisiSansSousTypeOuStatut,
    messageErreur:
      "Les critères Type, sous-type et statut de requête doivent être renseignés ensemble"
  },
  {
    test: prenomSaisiSansNom,
    messageErreur: messageErreurPrenomSaisiSansNom
  },
  {
    test: nomSaisiSansDateNaissance,
    messageErreur:
      "Le critère nom ne peut être utilisé sans au moins l'année de la date de naissance"
  },
  {
    test: dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
    messageErreur:
      messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire
  },
  {
    test: filtreDateCreationInformatiqueSaisiSeul,
    messageErreur: messageErreurFiltreDateCreationInformatiqueSaisiSeul
  }
];

export function getMessageSiVerificationRestrictionRmcRequeteEnErreur(
  rMCSaisie: IRMCRequete
): string | undefined {
  return getMessageSiVerificationEnErreur(
    rMCSaisie,
    verificationsRestrictionCriteresErreurs
  );
}

export function filtreDateCreationInformatiqueSaisiSeul(
  rMCSaisie: IRMCRequete
): boolean {
  return (
    filtreDateCreationInformatiqueSaisi(rMCSaisie) &&
    aucuneProprieteRenseignee(rMCSaisie.requerant) &&
    aucuneProprieteRenseignee(rMCSaisie.requete) &&
    aucuneProprieteRenseignee(rMCSaisie.titulaire)
  );
}

export function nomSaisiSansDateNaissance(rMCSaisie: IRMCRequete): boolean {
  return (
    estRenseigne(rMCSaisie.titulaire?.nom) &&
    estNonRenseigne(rMCSaisie.titulaire?.dateNaissance?.annee)
  );
}

export function typeRequeteSaisiSansSousTypeOuStatut(
  rMCSaisie: IRMCRequete
): boolean {
  return (
    estRenseigne(rMCSaisie.requete?.typeRequete) &&
    tousNonRenseignes(
      rMCSaisie.requete?.sousTypeRequete,
      rMCSaisie.requete?.statutRequete
    )
  );
}
