import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  getDocumentReponseById,
  IMiseAJourDocumentParams
} from "../../../../../api/appels/requeteApi";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import {
  ModeSignature,
  ModeSignatureUtil
} from "../../../../../model/requete/ModeSignature";
import parametres from "../../../../../ressources/parametres.json";
import { usePatchDocumentsReponseApi } from "../../../hook/DocumentReponseHook";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../hook/requete/ActionHook";
import { FormatDate } from "../../../util/DateUtils";
import messageManager from "../../../util/messageManager";
import { gestionnaireSignatureFlag } from "../../../util/signatureFlag/gestionnaireSignatureFlag";
import gestionnaireTimer from "../../../util/timer/GestionnaireTimer";
import { getLibelle } from "../../../util/Utils";
import { SignatureErrors } from "../messages/ErrorsSignature";
import { SuccessSignatureType } from "../messages/SuccessSignature";

export interface DocumentsByRequete {
  [idRequete: string]: DocumentsATraiter;
}

export interface SignatureReturn {
  document: string;
  erreurs: SignatureErrors[];
}

interface DocumentToSign {
  infos: InfosSignature[];
  id: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  idRequete: string;
  numeroRequete: string;
}

interface InfosSignature {
  cle: string;
  valeur: string;
}

export interface DocumentsATraiter {
  documentsToSign: DocumentToSign[];
  documentsToSave: DocumentToSave[];
  sousTypeRequete: SousTypeDelivrance;
}

interface DocumentToSave {
  id: string;
  contenu: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  numeroRequete: string;
}

const DIRECTION_TO_CALL_APP = "to-call-app";
const CODE_ERREUR_NON_DISPO = "WEB_EXT1";
const TIMER_SIGNATURE = "TimerContactWebExt";
const SIGNATURE_TIMEOUT = parametres.signature.time_out_ms;
const MAX_LEN_DOCUMENT_TO_SIGN_IN_BYTES =
  parametres.signature.max_len_doc_in_bytes;

const EVENT_NON_DISPO = {
  detail: {
    direction: DIRECTION_TO_CALL_APP,
    erreurs: [{ code: CODE_ERREUR_NON_DISPO }]
  }
};

export function useSignatureDocumentHook(
  documentsByRequete: DocumentsByRequete,
  pinCode?: string
) {
  const [
    documentsToSignWating,
    setDocumentsToSignWating
  ] = useState<DocumentsByRequete>(documentsByRequete);

  const [idRequetesToSign, setIdRequetesToSign] = useState<string[]>(
    documentsByRequete !== undefined ? Object.keys(documentsByRequete) : []
  );

  const [documentsToSave, setDocumentsToSave] = useState<DocumentToSave[]>([]);
  const [successSignature, setSuccessSignature] = useState<
    SuccessSignatureType[]
  >([]);
  const [errorsSignature, setErrorsSignature] = useState<SignatureErrors>();

  const [miseAJourDocumentParams, setMiseAJourDocumentParams] = useState<
    IMiseAJourDocumentParams[]
  >([]);

  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<CreationActionEtMiseAjourStatutParams>();

  const majStatusRequete = useCallback(() => {
    setMiseAJourDocumentParams([]);

    const currentRequeteProcessing = documentsToSignWating[idRequetesToSign[0]];
    setCreationActionEtMiseAjourStatutParams({
      requeteId: idRequetesToSign[0],
      statutRequete: getNewStatusRequete(
        currentRequeteProcessing.sousTypeRequete
      ),
      libelleAction: "Signée"
    });

    const newSuccesses: SuccessSignatureType[] = [
      ...successSignature,
      {
        date: moment().format(FormatDate.DDMMYYYYHHmm),
        numeroRequete: `${currentRequeteProcessing.documentsToSave[0].numeroRequete}`
      }
    ];

    const newRequetesId = [...idRequetesToSign];
    newRequetesId.shift();
    setIdRequetesToSign(newRequetesId);
    if (newRequetesId.length === 0) {
      messageManager.showSuccessAndClose(
        getLibelle("Signature des documents effectuée avec succès")
      );
    }

    setSuccessSignature(newSuccesses);
  }, [documentsToSignWating, idRequetesToSign, successSignature]);

  const resultatPatchDocumentReponse = usePatchDocumentsReponseApi(
    miseAJourDocumentParams
  );

  useEffect(() => {
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
    // Attention ne pas dépendre de "documentsByRequete" ni de "idRequetesToSign" car si une erreur ce produit (plantage API maj)
    //   alors "documentsByRequete" et "idRequetesToSign" sont remis à jour donc on repasse dans ce code
    //   alors que updateDocumentQueryParamState et errorUpdateDocument n'ont pas bougés et documentsByRequete[idRequetesToSign[0]].documentsToSave = [].
    //   => ceci provoque un plantage car documentsByRequete[idRequetesToSign[0]].documentsToSave[0] = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatPatchDocumentReponse]);

  usePostCreationActionEtMiseAjourStatutApi(
    creationActionEtMiseAjourStatutParams
  );

  useEffect(() => {
    setMiseAJourDocumentParams(
      documentsToSave.map(document => {
        return {
          id: document.id,
          contenu: document.contenu,
          conteneurSwift: document.conteneurSwift,
          nom: document.nomDocument
        };
      })
    );
  }, [documentsToSave]);

  // Etape 1
  useEffect(() => {
    setDocumentsToSignWating(documentsByRequete);
    setIdRequetesToSign(Object.keys(documentsByRequete));
    setSuccessSignature([]);
    setErrorsSignature(undefined);
  }, [documentsByRequete]);

  /**
   * @description Handler concernant les communications avec la webextension
   *
   * @event l'événement de retour de la webext
   */
  // Etape 3
  const handleBackFromWebExtension = useCallback(
    (event: Event): void => {
      const customEvent = event as CustomEvent;
      const result = customEvent.detail;

      gestionnaireTimer.annuleTimer(TIMER_SIGNATURE);

      if (laDirectionEstVersLAppliRece(result)) {
        if (desErreursOntEteRecues(result)) {
          setErrorsSignature({
            numeroRequete:
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete,
            erreurs: result.erreurs
          });
        } else {
          changeDocumentToSign(
            documentsToSignWating,
            idRequetesToSign,
            result.document,
            setDocumentsToSignWating
          );

          const currentRequeteProcessing =
            documentsToSignWating[idRequetesToSign[0]];
          processResultWebExtension(
            currentRequeteProcessing,
            setDocumentsToSave
          );
        }
      }
    },
    [documentsToSignWating, idRequetesToSign]
  );

  // Etape 2
  useEffect(() => {
    getDocumentAndSendToSignature(
      idRequetesToSign,
      documentsToSignWating,
      setErrorsSignature,
      setDocumentsToSignWating,
      handleBackFromWebExtension,
      setDocumentsToSave,
      pinCode
    );
  }, [
    pinCode,
    idRequetesToSign,
    documentsToSignWating,
    handleBackFromWebExtension
  ]);

  useEffect(() => {
    // Ajout du listener pour communiquer avec la webextension
    window.top.addEventListener(
      "signWebextResponse",
      handleBackFromWebExtension
    );

    return () => {
      window.top.removeEventListener(
        "signWebextResponse",
        handleBackFromWebExtension
      );
    };
  }, [handleBackFromWebExtension]);

  return {
    successSignature,
    errorsSignature,
    idRequetesToSign
  };
}

// ========================================== Fonctions ====================================================

function changeDocumentToSign(
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
  window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
}

// Etape 2.1
function getDocumentAndSendToSignature(
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
  const documentDelivrance = DocumentDelivrance.getEnumFor(uuidTypeDocument);
  return DocumentDelivrance.estExtraitCopieAsigner(documentDelivrance.code);
}

function getNewStatusRequete(sousTypeRequete: SousTypeDelivrance) {
  if (sousTypeRequete === SousTypeDelivrance.RDC) {
    // TODO tester Canal courrier plutôt ?
    return StatutRequete.TRAITE_A_IMPRIMER;
  } else {
    // TODO tester Canal internet plutôt ?
    return StatutRequete.TRAITE_A_DELIVRER_DEMAT;
  }
  // TODO cas du canal RECE => TRAITE_REPONDU
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

function laDirectionEstVersLAppliRece(result: any) {
  return result.direction && result.direction === DIRECTION_TO_CALL_APP;
}

function desErreursOntEteRecues(result: any) {
  return result.erreurs !== undefined && result.erreurs.length > 0;
}

function processResultWebExtension(
  currentRequeteProcessing: DocumentsATraiter,
  setDocumentsToSave: React.Dispatch<React.SetStateAction<DocumentToSave[]>>
) {
  if (currentRequeteProcessing.documentsToSign.length === 0) {
    setDocumentsToSave(currentRequeteProcessing.documentsToSave);
  }
}
