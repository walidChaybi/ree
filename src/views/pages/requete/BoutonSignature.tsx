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
import messageManager from "../../common/util/messageManager";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  contenuDesDocuments: string[];
}
export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
  contenuDesDocuments,
}) => {
  const dialog = useDialogState();
  const isError = false;
  let validerButtonRef = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    if (validerButtonRef.current) {
      validerButtonRef.current.focus();
    }
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
  }, [validerButtonRef]);

  const handleClickSignature = () => {
    let detail = {
      function: "SIGN",
      img: contenuDesDocuments[0], // FIXME loop on document content
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
    const result = customEvent.detail;
    if (result.direction && result.direction === "to-call-app") {
      if (result.hasTechnicalError || result.hasBusinessError) {
        messageManager.showErrorsAndClose(result.errors);
      } else {
        // window.alert(result.message);
        messageManager.showSuccessAndClose("Signature effectuée");
      }
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
          <Button ref={validerButtonRef} onClick={handleClickSignature}>
            Valider
          </Button>
          <Button onClick={() => dialog.hide()}>Annuler</Button>
        </Dialog>
      )}
    </>
  );
};
