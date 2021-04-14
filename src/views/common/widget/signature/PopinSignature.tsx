import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";

import { getText } from "../../../common/widget/Text";

import { ProgressSignature } from "./ProgressSignature";
import { FormPinCode } from "./FormPinCode";
import { ErrorsSignature } from "./messages/ErrorsSignature";
import "./scss/PopinSignature.scss";
import {
  useSignatureDocumentHook,
  DocumentsByRequete
} from "./hook/SignatureDocumentHook";
import { SuccessSignature } from "./messages/SuccessSignature";
import { storeRece } from "../../util/storeRece";

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

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="PopinSignature"
      >
        <DialogTitle id="alert-dialog-title">
          {getText("signature.titrePopIn")}
        </DialogTitle>
        <DialogContent>
          <SuccessSignature successes={successSignature} />

          {errorsSignature !== undefined && (
            <ErrorsSignature errors={errorsSignature} />
          )}
          {pinCode !== undefined ? (
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
};
