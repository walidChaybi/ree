import React, { useEffect, useState, useCallback } from "react";
import {
  useUpdateDocumentApi,
  IQueryParameterUpdateDocument,
} from "../UpdateDocumentHook";
import { requestDocumentApi } from "../visualisation/document/DocumentRequeteHook";
import { GroupementDocument } from "../../../../model/requete/GroupementDocument";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { ModeSignature } from "../../../../model/requete/ModeSignature";
import {
  useUpdateStatutRequeteApi,
  IQueryParameterUpdateStatutRequete,
} from "../UpdateStatutRequeteHook";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { getText } from "../../../common/widget/Text";
import {
  MessagePopin,
  PopinMessageType,
} from "../../../common/widget/MessagePopin";
import { ProgressSignature } from "./ProgressSignature";
import { FormPinCode } from "./FormPinCode";
import { SignatureErrors, ErrorsSignature } from "./ErrorsSignature";
import "./sass/PopinSignature.scss";

interface PopinSignatureProps {
  documentsToSign: DocumentToSign[];
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

export interface DocumentToSign {
  infos: InfosSignature[];
  idDocumentDelivre: string;
  mimeType: string;
  nomDocument: string;
  conteneurSwift: string;
  idRequete: string;
}

interface InfosSignature {
  [key: string]: string;
}

export interface SignatureReturn {
  document: string;
  erreurs: SignatureErrors[];
}

export const PopinSignature: React.FC<PopinSignatureProps> = ({
  documentsToSign,
  open,
  onClose,
}) => {
  const [
    updateDocumentQueryParamState,
    setUpdateDocumentQueryParamState,
  ] = React.useState<IQueryParameterUpdateDocument>();

  const [
    updateStatutRequeteQueryParamState,
    setUpdateStatutRequeteQueryParamState,
  ] = React.useState<IQueryParameterUpdateStatutRequete>();

  const [documentsToSignWating, setDocumentsToSignWating] = useState<
    DocumentToSign[]
  >(documentsToSign);

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState);

  const [pinCode, setPinCode] = React.useState<number>();
  const [successSignature, setSuccessSignature] = React.useState<boolean>(
    false
  );

  const [errorsSignature, setErrorsSignature] = React.useState<
    SignatureErrors[]
  >([]);

  console.log("documentsToSign", documentsToSign);
  useEffect(() => {
    if (documentsToSignWating.length > 0 && pinCode !== undefined) {
      requestDocumentApi(
        documentsToSignWating[0].idDocumentDelivre,
        GroupementDocument.DocumentDelivre,
        documentsToSignWating[0].mimeType
      ).then((result) => {
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
          infos: documentsToSignWating[0].infos,
        };
        window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
      });
    }
  }, [documentsToSignWating, pinCode]);

  useEffect(() => {
    setDocumentsToSignWating(documentsToSign);
  }, [documentsToSign]);

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

  useUpdateDocumentApi(updateDocumentQueryParamState);

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
          setUpdateDocumentQueryParamState({
            nom: result.nom,
            conteneurSwift: documentsToSignWating[0].conteneurSwift,
            contenu: result.contenu,
          });

          const idRequeteAModifier = documentsToSignWating[0].idRequete;

          const newDocumentsToSign = [...documentsToSignWating];
          newDocumentsToSign.shift();
          setDocumentsToSignWating(newDocumentsToSign);

          if (newDocumentsToSign.length === 0) {
            setSuccessSignature(true);
          }

          if (
            newDocumentsToSign.find(
              (doc) => doc.idRequete === idRequeteAModifier
            ) !== undefined
          ) {
            setUpdateStatutRequeteQueryParamState({
              idRequete: idRequeteAModifier,
              statut: StatutRequete.ATraiterDemat,
            });
          }
        }
      }
    },
    [documentsToSignWating]
  );

  return (
    <div>
      <MessagePopin
        message={getText("signature.success")}
        messageType={PopinMessageType.Success}
        isOpen={successSignature}
      />

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {getText("signature.titrePopIn")}
        </DialogTitle>
        <DialogContent>
          <ErrorsSignature errors={errorsSignature} />
          {pinCode !== undefined ? (
            <>
              <ProgressSignature
                onClose={onClose}
                documentsToSign={documentsToSign}
                documentsToSignWating={documentsToSignWating}
              />
            </>
          ) : (
            <FormPinCode onClose={onClose} setPinCode={setPinCode} />
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};
