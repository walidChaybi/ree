import moment from "moment";
import { useState, useEffect, useCallback } from "react";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { SignatureErrors } from "./ErrorsSignature";
import {
  IQueryParameterUpdateDocument,
  useUpdateDocumentApi,
} from "../UpdateDocumentHook";
import {
  IQueryParameterUpdateStatutRequete,
  useUpdateStatutRequeteApi,
} from "../UpdateStatutRequeteHook";
import {
  requestDocumentApi,
  IRequestDocumentApiResult,
} from "../visualisation/document/DocumentRequeteHook";
import { GroupementDocument } from "../../../../model/requete/GroupementDocument";
import { ModeSignature } from "../../../../model/requete/ModeSignature";
import { SuccessSignatureType } from "./SuccessSignature";
import { FormatDate } from "../../../../ressources/FormatDate";

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
  [key: string]: string;
}

export interface DocumentsATraiter {
  documentsToSign: DocumentToSign[];
  documentsToSave: DocumentToSave[];
}

interface DocumentToSave {
  idDocument: string;
  contenu: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  numeroRequete: number;
}

export function useSignatureDocumentHook(
  documentsByRequete: DocumentsByRequete,
  pinCode?: number
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
  const [errorsSignature, setErrorsSignature] = useState<SignatureErrors[]>([]);

  const [
    updateDocumentQueryParamState,
    setUpdateDocumentQueryParamState,
  ] = useState<IQueryParameterUpdateDocument[]>([]);

  const [
    updateStatutRequeteQueryParamState,
    setUpdateStatutRequeteQueryParamState,
  ] = useState<IQueryParameterUpdateStatutRequete>();

  useUpdateDocumentApi(updateDocumentQueryParamState);

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState);

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
  });

  useEffect(() => {
    setUpdateDocumentQueryParamState(
      documentsToSave.map((document) => {
        return {
          idDocumentDelivre: document.idDocument,
          contenu: document.contenu,
          conteneurSwift: document.conteneurSwift,
          nom: document.nomDocument,
        };
      })
    );
  }, [documentsToSave]);

  useEffect(() => {
    getDocumentAndSendToSignature(
      idRequetesToSign,
      documentsToSignWating,
      pinCode
    );
  }, [pinCode, idRequetesToSign, documentsToSignWating]);

  useEffect(() => {
    setDocumentsToSignWating(documentsByRequete);
    setIdRequetesToSign(Object.keys(documentsByRequete));
  }, [documentsByRequete]);

  const processResultWebExtension = useCallback(
    (currentRequeteProcessing: DocumentsATraiter) => {
      if (currentRequeteProcessing.documentsToSign.length === 0) {
        setDocumentsToSave(currentRequeteProcessing.documentsToSave);
        setUpdateStatutRequeteQueryParamState({
          idRequete: idRequetesToSign[0],
          statut: StatutRequete.ATraiterDemat,
        });

        const newSuccesses: SuccessSignatureType[] = [
          ...successSignature,
          {
            messageId: "signature.success",
            date: moment().format(FormatDate.DDMMYYYHHmm),
            numeroRequete: `${currentRequeteProcessing.documentsToSave[0].numeroRequete}`,
          },
        ];

        const newRequetesId = [...idRequetesToSign];
        newRequetesId.shift();
        setIdRequetesToSign(newRequetesId);

        setSuccessSignature(newSuccesses);
      }
    },
    [successSignature, idRequetesToSign]
  );

  /**
   * @description Handler concernant les communications avec la webextension
   *
   * @event l'événement de retour de la webext
   */
  const handleBackFromWebExtension = useCallback(
    (event: Event): void => {
      const customEvent = event as CustomEvent;
      const result = customEvent.detail;
      if (result.direction && result.direction === "to-call-app") {
        if (result.erreurs !== undefined && result.erreurs.length > 0) {
          setErrorsSignature(result.erreurs);
        } else {
          changeDocumentToSign(
            documentsToSignWating,
            idRequetesToSign,
            result.contenu,
            setDocumentsToSignWating
          );

          const currentRequeteProcessing =
            documentsToSignWating[idRequetesToSign[0]];

          processResultWebExtension(currentRequeteProcessing);
        }
      }
    },
    [documentsToSignWating, idRequetesToSign, processResultWebExtension]
  );

  return {
    successSignature,
    errorsSignature,
    idRequetesToSign,
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
        numeroRequete: doc.numeroRequete,
      },
    ];

    documentsToSignWating[idRequetesToSign[0]].documentsToSign.shift();
  }
  if (documentsToSignWating[idRequetesToSign[0]].documentsToSign.length > 0) {
    setDocumentsToSignWating(Object.assign({}, documentsToSignWating));
  }
}

function sendDocumentToSignature(
  result: IRequestDocumentApiResult,
  pinCode: number,
  documentsToSignWating: DocumentsByRequete,
  idRequetesToSign: string[]
) {
  const detail = {
    function: "SIGN",
    contenu: result.documentDelivre.contenu, // TODO supprimer
    direction: "to-webextension",
    conteneurSwift: result.documentDelivre.conteneurSwift, // TODO supprimer
    nom: result.documentDelivre.nom, // TODO supprimer
    document: result.documentDelivre.contenu,
    pin: pinCode,
    mode:
      process.env.NODE_ENV === "development"
        ? ModeSignature.Self
        : ModeSignature.Certigna,
    infos: documentsToSignWating[idRequetesToSign[0]].documentsToSign[0].infos,
  };
  window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
}

function getDocumentAndSendToSignature(
  idRequetesToSign: string[],
  documentsToSignWating: DocumentsByRequete,
  pinCode?: number
) {
  if (idRequetesToSign.length > 0 && pinCode !== undefined) {
    requestDocumentApi(
      documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
        .idDocumentDelivre,
      GroupementDocument.DocumentDelivre,
      documentsToSignWating[idRequetesToSign[0]].documentsToSign[0].mimeType
    ).then((result) => {
      sendDocumentToSignature(
        result,
        pinCode,
        documentsToSignWating,
        idRequetesToSign
      );
    });
  }
}
