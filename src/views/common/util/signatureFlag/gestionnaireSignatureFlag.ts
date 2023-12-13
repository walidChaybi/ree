import { ModeSignature } from "@model/requete/ModeSignature";

const NOM_CLE_SIGNATURE_FLAG = "signatureFlag";

class GestionnaireSignatureFlag {
  getModeSignature(): ModeSignature {
    return localStorage.getItem(NOM_CLE_SIGNATURE_FLAG) as ModeSignature;
  }
}

export const gestionnaireSignatureFlag = new GestionnaireSignatureFlag();
