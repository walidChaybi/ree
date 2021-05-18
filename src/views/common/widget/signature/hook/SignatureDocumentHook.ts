import moment from "moment";
import { useState, useEffect, useCallback } from "react";
import { StatutRequete } from "../../../../../model/requete/StatutRequete";
import { SignatureErrors } from "../messages/ErrorsSignature";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import {
  ModeSignature,
  ModeSignatureUtil
} from "../../../../../model/requete/ModeSignature";
import { SuccessSignatureType } from "../messages/SuccessSignature";
import { FormatDate } from "../../../util/DateUtils";
import { SousTypeRequete } from "../../../../../model/requete/SousTypeRequete";
import messageManager from "../../../util/messageManager";
import { getText } from "../../Text";
import { TypeDocument } from "../../../../../model/requete/TypeDocument";
import {
  IQueryParameterUpdateStatutRequete,
  useUpdateStatutRequeteApi
} from "../../../hook/UpdateStatutRequeteHook";
import { requestDocumentApi } from "../../../hook/DocumentRequeteHook";
import { useUpdateDocumentApi } from "./UpdateDocumentHook";
import {
  IRequestDocumentApiResult,
  IQueryParameterUpdateDocument
} from "../../../../../api/appels/requeteApi";
import { gestionnaireSignatureFlag } from "../../../util/signatureFlag/gestionnaireSignatureFlag";
import gestionnaireTimer from "../../../util/timer/GestionnaireTimer";
import parametres from "../../../../../ressources/parametres.json";

export interface IQueryParametersPourRequete {
  statut?: StatutRequete;
  idRequete: string;
}

export interface DocumentsByRequete {
  [idRequete: string]: DocumentsATraiter;
}

export interface SignatureReturn {
  document: string;
  erreurs: SignatureErrors[];
}

interface DocumentToSign {
  infos: InfosSignature[];
  idDocumentDelivre: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  idRequete: string;
  numeroRequete: number;
}

interface InfosSignature {
  cle: string;
  valeur: string;
}

export interface DocumentsATraiter {
  documentsToSign: DocumentToSign[];
  documentsToSave: DocumentToSave[];
  sousTypeRequete: SousTypeRequete;
}

interface DocumentToSave {
  idDocument: string;
  contenu: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  numeroRequete: number;
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
  const [documentsToSignWating, setDocumentsToSignWating] = useState<
    DocumentsByRequete
  >(documentsByRequete);

  const [idRequetesToSign, setIdRequetesToSign] = useState<string[]>(
    documentsByRequete !== undefined ? Object.keys(documentsByRequete) : []
  );

  const [documentsToSave, setDocumentsToSave] = useState<DocumentToSave[]>([]);
  const [successSignature, setSuccessSignature] = useState<
    SuccessSignatureType[]
  >([]);
  const [errorsSignature, setErrorsSignature] = useState<SignatureErrors>();

  const [
    updateDocumentQueryParamState,
    setUpdateDocumentQueryParamState
  ] = useState<IQueryParameterUpdateDocument[]>([]);

  const [
    updateStatutRequeteQueryParamState,
    setUpdateStatutRequeteQueryParamState
  ] = useState<IQueryParameterUpdateStatutRequete>();

  const callBackMajStatusRequete = useCallback(() => {
    setUpdateDocumentQueryParamState([]);

    const currentRequeteProcessing = documentsToSignWating[idRequetesToSign[0]];
    setUpdateStatutRequeteQueryParamState({
      idRequete: idRequetesToSign[0],
      statut: getNewStatusRequete(currentRequeteProcessing.sousTypeRequete)
    });

    const newSuccesses: SuccessSignatureType[] = [
      ...successSignature,
      {
        messageId: "signature.success",
        date: moment().format(FormatDate.DDMMYYYYHHmm),
        numeroRequete: `${currentRequeteProcessing.documentsToSave[0].numeroRequete}`
      }
    ];

    const newRequetesId = [...idRequetesToSign];
    newRequetesId.shift();
    setIdRequetesToSign(newRequetesId);
    if (newRequetesId.length === 0) {
      messageManager.showSuccessAndClose(
        getText("signature.successAllSignature")
      );
    }

    setSuccessSignature(newSuccesses);
  }, [documentsToSignWating, idRequetesToSign, successSignature]);

  const { errorUpdateDocument } = useUpdateDocumentApi(
    updateDocumentQueryParamState,
    callBackMajStatusRequete
  );

  useEffect(() => {
    if (errorUpdateDocument != null) {
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
            .numeroRequete
      });
    }
    // Attention ne pas dépendre de "documentsByRequete" ni de "idRequetesToSign" car si une erreur ce produit (plantage API maj)
    //   alors "documentsByRequete" et "idRequetesToSign" sont remis à jour donc on repasse dans ce code
    //   alors que updateDocumentQueryParamState et errorUpdateDocument n'ont pas bougés et documentsByRequete[idRequetesToSign[0]].documentsToSave = [].
    //   => ceci provoque un plantage car documentsByRequete[idRequetesToSign[0]].documentsToSave[0] = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorUpdateDocument]);

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState);

  useEffect(() => {
    setUpdateDocumentQueryParamState(
      documentsToSave.map(document => {
        return {
          idDocumentDelivre: document.idDocument,
          contenu: document.contenu,
          conteneurSwift: document.conteneurSwift,
          nom: document.nomDocument
        };
      })
    );
  }, [documentsToSave]);

  useEffect(() => {
    setDocumentsToSignWating(documentsByRequete);
    setIdRequetesToSign(Object.keys(documentsByRequete));
    setSuccessSignature([]);
    setErrorsSignature(undefined);
  }, [documentsByRequete]);

  const processResultWebExtension = (
    currentRequeteProcessing: DocumentsATraiter
  ) => {
    if (currentRequeteProcessing.documentsToSign.length === 0) {
      setDocumentsToSave(currentRequeteProcessing.documentsToSave);
    }
  };
  /**
   * @description Handler concernant les communications avec la webextension
   *
   * @event l'événement de retour de la webext
   */
  const handleBackFromWebExtension = useCallback(
    (event: Event): void => {
      const customEvent = event as CustomEvent;
      const result = customEvent.detail;

      gestionnaireTimer.annuleTimer(TIMER_SIGNATURE);

      if (result.direction && result.direction === DIRECTION_TO_CALL_APP) {
        if (result.erreurs !== undefined && result.erreurs.length > 0) {
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
          processResultWebExtension(currentRequeteProcessing);
        }
      }
    },
    [documentsToSignWating, idRequetesToSign]
  );

  useEffect(() => {
    getDocumentAndSendToSignature(
      idRequetesToSign,
      documentsToSignWating,
      setErrorsSignature,
      setDocumentsToSignWating,
      processResultWebExtension,
      handleBackFromWebExtension,
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
        idDocument: doc.idDocumentDelivre,
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

function sendDocumentToSignature(
  result: IRequestDocumentApiResult,
  pinCode: string,
  documentsToSignWating: DocumentsByRequete,
  idRequetesToSign: string[],
  handleBackFromWebExtension: any
) {
  const detail = {
    function: "SIGN",
    direction: "to-webextension",
    document: result.documentDelivre.contenu,
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

function getDocumentAndSendToSignature(
  idRequetesToSign: string[],
  documentsToSignWating: DocumentsByRequete,
  setErrorsSignature: (errors: SignatureErrors) => void,
  setDocumentsToSignWating: (documentByRequete: DocumentsByRequete) => void,
  processResultWebExtension: (
    currentRequeteProcessing: DocumentsATraiter
  ) => void,
  handleBackFromWebExtension: any,
  pinCode?: string
) {
  if (idRequetesToSign.length > 0 && pinCode !== undefined) {
    requestDocumentApi(
      documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
        .idDocumentDelivre,
      GroupementDocument.DocumentDelivre,
      documentsToSignWating[idRequetesToSign[0]].documentsToSign[0].mimeType
    )
      .then(result => {
        if (!result.documentDelivre.contenu) {
          setErrorsSignature({
            numeroRequete:
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete,
            erreurs: [{ code: "FONC_4", libelle: "", detail: "" }]
          });
        } else if (
          result.documentDelivre.contenu.length >
          MAX_LEN_DOCUMENT_TO_SIGN_IN_BYTES
        ) {
          setErrorsSignature({
            numeroRequete:
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete,
            erreurs: [{ code: "FONC_10", libelle: "", detail: "" }]
          });
        } else if (
          isAllowedTypeDocumentToBeSigned(result.documentDelivre.typeDocument)
        ) {
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
            result.documentDelivre.contenu,
            setDocumentsToSignWating
          );

          const currentRequeteProcessing =
            documentsToSignWating[idRequetesToSign[0]];

          processResultWebExtension(currentRequeteProcessing);
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

function isAllowedTypeDocumentToBeSigned(typeDocument: string): boolean {
  return (
    [
      TypeDocument.ExtraitAvecFiliation,
      TypeDocument.ExtraitSansFiliation,
      TypeDocument.ExtraitPlurilingue,
      TypeDocument.CopieIntegrale
    ].find(type => type === typeDocument) !== undefined
  );
}

function getNewStatusRequete(sousTypeRequete: SousTypeRequete) {
  if (sousTypeRequete === SousTypeRequete.RequeteDelivranceCourrier) {
    return StatutRequete.AImprimer;
  } else {
    return StatutRequete.ATraiterDemat;
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
