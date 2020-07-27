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
import {
  useUpdateDocumentApi,
  IQueryParameterUpdateDocument,
} from "./UpdateDocumentHook";

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
  const [
    updateDocumentQueryParamState,
    setUpdateDocumentQueryParamState,
  ] = React.useState<IQueryParameterUpdateDocument>();

  useEffect(() => {
    if (validerButtonRef.current) {
      validerButtonRef.current.focus();
    }
  }, [validerButtonRef]);

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
  }, [validerButtonRef]);

  const { errorState } = useUpdateDocumentApi(updateDocumentQueryParamState);

  useEffect(() => {
    if (errorState) {
      messageManager.showErrorAndClose(
        "Une erreur est survenue lors de la mise à jour du document signé"
      );
    }
  }, [errorState]);

  const handleClickSignature = () => {
    let detail = {
      function: "SIGN",
      contenu: contenuDesDocuments[0], // FIXME loop on document content
      direction: "to-webextension",
    };
    console.log(detail.contenu);
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
    console.log("result: ", result);
    if (result.direction && result.direction === "to-call-app") {
      if (result.hasTechnicalError || result.hasBusinessError) {
        messageManager.showErrorsAndClose(result.errors);
      } else {
        // window.alert(result.message);
        console.log(result.message);
        messageManager.showSuccessAndClose("Signature effectuée");

        setUpdateDocumentQueryParamState({
          nom: "",
          conteneurSwift: "",
          contenu: "",
        });
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
