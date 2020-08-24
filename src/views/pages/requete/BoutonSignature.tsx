import React, { useEffect, useState } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import messageManager from "../../common/util/messageManager";
import {
  useUpdateDocumentApi,
  IQueryParameterUpdateDocument,
} from "./UpdateDocumentHook";
import { CircularProgress } from "@material-ui/core";
import { IDocumentDelivre } from "./visualisation/RequeteType";
import { ValidationPopin } from "../../common/widget/ValidationPopin";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  documentsDelivres: IDocumentDelivre[];
}
export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
  documentsDelivres,
}) => {
  const validerButtonRef = React.createRef<HTMLButtonElement>();
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

  const handleClickSignature = () => {
    const detail = {
      function: "SIGN",
      contenu: documentsDelivres[0].contenu, // FIXME loop on document content
      direction: "to-webextension",
    };
    setShowWaitState(true);
    window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
  };

  /**
   * @description Handler concernant les communications avec la webextension
   *
   * @event l'événement de retour de la webext
   */
  const handleBackFromWebExtension = (event: Event): void => {
    const customEvent = event as CustomEvent;
    const result = customEvent.detail;
    setShowWaitState(false);
    if (result.direction && result.direction === "to-call-app") {
      if (result.hasTechnicalError || result.hasBusinessError) {
        messageManager.showErrors(result.errors);
      } else {
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
      <ValidationPopin
        buttonMessageId={libelle}
        canValidate={documentsDelivres.length !== 0}
        messageId={"signature.confirmation"}
        errorMessageId={"errors.pages.requetes.B01"}
        onValid={handleClickSignature}
      />
    </>
  );
};
