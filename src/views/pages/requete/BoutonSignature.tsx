import React from "react";
import { getText } from "../../common/widget/Text";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

interface BoutonSignatureProps {}
export const BoutonSignature: React.FC<BoutonSignatureProps> = () => {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog}>
        {getText("pages.requetes.action.signature")}
      </DialogDisclosure>
      <Dialog {...dialog} aria-label="Welcome" className="Toast">
        {getText("errors.pages.requetes.B01")}
      </Dialog>
    </>
  );
};
