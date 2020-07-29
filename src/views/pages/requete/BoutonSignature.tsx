import React, { useEffect, useState } from "react";
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
import { CircularProgress } from "@material-ui/core";
import { IDocumentDelivre } from "./visualisation/RequeteType";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  documentsDelivres: IDocumentDelivre[];
}
export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
  documentsDelivres,
}) => {
  const dialog = useDialogState();
  let validerButtonRef = React.createRef<HTMLButtonElement>();
  const [
    updateDocumentQueryParamState,
    setUpdateDocumentQueryParamState,
  ] = React.useState<IQueryParameterUpdateDocument>();

  const [showWaitState, setShowWaitState] = useState<boolean>();

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
  });

  useUpdateDocumentApi(updateDocumentQueryParamState);
  // let { errorState }: any = useUpdateDocumentApi(updateDocumentQueryParamState);
  // useEffect(() => {
  //   if (errorState) {
  //     messageManager.showError(
  //       "Une erreur est survenue lors de la mise à jour du document signé: " +
  //         errorState.message
  //     );
  //   }
  // }, [errorState]);

  const handleClickSignature = () => {
    let detail = {
      function: "SIGN",
      contenu: documentsDelivres[0].contenu, // FIXME loop on document content
      direction: "to-webextension",
    };
    console.log(detail.contenu);
    setShowWaitState(true);
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
    setShowWaitState(false);
    if (result.direction && result.direction === "to-call-app") {
      if (result.hasTechnicalError || result.hasBusinessError) {
        messageManager.showErrors(result.errors);
      } else {
        // window.alert(result.message);
        console.log(result.contenu);
        messageManager.showSuccessAndClose("Signature effectuée");

        setUpdateDocumentQueryParamState({
          nom: documentsDelivres[0].nom,
          conteneurSwift: documentsDelivres[0].conteneurSwift,
          contenu: result.contenu,
        });
      }
    }
  };

  return (
    <>
      {showWaitState && <CircularProgress />}
      <DialogDisclosure {...dialog} as={Button}>
        {getText(libelle)}
      </DialogDisclosure>
      {documentsDelivres.length === 0 ? (
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
