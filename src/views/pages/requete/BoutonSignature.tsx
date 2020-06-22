import React from "react";
import { getText, Text } from "../../common/widget/Text";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogDisclosureHTMLProps,
} from "reakit/Dialog";
import { Button } from "reakit/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
}
export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
}) => {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog} as={Button}>
        {getText(libelle)}
      </DialogDisclosure>
      <Dialog
        {...dialog}
        tabIndex={0}
        aria-label={getText("errors.dialogLabel")}
        className="toast error"
      >
        <FontAwesomeIcon
          icon={faTimesCircle}
          title={getText("errors.icon")}
          aria-label={getText("errors.icon")}
        />
        <Text messageId={"errors.pages.requetes.B01"} />
      </Dialog>
    </>
  );
};
