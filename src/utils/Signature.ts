import { CONFIG_POST_LOGS } from "@api/configurations/outilTech/PostLogsConfigApi";
import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { gestionnaireSignatureFlag } from "@util/signatureFlag/gestionnaireSignatureFlag";
import dayjs from "dayjs";
import DOCUMENT_VALIDE from "../ressources/DocumentSigneValide";
import DOCUMENT_VIDE_A_SIGNER from "../ressources/DocumentVideASigner";
import { appelApiAvecAxios } from "./AppelApi";

// MODULE CLE signature des documents via webextension

export interface IInformationsCarte {
  noSerieCarte: string;
  manufacturerIDCarte: string;
  modelCarte: string;
  flagsCarte: string;
  algoSignature: string;
  notBeforeCertificat: string;
  notAfterCertificat: string;
  noSerieCertificat: string;
  entiteCertificat: string;
  issuerCertificat: string;
}

interface IErreurSignature {
  code: string;
  libelle: string;
  detail: string | null;
}

interface IReponseDocumentSigne {
  document?: string;
  erreur?: IErreurSignature;
  infosSignature?: IInformationsCarte;
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
  erreur?: IErreurSignature;
  idActe?: string;
}

interface ISignerDelivranceParams {
  parametres: {
    document: IDocumentASigner;
    codePin: string;
    idAgent: string;
  };
  apresReponse: (reponse: IDocumentSigne) => void;
}

interface ISignerParams {
  parametres: {
    idActe: string;
    idAgent: string;
    document: string;
    codePin: string;
    estMiseAJour: boolean;
  };
  apresReponse: (reponse: IReponseDocumentSigne) => void;
}

interface IRecupererInformationsParams {
  parametres: {
    idActe: string;
    codePin: string;
    idAgent: string;
    prenomNomAgent: string;
    estMiseAJour: boolean;
  };
  apresSucces: (informations: IInformationsCarte) => void;
  apresErreur: (erreur: IErreurSignature) => void;
}

const EVENT_REPONSE_SIGNATURE = "signWebextResponse";
const EVENT_ENVOI_SIGNATURE_WEBEXT = "signWebextCall";
const TIMEOUT_WEBEXT = 30000;
const CODE_WEBEXT_INDISPONIBLE = "WEB_EXT1";
const ERREUR_WEBEXT_INDISPONIBLE: IErreurSignature = {
  code: CODE_WEBEXT_INDISPONIBLE,
  libelle: "La signature électronique est actuellement indisponible ou n'est pas installée.",
  detail: null
};

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
const ModeDeveloppement = {
  CODES_PIN: {
    valide: "0000",
    invalide: "1111",
    erreur: "2222"
  } as { [cle: string]: string },

  ignorer: (codePin: string) =>
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_SIMULER_SIGNATURE)
      ? !Object.values(ModeDeveloppement.CODES_PIN).includes(codePin)
      : true,

  reponseRecupererInformations: (recupereInformationParams: IRecupererInformationsParams) => {
    if (ModeDeveloppement.ignorer(recupereInformationParams.parametres.codePin)) {
      return;
    }

    const pinIncorrect = recupereInformationParams.parametres.codePin === ModeDeveloppement.CODES_PIN.invalide;
    setTimeout(() => {
      window.top?.dispatchEvent(
        new CustomEvent<IReponseDocumentSigne>(EVENT_REPONSE_SIGNATURE, {
          detail: {
            erreur: pinIncorrect
              ? { code: pinIncorrect ? CODE_PIN_INVALIDE : "FAKE_ERR", libelle: "Une erreur sur le document", detail: null }
              : undefined,
            infosSignature: pinIncorrect
              ? undefined
              : ({
                  entiteCertificat: `CN=${recupereInformationParams.parametres.prenomNomAgent},test`,
                  issuerCertificat: "AAE"
                } as IInformationsCarte)
          }
        })
      );
    }, 3000);
  },

  reponseDelivrance: (signerParams: ISignerDelivranceParams) => {
    if (ModeDeveloppement.ignorer(signerParams.parametres.codePin)) {
      return;
    }

    const pinIncorrect = signerParams.parametres.codePin === ModeDeveloppement.CODES_PIN.invalide;
    const genererErreur = signerParams.parametres.codePin === ModeDeveloppement.CODES_PIN.erreur;
    setTimeout(() => {
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
  },

  reponseDocument: (signerParams: ISignerParams) => {
    if (ModeDeveloppement.ignorer(signerParams.parametres.codePin)) {
      return;
    }

    const genererErreur = signerParams.parametres.codePin === ModeDeveloppement.CODES_PIN.erreur;
    setTimeout(() => {
      window.top?.dispatchEvent(
        new CustomEvent<IReponseDocumentSigne>(EVENT_REPONSE_SIGNATURE, {
          detail: {
            erreur: genererErreur ? { code: "FAKE_ERR", libelle: "Une erreur sur le document", detail: null } : undefined,
            document: genererErreur ? undefined : DOCUMENT_VALIDE,
            infosSignature: {
              noSerieCarte: "1234",
              manufacturerIDCarte: "4321",
              modelCarte: "test",
              flagsCarte: "flagTest",
              algoSignature: "test",
              notBeforeCertificat: dayjs().add(-10, "day").toISOString().split(".")[0].concat("-07:00"),
              notAfterCertificat: dayjs().add(10, "day").toISOString().split(".")[0].concat("-07:00"),
              noSerieCertificat: "0000",
              entiteCertificat: "CN=test TEST",
              issuerCertificat: "AAE"
            }
          }
        })
      );
    }, 3000);
  }
} as const;
/* v8 ignore stop */

const Signature = {
  recupererInformationsCarte: (recupererInformationsParams: IRecupererInformationsParams) => {
    ModeDeveloppement.reponseRecupererInformations(recupererInformationsParams);

    let retournerInformationsCarte: null | EventListener = null;

    const reponseWebext: Promise<IReponseDocumentSigne> = new Promise(resolve => {
      retournerInformationsCarte = ((reponse: CustomEvent<IReponseDocumentSigne>) => resolve(reponse.detail)) as EventListener;

      window.top?.addEventListener(EVENT_REPONSE_SIGNATURE, retournerInformationsCarte);
    });

    const supprimerListener = () =>
      retournerInformationsCarte && window.top?.removeEventListener(EVENT_REPONSE_SIGNATURE, retournerInformationsCarte);

    const timeout = setTimeout(() => {
      supprimerListener();
      postLogsErreurSurServeurOutilTech(
        ERREUR_WEBEXT_INDISPONIBLE,
        recupererInformationsParams.parametres.idAgent,
        recupererInformationsParams.parametres.idActe,
        recupererInformationsParams.parametres.estMiseAJour ? "MISE A JOUR" : "CREATION"
      );
      recupererInformationsParams.apresErreur(ERREUR_WEBEXT_INDISPONIBLE);
    }, TIMEOUT_WEBEXT);

    reponseWebext.then((reponse: IReponseDocumentSigne) => {
      clearTimeout(timeout);
      supprimerListener();
      if (reponse.erreur) {
        postLogsErreurSurServeurOutilTech(
          reponse.erreur,
          recupererInformationsParams.parametres.idAgent,
          recupererInformationsParams.parametres.idActe,
          recupererInformationsParams.parametres.estMiseAJour ? "MISE A JOUR" : "CREATION"
        );
        recupererInformationsParams.apresErreur(reponse.erreur);
      } else {
        recupererInformationsParams.apresSucces(reponse.infosSignature!);
      }
    });

    const modeSignatureFF = gestionnaireSignatureFlag.getModeSignature();
    window.top?.dispatchEvent(
      new CustomEvent(EVENT_ENVOI_SIGNATURE_WEBEXT, {
        detail: {
          function: "SIGN",
          direction: "to-webextension",
          document: DOCUMENT_VIDE_A_SIGNER,
          pin: recupererInformationsParams.parametres.codePin,
          mode: ModeSignatureUtil.estValide(modeSignatureFF) ? modeSignatureFF : ModeSignature.PKCS11_SIGNED,
          infos: [
            { cle: "typeSignature", valeur: recupererInformationsParams.parametres.estMiseAJour ? "Mise à jour" : "Création" },
            { cle: "estFictive", valeur: "true" },
            { cle: "idActe", valeur: recupererInformationsParams.parametres.idActe }
          ]
        }
      })
    );
  },

  signerDocumentDelivrance: (signerParams: ISignerDelivranceParams) => {
    ModeDeveloppement.reponseDelivrance(signerParams);

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
      postLogsErreurSurServeurOutilTech(
        ERREUR_WEBEXT_INDISPONIBLE,
        signerParams.parametres.idAgent,
        signerParams.parametres.document.id,
        "DELIVRANCE"
      );
      signerParams.apresReponse({
        id: signerParams.parametres.document.id,
        idRequete: signerParams.parametres.document.idRequete,
        numeroFonctionnel: signerParams.parametres.document.numeroFonctionnel,
        erreur: ERREUR_WEBEXT_INDISPONIBLE,
        idActe: signerParams.parametres.document.idActe
      });
    }, TIMEOUT_WEBEXT);

    reponseWebext.then((documentSigne: IDocumentSigne) => {
      clearTimeout(timeout);
      supprimerListener();
      documentSigne.erreur &&
        postLogsErreurSurServeurOutilTech(
          documentSigne.erreur,
          signerParams.parametres.idAgent,
          signerParams.parametres.document.id,
          "DELIVRANCE"
        );
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
            { cle: "typeSignature", valeur: "Délivrance" },
            { cle: "estFictive", valeur: "false" },
            { cle: "idRequete", valeur: signerParams.parametres.document.idRequete },
            { cle: "idDocument", valeur: signerParams.parametres.document.id }
          ]
        }
      })
    );
  },

  signerDocument: (signerParams: ISignerParams) => {
    ModeDeveloppement.reponseDocument(signerParams);

    let retournerDocumentSigne: null | EventListener = null;

    const reponseWebext: Promise<IReponseDocumentSigne> = new Promise(resolve => {
      retournerDocumentSigne = ((reponse: CustomEvent<IReponseDocumentSigne>) => resolve(reponse.detail)) as EventListener;

      window.top?.addEventListener(EVENT_REPONSE_SIGNATURE, retournerDocumentSigne);
    });

    const supprimerListener = () =>
      retournerDocumentSigne && window.top?.removeEventListener(EVENT_REPONSE_SIGNATURE, retournerDocumentSigne);

    const timeout = setTimeout(() => {
      supprimerListener();
      postLogsErreurSurServeurOutilTech(
        ERREUR_WEBEXT_INDISPONIBLE,
        signerParams.parametres.idAgent,
        signerParams.parametres.idActe,
        signerParams.parametres.estMiseAJour ? "MISE A JOUR" : "CREATION"
      );
      signerParams.apresReponse({
        erreur: ERREUR_WEBEXT_INDISPONIBLE
      });
    }, TIMEOUT_WEBEXT);

    reponseWebext.then((documentSigne: IReponseDocumentSigne) => {
      clearTimeout(timeout);
      supprimerListener();
      documentSigne.erreur &&
        postLogsErreurSurServeurOutilTech(
          documentSigne.erreur,
          signerParams.parametres.idAgent,
          signerParams.parametres.idActe,
          signerParams.parametres.estMiseAJour ? "MISE A JOUR" : "CREATION"
        );
      signerParams.apresReponse(documentSigne);
    });

    const modeSignatureFF = gestionnaireSignatureFlag.getModeSignature();
    window.top?.dispatchEvent(
      new CustomEvent(EVENT_ENVOI_SIGNATURE_WEBEXT, {
        detail: {
          function: "SIGN",
          direction: "to-webextension",
          document: signerParams.parametres.document,
          pin: signerParams.parametres.codePin,
          mode: ModeSignatureUtil.estValide(modeSignatureFF) ? modeSignatureFF : ModeSignature.PKCS11_SIGNED,
          infos: [
            { cle: "typeSignature", valeur: signerParams.parametres.estMiseAJour ? "Mise à jour" : "Création" },
            { cle: "estFictive", valeur: "false" },
            { cle: "idActe", valeur: signerParams.parametres.idActe }
          ]
        }
      })
    );
  }
} as const;

const postLogsErreurSurServeurOutilTech = (
  erreurSignature: IErreurSignature,
  idUtilisateur: string,
  idDocument: string,
  typeSignature: "DELIVRANCE" | "MISE A JOUR" | "CREATION"
) => {
  if (!gestionnaireFeatureFlag.estActif(FeatureFlag.FF_LOG_SERVEUR)) return;

  appelApiAvecAxios(CONFIG_POST_LOGS, {
    body: [
      {
        date: dayjs().unix(),
        message: `Erreur signature ${typeSignature}: [${erreurSignature.code}] ${erreurSignature.libelle} - utilisateur ${idUtilisateur} - document ${idDocument} - ${erreurSignature.detail ?? "AUCUN DETAIL"}`
      }
    ]
  });
};

export default Signature;
