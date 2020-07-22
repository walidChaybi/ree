import React, { useEffect } from "react";
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
  const isError = false;

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
  }, []);

  const handleClickSignature = () => {
    let detail = {
      function: "SIGN",
      img: "image base64",
      direction: "to-webextension",
    };
    window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
    dialog.hide();
  };

  /**
   * @description Handler concernant les communications avec la webextension
   *
   * @event l'événement de retour de la webext
   */
  const handleBackFromWebExtension = (event: Event): void => {
    const customEvent = event as CustomEvent;
    if (
      customEvent.detail.direction &&
      customEvent.detail.direction === "to-call-app"
    ) {
      window.alert(customEvent.detail.message);
    }
  };

  return (
    <>
      <DialogDisclosure {...dialog} as={Button}>
        {getText(libelle)}
      </DialogDisclosure>
      {isError ? (
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
      ) : (
        <Dialog
          {...dialog}
          tabIndex={0}
          aria-label={getText("errors.dialogLabel")}
          className="toast"
        >
          <Text messageId="signature.confirmation" />
          <Button onClick={handleClickSignature}>OK</Button>
        </Dialog>
      )}
    </>
  );
};
