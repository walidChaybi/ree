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
  idActe?: string;
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
  idActe?: string;
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
const CODE_WEBEXT_INDISPONIBLE = "WEB_EXT1";
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
  "FONC_16",
  "TECH_1",
  "TECH_2",
  "TECH_3",
  "TECH_4",
  "TECH_5",
  "TECH_6",
  CODE_WEBEXT_INDISPONIBLE
];

// DEV seulement
/* v8 ignore start */
const reponseDelivranceModeDeveloppement = (signerParams: ISignerParams) => {
  const codesPin = {
    valide: "0000",
    invalide: "1111",
    erreur: "2222"
  };
  if (process.env.NODE_ENV !== "development" || !Object.values(codesPin).includes(signerParams.parametres.codePin)) {
    return;
  }

  setTimeout(() => {
    const pinIncorrect = signerParams.parametres.codePin === codesPin.invalide;
    const genererErreur = signerParams.parametres.codePin === codesPin.erreur;
    window.top?.dispatchEvent(
      new CustomEvent<IReponseDocumentSigne>(EVENT_REPONSE_SIGNATURE, {
        detail: {
          erreur:
            pinIncorrect || genererErreur
              ? { code: pinIncorrect ? CODE_PIN_INVALIDE : "FAKE_ERR", libelle: "Une erreur sur le document", detail: null }
              : undefined,
          document: pinIncorrect || genererErreur ? undefined : signerParams.parametres.document.contenu
        }
      })
    );
  }, 3000);
};
/* v8 ignore end */

const Signature = {
  signerDocumentDelivrance: (signerParams: ISignerParams) => {
    reponseDelivranceModeDeveloppement(signerParams);

    let retournerDocumentSigne: null | EventListener = null;

    const reponseWebext: Promise<IDocumentSigne> = new Promise(resolve => {
      retournerDocumentSigne = ((reponse: CustomEvent<IReponseDocumentSigne>) =>
        resolve({
          id: signerParams.parametres.document.id,
          idRequete: signerParams.parametres.document.idRequete,
          numeroFonctionnel: signerParams.parametres.document.numeroFonctionnel,
          contenu: reponse.detail.document,
          erreur: reponse.detail.erreur,
          idActe: signerParams.parametres.document.idActe
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
        },
        idActe: signerParams.parametres.document.idActe
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
          mode: ModeSignatureUtil.estValide(modeSignatureFF) ? modeSignatureFF : ModeSignature.PKCS11_SIGNED,
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
