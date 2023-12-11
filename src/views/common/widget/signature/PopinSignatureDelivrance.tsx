import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { getLibelle } from "@util/Utils";
import React from "react";
import { CodePinForm } from "./CodePinForm";
import { ProgressSignature } from "./ProgressSignature";
import { useSignatureDocumentHookDelivrance } from "./hook/SignatureDocumentHookDelivrance";
import { DocumentsByRequete } from "./hook/SignatureDocumentHookUtilDelivrance";
import { ErreurSignature } from "./messages/ErreurSignature";
import { SuccessSignature } from "./messages/SuccessSignature";
import "./scss/PopinSignatureDelivrance.scss";

interface PopinSignatureDelivranceProps {
  documentsByRequete: DocumentsByRequete;
  open: boolean;
  onClose: (isOpen: boolean, hasError: boolean) => void;
}

export const PopinSignatureDelivrance: React.FC<
  PopinSignatureDelivranceProps
> = ({ documentsByRequete, open, onClose }) => {
  const [pinCode, setPinCode] = React.useState<string | undefined>();

  const { successSignature, errorSignature, idRequetesToSign } =
    useSignatureDocumentHookDelivrance(documentsByRequete, pinCode);

  // Si l'erreur concerne le code Pin on le réinitialise pour que l'utilisateur le saisisse à nouveau lors d'une prochaine tentative de signature
  if (pinCode && erreurDeCodePin()) {
    setPinCode(undefined);
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="PopinSignatureDelivrance"
      >
        <DialogTitle id="alert-dialog-title">
          {getLibelle("Signature des documents")}
        </DialogTitle>
        <DialogContent>
          <SuccessSignature successes={successSignature} />

          {errorSignature !== undefined && (
            <ErreurSignature erreur={errorSignature} />
          )}
          {pinCode !== undefined || erreurDeCodePin() ? (
            <>
              <ProgressSignature
                onClose={onClose}
                error={errorSignature !== undefined}
                documentsByRequete={documentsByRequete}
                idsRequetesToSign={idRequetesToSign}
              />
            </>
          ) : (
            <CodePinForm onClose={onClose} setCodePin={setPinCode} />
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );

  function erreurDeCodePin() {
    return errorSignature?.typeErreur.code === "FONC_3";
  }
};
