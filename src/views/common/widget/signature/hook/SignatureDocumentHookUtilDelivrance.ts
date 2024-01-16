import { getDocumentReponseById } from "@api/appels/requeteApi";
import { IResultatPatchDocumentReponse } from "@hook/DocumentReponseHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";
import { IDetailInfos } from "@model/signature/IDetailInfos";
import { gestionnaireSignatureFlag } from "@util/signatureFlag/gestionnaireSignatureFlag";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import parametres from "../../../../../ressources/parametres.json";
import { SignatureErreur } from "../messages/ErreurSignature";
export interface DocumentsByRequete {
  [idRequete: string]: DocumentsATraiter;
}

export interface SignatureReturn {
  document: string;
  erreur: SignatureErreur;
}

export interface DocumentToSign {
  infos: IDetailInfos[];
  id: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  idRequete: string;
  numeroRequete: string;
}

export interface DocumentsATraiter {
  documentsToSign: DocumentToSign[];
  documentsToSave: DocumentToSave[];
  sousTypeRequete: SousTypeDelivrance;
  canal?: TypeCanal;
  acte: IFicheActe;
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
export const LIBELLE_ERREUR_NON_DISPO =
  "La signature électronique est actuellement indisponible ou n'est pas installée.";
export const TIMER_SIGNATURE = "TimerContactWebExt";
export const SIGNATURE_TIMEOUT = parametres.signature.time_out_ms;
export const MAX_LEN_DOCUMENT_TO_SIGN_IN_BYTES =
  parametres.signature.max_len_doc_in_bytes;

export const EVENT_NON_DISPO = {
  detail: {
    direction: DIRECTION_TO_CALL_APP,
    erreur: { code: CODE_ERREUR_NON_DISPO, libelle: LIBELLE_ERREUR_NON_DISPO }
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
  handleBackFromWebExtensionCallback: any
) {
  const detail = {
    function: "SIGN",
    direction: "to-webextension",
    document: result.contenu,
    pin: pinCode,
    mode: ModeSignatureUtil.estValide(
      gestionnaireSignatureFlag.getModeSignature()
    )
      ? gestionnaireSignatureFlag.getModeSignature()
      : ModeSignature.CERTIGNA_SIGNED,
    infos: documentsToSignWating[idRequetesToSign[0]].documentsToSign[0].infos,
    erreurSimulee: getErrorMock(),
    erreursSimulees: null
  };

  gestionnaireTimer.declancheTimer(
    TIMER_SIGNATURE,
    SIGNATURE_TIMEOUT,
    true,
    handleBackFromWebExtensionCallback,
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
  setErrorSignature: (error: SignatureErreur) => void,
  setDocumentsToSignWating: (documentByRequete: DocumentsByRequete) => void,
  handleBackFromWebExtensionCallback: any,
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
          setErrorSignature({
            complementInformationErreur: `Requête n°${
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete
            }`,
            typeErreur: {
              code: "FONC_4",
              libelle: "Document à signer vide ou null",
              detail: ""
            }
          });
        } else if (result.contenu.length > MAX_LEN_DOCUMENT_TO_SIGN_IN_BYTES) {
          setErrorSignature({
            complementInformationErreur: `Requête n°${
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete
            }`,
            typeErreur: {
              code: "FONC_10",
              libelle: "Document à signer trop gros",
              detail: ""
            }
          });
        } else if (estUnDocumentASigner(result.typeDocument)) {
          sendDocumentToSignature(
            result,
            pinCode,
            documentsToSignWating,
            idRequetesToSign,
            handleBackFromWebExtensionCallback
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
        setErrorSignature({
          complementInformationErreur: `Requête n°${
            documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
              .numeroRequete
          }`,
          typeErreur: {
            code: "FONC_11",
            libelle:
              "Récupération des documents à signer impossible actuellement",
            detail: ""
          }
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

function getErrorMock(): string | null {
  const erreurMockTest = document.cookie.replace(
    /(?:(?:^|.*;\s*)receTestErreur\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (erreurMockTest !== "" && erreurMockTest !== undefined) {
    return erreurMockTest;
  }

  return null;
}

export function laDirectionEstVersLAppliRece(result: any) {
  return result.direction && result.direction === DIRECTION_TO_CALL_APP;
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
        erreur: {
          code: "UPDATE_DOC",
          libelle: "Impossible de mettre à jour les documents",
          detail: ""
        },
        numeroRequete:
          documentsByRequete[idRequetesToSign[0]].documentsToSave[0]
            ?.numeroRequete
      });
    } else {
      majStatusRequete();
    }
  }
}

export function handleBackFromWebExtension(
  resultat: any,
  documentsToSignWating: DocumentsByRequete,
  idRequetesToSign: string[],
  setErrorsSignature: React.Dispatch<
    React.SetStateAction<SignatureErreur | undefined>
  >,
  setDocumentsToSignWating: React.Dispatch<
    React.SetStateAction<DocumentsByRequete>
  >,
  setDocumentsToSave: React.Dispatch<React.SetStateAction<DocumentToSave[]>>
): void {
  gestionnaireTimer.annuleTimer(TIMER_SIGNATURE);
  if (laDirectionEstVersLAppliRece(resultat)) {
    if (resultat.erreur && Object.keys(resultat.erreur).length > 0) {
      setErrorsSignature({
        typeErreur: resultat.erreur,
        complementInformationErreur: `Requête n°${
          documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
            ?.numeroRequete
        }`
      });
    } else {
      changeDocumentToSign(
        documentsToSignWating,
        idRequetesToSign,
        resultat.document,
        setDocumentsToSignWating
      );
      processResultWebExtension(
        documentsToSignWating[idRequetesToSign[0]],
        setDocumentsToSave
      );
    }
  }
}
