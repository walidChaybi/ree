import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import { getText } from "../../../common/widget/Text";

import { ProgressSignature } from "./ProgressSignature";
import { FormPinCode } from "./FormPinCode";
import { ErrorsSignature } from "./ErrorsSignature";
import "./sass/PopinSignature.scss";
import {
  useSignatureDocumentHook,
  DocumentsByRequete,
} from "./SignatureDocumentHook";
import { SuccessSignature } from "./SuccessSignature";

interface PopinSignatureProps {
  documentsByRequete: DocumentsByRequete;
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

export const PopinSignature: React.FC<PopinSignatureProps> = ({
  documentsByRequete,
  open,
  onClose,
}) => {
  const [pinCode, setPinCode] = React.useState<number>();

  const {
    successSignature,
    errorsSignature,
    idRequetesToSign,
  } = useSignatureDocumentHook(documentsByRequete, pinCode);

  useEffect(() => {
    setPinCode(undefined);
  }, [documentsByRequete]);

  return (
    <div>
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

          <ErrorsSignature errors={errorsSignature} />
          {pinCode !== undefined ? (
            <>
              <ProgressSignature
                onClose={onClose}
                errors={false}
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
    </div>
  );
};
