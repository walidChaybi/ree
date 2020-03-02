import React from "react";
import { getText } from "../../common/widget/Text";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogDisclosureHTMLProps
} from "reakit/Dialog";
import { Button } from "reakit/Button";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {}
export const BoutonSignature: React.FC<BoutonSignatureProps> = () => {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog} as={Button}>
        {getText("pages.requetes.action.signature")}
      </DialogDisclosure>
      <Dialog
        {...dialog}
        tabIndex={0}
        aria-label="Welcome"
        className="toast error"
      >
        {getText("errors.pages.requetes.B01")}
      </Dialog>
    </>
  );
};
