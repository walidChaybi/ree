import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import React from "react";
import { getLibelle } from "../../../common/util/Utils";
import { storeRece } from "../../util/storeRece";
import { FormPinCode } from "./FormPinCode";
import {
  DocumentsByRequete,
  useSignatureDocumentHook
} from "./hook/SignatureDocumentHook";
import { ErrorsSignature } from "./messages/ErrorsSignature";
import { SuccessSignature } from "./messages/SuccessSignature";
import { ProgressSignature } from "./ProgressSignature";
import "./scss/PopinSignature.scss";

interface PopinSignatureProps {
  documentsByRequete: DocumentsByRequete;
  open: boolean;
  onClose: (isOpen: boolean, hasError: boolean) => void;
}

export const PopinSignature: React.FC<PopinSignatureProps> = ({
  documentsByRequete,
  open,
  onClose
}) => {
  const [pinCode, setPinCode] = React.useState<string | undefined>(
    storeRece.codePin
  );

  const {
    successSignature,
    errorsSignature,
    idRequetesToSign
  } = useSignatureDocumentHook(documentsByRequete, pinCode);

  // Si une des erreurs concerne le code Pin on le réinitialise pour que l'utilisateur le saisisse à nouveau lors d'une prochaine tentative de signature
  if (storeRece.codePin && erreurDeCodePin()) {
    storeRece.resetCodePin();
    setPinCode(storeRece.codePin);
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="PopinSignature"
      >
        <DialogTitle id="alert-dialog-title">
          {getLibelle("Signature des documents")}
        </DialogTitle>
        <DialogContent>
          <SuccessSignature successes={successSignature} />

          {errorsSignature !== undefined && (
            <ErrorsSignature errors={errorsSignature} />
          )}
          {pinCode !== undefined || erreurDeCodePin() ? (
            <>
              <ProgressSignature
                onClose={onClose}
                errors={errorsSignature !== undefined}
                documentsByRequete={documentsByRequete}
                idsRequetesToSign={idRequetesToSign}
              />
            </>
          ) : (
            <FormPinCode onClose={onClose} setPinCode={setPinCode} />
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );

  function erreurDeCodePin() {
    return errorsSignature?.erreurs.find(erreur => erreur.code === "FONC_3");
  }
};
