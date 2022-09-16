import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";

export interface IVerificationErreur {
  test: (objetAVerifier: any) => boolean;
  messageErreur: string;
}

export function getMessageSiVerificationEnErreur(
  objetAVerifier: IRMCActeInscription,
  verificationsErreurs: IVerificationErreur[]
): string | undefined {
  let messageErreur: string | undefined;
  let index = 0;

  // Pas de limite si FF actif
  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RMC_NO_LIMIT)) {
    return undefined;
  }

  while (!messageErreur && index < verificationsErreurs.length) {
    const verificationErreur = verificationsErreurs[index];
    if (verificationErreur.test(objetAVerifier)) {
      messageErreur = verificationErreur.messageErreur;
    }
    index++;
  }

  return messageErreur;
}
