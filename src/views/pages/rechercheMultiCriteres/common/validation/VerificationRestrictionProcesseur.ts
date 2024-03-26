import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";

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

  while (!messageErreur && index < verificationsErreurs.length) {
    const verificationErreur = verificationsErreurs[index];
    if (verificationErreur.test(objetAVerifier)) {
      messageErreur = verificationErreur.messageErreur;
    }
    index++;
  }

  return messageErreur;
}
