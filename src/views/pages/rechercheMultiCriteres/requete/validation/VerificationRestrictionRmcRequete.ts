import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import { aucuneProprieteRenseignee, estNonRenseigne, estRenseigne } from "@util/Utils";
import {
  getMessageSiVerificationEnErreur,
  IVerificationErreur
} from "@views/pages/rechercheMultiCriteres/common/validation/VerificationRestrictionProcesseur";
import {
  dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
  messageErreurDateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
  messageErreurFiltreDateCreationInformatiqueSaisiSeul,
  messageErreurPrenomSaisiSansNom,
  prenomSaisiSansNom
} from "@views/pages/rechercheMultiCriteres/common/validation/VerificationRestrictionRegles";

const verificationsRestrictionCriteresErreurs: IVerificationErreur[] = [
  {
    test: typeRequeteSaisiSansSousTypeOuStatut,
    messageErreur: "Les critères Type, sous-type et statut de requête doivent être renseignés ensemble"
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
  }
];

export function getMessageSiVerificationRestrictionRmcRequeteEnErreur(
  rMCSaisie: IRMCRequeteForm<keyof typeof ETypeRequete | "">
): string | undefined {
  return getMessageSiVerificationEnErreur(rMCSaisie, verificationsRestrictionCriteresErreurs);
}

function filtreDateCreationInformatiqueSaisiSeul(rMCSaisie: IRMCRequeteForm<keyof typeof ETypeRequete | "">): boolean {
  return (
    aucuneProprieteRenseignee(rMCSaisie.requerant) &&
    aucuneProprieteRenseignee(rMCSaisie.requete) &&
    aucuneProprieteRenseignee(rMCSaisie.titulaire)
  );
}

function typeRequeteSaisiSansSousTypeOuStatut(rMCSaisie: IRMCRequeteForm<keyof typeof ETypeRequete | "">): boolean {
  return (
    estRenseigne(rMCSaisie.requete?.typeRequete) &&
    (estNonRenseigne(rMCSaisie.requete?.sousTypeRequete) || estNonRenseigne(rMCSaisie.requete?.statutRequete))
  );
}
