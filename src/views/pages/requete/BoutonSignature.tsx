import React, { useEffect, useState } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { IDocumentDelivre } from "./visualisation/RequeteType";
import { ValidationPopin } from "../../common/widget/ValidationPopin";
import { PopinSignature, DocumentToSign } from "./PopinSignature";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  documentsDelivres: IDocumentDelivre[];
}

export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
  documentsDelivres,
}) => {
  const validerButtonRef = React.createRef<HTMLButtonElement>();

  const [showWaitState, setShowWaitState] = useState<boolean>(false);
  const [documentsToSign, setDocumentsToSign] = useState<DocumentToSign[]>([]);

  useEffect(() => {
    if (validerButtonRef.current) {
      validerButtonRef.current.focus();
    }
  }, [validerButtonRef]);

  const handleClickSignature = () => {
    setShowWaitState(true);

    const documentToSign: DocumentToSign[] = [];
    documentsDelivres.forEach((document) => {
      documentToSign.push({
        idDocumentDelivre: document.idDocumentDelivre,
        mimeType: document.mimeType,
        infos: document.idDocumentDelivre,
        nomDocument: document.nom,
        conteneurSwift: document.conteneurSwift,
      });
    });

    setDocumentsToSign(documentToSign);
  };

  return (
    <>
      <ValidationPopin
        buttonMessageId={libelle}
        canValidate={documentsDelivres.length !== 0}
        messageId={"signature.confirmation"}
        errorMessageId={"errors.pages.requetes.B01"}
        onValid={handleClickSignature}
      />

      <PopinSignature
        documentsToSign={documentsToSign}
        open={showWaitState}
        onClose={setShowWaitState}
      />
    </>
  );
};
