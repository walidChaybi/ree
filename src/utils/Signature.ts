import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";
import { gestionnaireSignatureFlag } from "@util/signatureFlag/gestionnaireSignatureFlag";

interface IReponseDocumentSigne {
  document?: string;
  erreur?: {
    code: string;
    libelle: string;
    detail: string | null;
  };
}

export interface IDocumentASigner {
  id: string;
  idRequete: string;
  numeroFonctionnel: string;
  contenu: string;
}

export interface IDocumentSigne {
  id: string;
  idRequete: string;
  numeroFonctionnel: string;
  contenu?: string;
  erreur?: {
    code: string;
    libelle: string;
    detail: string | null;
  };
}

interface ISignerParams {
  parametres: {
    document: IDocumentASigner;
    codePin: string;
  };
  apresReponse: (reponse: IDocumentSigne) => void;
}

const EVENT_REPONSE_SIGNATURE = "signWebextResponse";
const EVENT_ENVOI_SIGNATURE_WEBEXT = "signWebextCall";
const TIMEOUT_WEBEXT = 30000;
export const CODE_WEBEXT_INDISPONIBLE = "WEB_EXT1";
export const CODE_PIN_INVALIDE = "FONC_3";

export const CODES_ERREUR_BLOQUANTS = [
  "FONC_1",
  "FONC_2",
  CODE_PIN_INVALIDE,
  "FONC_6",
  "FONC_7",
  "FONC_8",
  "FONC_12",
  "FONC_15",
  "TECH_1",
  "TECH_2",
  "TECH_3",
  "TECH_4",
  "TECH_5",
  "TECH_6",
  CODE_WEBEXT_INDISPONIBLE
];

const Signature = {
  signerDocumentDelivrance: (signerParams: ISignerParams) => {
    let retournerDocumentSigne: null | EventListener = null;

    const reponseWebext: Promise<IDocumentSigne> = new Promise(resolve => {
      retournerDocumentSigne = ((reponse: CustomEvent<IReponseDocumentSigne>) =>
        resolve({
          id: signerParams.parametres.document.id,
          idRequete: signerParams.parametres.document.idRequete,
          numeroFonctionnel: signerParams.parametres.document.numeroFonctionnel,
          contenu: reponse.detail.document,
          erreur: reponse.detail.erreur
        })) as EventListener;

      window.top?.addEventListener(EVENT_REPONSE_SIGNATURE, retournerDocumentSigne);
    });

    const supprimerListener = () =>
      retournerDocumentSigne && window.top?.removeEventListener(EVENT_REPONSE_SIGNATURE, retournerDocumentSigne);

    const timeout = setTimeout(() => {
      supprimerListener();
      signerParams.apresReponse({
        id: signerParams.parametres.document.id,
        idRequete: signerParams.parametres.document.idRequete,
        numeroFonctionnel: signerParams.parametres.document.numeroFonctionnel,
        erreur: {
          code: CODE_WEBEXT_INDISPONIBLE,
          libelle: "La signature électronique est actuellement indisponible ou n'est pas installée.",
          detail: null
        }
      });
    }, TIMEOUT_WEBEXT);

    reponseWebext.then((documentSigne: IDocumentSigne) => {
      clearTimeout(timeout);
      supprimerListener();
      signerParams.apresReponse(documentSigne);
    });

    const modeSignatureFF = gestionnaireSignatureFlag.getModeSignature();
    window.top?.dispatchEvent(
      new CustomEvent(EVENT_ENVOI_SIGNATURE_WEBEXT, {
        detail: {
          function: "SIGN",
          direction: "to-webextension",
          document: signerParams.parametres.document.contenu,
          pin: signerParams.parametres.codePin,
          mode: ModeSignatureUtil.estValide(modeSignatureFF) ? modeSignatureFF : ModeSignature.CERTIGNA_SIGNED,
          infos: [
            { cle: "id", valeur: signerParams.parametres.document.id },
            { cle: "idRequete", valeur: signerParams.parametres.document.idRequete }
          ]
        }
      })
    );
  }
} as const;

export default Signature;
