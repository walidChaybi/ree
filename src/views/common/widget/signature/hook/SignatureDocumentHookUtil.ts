import { getDocumentReponseById } from "@api/appels/requeteApi";
import { IResultatPatchDocumentReponse } from "@hook/DocumentReponseHook";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";
import { gestionnaireSignatureFlag } from "@util/signatureFlag/gestionnaireSignatureFlag";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import parametres from "../../../../../ressources/parametres.json";
import { SignatureErrors } from "../messages/ErrorsSignature";
export interface DocumentsByRequete {
  [idRequete: string]: DocumentsATraiter;
}

export interface SignatureReturn {
  document: string;
  erreurs: SignatureErrors[];
}

export interface DocumentToSign {
  infos: InfosSignature[];
  id: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  idRequete: string;
  numeroRequete: string;
}

export interface InfosSignature {
  cle: string;
  valeur: string;
}

export interface DocumentsATraiter {
  documentsToSign: DocumentToSign[];
  documentsToSave: DocumentToSave[];
  sousTypeRequete: SousTypeDelivrance;
  canal?: TypeCanal;
  idActe?: string;
}

export interface DocumentToSave {
  id: string;
  contenu: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  numeroRequete: string;
}

export const DIRECTION_TO_CALL_APP = "to-call-app";
export const CODE_ERREUR_NON_DISPO = "WEB_EXT1";
export const TIMER_SIGNATURE = "TimerContactWebExt";
export const SIGNATURE_TIMEOUT = parametres.signature.time_out_ms;
export const MAX_LEN_DOCUMENT_TO_SIGN_IN_BYTES =
  parametres.signature.max_len_doc_in_bytes;

export const EVENT_NON_DISPO = {
  detail: {
    direction: DIRECTION_TO_CALL_APP,
    erreurs: [{ code: CODE_ERREUR_NON_DISPO }]
  }
};

// ========================================== Fonctions ====================================================

export function changeDocumentToSign(
  documentsToSignWating: DocumentsByRequete,
  idRequetesToSign: string[],
  contenuDocument: string,
  setDocumentsToSignWating: (newDocuments: DocumentsByRequete) => void
) {
  if (
    documentsToSignWating[idRequetesToSign[0]].documentsToSign[0] !== undefined
  ) {
    const doc = documentsToSignWating[idRequetesToSign[0]].documentsToSign[0];
    documentsToSignWating[idRequetesToSign[0]].documentsToSave = [
      ...documentsToSignWating[idRequetesToSign[0]].documentsToSave,
      {
        id: doc.id,
        contenu: contenuDocument,
        mimeType: doc.mimeType,
        nomDocument: doc.nomDocument,
        conteneurSwift: doc.conteneurSwift,
        numeroRequete: doc.numeroRequete
      }
    ];

    documentsToSignWating[idRequetesToSign[0]].documentsToSign.shift();
  }

  if (documentsToSignWating[idRequetesToSign[0]].documentsToSign.length > 0) {
    setDocumentsToSignWating(Object.assign({}, documentsToSignWating));
  }
}

// Etape 2.2
function sendDocumentToSignature(
  result: IDocumentReponse,
  pinCode: string,
  documentsToSignWating: DocumentsByRequete,
  idRequetesToSign: string[],
  handleBackFromWebExtension: any
) {
  const detail = {
    function: "SIGN",
    direction: "to-webextension",
    document: result.contenu,
    pin: pinCode,
    mode: ModeSignatureUtil.isValid(
      gestionnaireSignatureFlag.getSignatureMode()
    )
      ? gestionnaireSignatureFlag.getSignatureMode()
      : ModeSignature.CERTIGNA_SIGNED,
    infos: documentsToSignWating[idRequetesToSign[0]].documentsToSign[0].infos,
    erreursSimulees: getErrorsMock()
  };

  gestionnaireTimer.declancheTimer(
    TIMER_SIGNATURE,
    SIGNATURE_TIMEOUT,
    true,
    handleBackFromWebExtension,
    EVENT_NON_DISPO
  );
  if (window.top) {
    window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
  }
}

// Etape 2.1
export function getDocumentAndSendToSignature(
  idRequetesToSign: string[],
  documentsToSignWating: DocumentsByRequete,
  setErrorsSignature: (errors: SignatureErrors) => void,
  setDocumentsToSignWating: (documentByRequete: DocumentsByRequete) => void,
  handleBackFromWebExtension: any,
  setDocumentsToSave: React.Dispatch<React.SetStateAction<DocumentToSave[]>>,
  pinCode?: string
) {
  if (idRequetesToSign.length > 0 && pinCode !== undefined) {
    getDocumentReponseById(
      documentsToSignWating[idRequetesToSign[0]].documentsToSign[0].id
    )
      .then((resultApi: any) => {
        const result: IDocumentReponse = resultApi.body.data;
        if (!result.contenu) {
          setErrorsSignature({
            numeroRequete:
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete,
            erreurs: [{ code: "FONC_4", libelle: "", detail: "" }]
          });
        } else if (result.contenu.length > MAX_LEN_DOCUMENT_TO_SIGN_IN_BYTES) {
          setErrorsSignature({
            numeroRequete:
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete,
            erreurs: [{ code: "FONC_10", libelle: "", detail: "" }]
          });
        } else if (estUnDocumentASigner(result.typeDocument)) {
          sendDocumentToSignature(
            result,
            pinCode,
            documentsToSignWating,
            idRequetesToSign,
            handleBackFromWebExtension
          );
        } else {
          changeDocumentToSign(
            documentsToSignWating,
            idRequetesToSign,
            result.contenu,
            setDocumentsToSignWating
          );

          const currentRequeteProcessing =
            documentsToSignWating[idRequetesToSign[0]];

          processResultWebExtension(
            currentRequeteProcessing,
            setDocumentsToSave
          );
        }
      })
      .catch(error => {
        setErrorsSignature({
          numeroRequete:
            documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
              .numeroRequete,
          erreurs: [{ code: "FONC_11", libelle: "", detail: "" }]
        });
      });
  }
}

function estUnDocumentASigner(uuidTypeDocument: string): boolean {
  return DocumentDelivrance.estExtraitCopieAsigner(uuidTypeDocument);
}

export function getNewStatusRequete(
  sousTypeRequete: SousTypeDelivrance,
  canal?: TypeCanal
) {
  switch (canal) {
    case TypeCanal.COURRIER:
      return StatutRequete.TRAITE_A_IMPRIMER;
    case TypeCanal.INTERNET:
      return StatutRequete.TRAITE_A_DELIVRER_DEMAT;
    case TypeCanal.RECE:
      return StatutRequete.TRAITE_REPONDU;
    default:
      if (sousTypeRequete === SousTypeDelivrance.RDC) {
        return StatutRequete.TRAITE_A_IMPRIMER;
      } else {
        return StatutRequete.TRAITE_A_DELIVRER_DEMAT;
      }
  }
}

function getErrorsMock(): string[] {
  const erreurs: string[] = [];
  const erreursMockTest = document.cookie.replace(
    /(?:(?:^|.*;\s*)receTestErreur\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (erreursMockTest !== "" && erreursMockTest !== undefined) {
    erreurs.push(erreursMockTest);
  }

  return erreurs;
}

export function laDirectionEstVersLAppliRece(result: any) {
  return result.direction && result.direction === DIRECTION_TO_CALL_APP;
}

export function desErreursOntEteRecues(result: any) {
  return result.erreurs !== undefined && result.erreurs.length > 0;
}

export function processResultWebExtension(
  currentRequeteProcessing: DocumentsATraiter,
  setDocumentsToSave: React.Dispatch<React.SetStateAction<DocumentToSave[]>>
) {
  if (currentRequeteProcessing.documentsToSign.length === 0) {
    setDocumentsToSave(currentRequeteProcessing.documentsToSave);
  }
}

export function handleResultatPatch(
  resultatPatchDocumentReponse: IResultatPatchDocumentReponse | undefined,
  setErrorsSignature: (el: any) => void,
  documentsByRequete: DocumentsByRequete,
  idRequetesToSign: string[],
  majStatusRequete: () => void
) {
  if (resultatPatchDocumentReponse) {
    if (resultatPatchDocumentReponse.erreur) {
      setErrorsSignature({
        erreurs: [
          {
            code: "UPDATE_DOC",
            libelle: "",
            detail: ""
          }
        ],
        numeroRequete:
          documentsByRequete[idRequetesToSign[0]].documentsToSave[0]
            ?.numeroRequete
      });
    } else {
      majStatusRequete();
    }
  }
}
