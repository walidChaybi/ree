import React, { useEffect, useState } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { ValidationPopin } from "../../common/widget/ValidationPopin";
import { PopinSignature, DocumentToSign } from "./signature/PopinSignature";
import { IDataTable } from "./MesRequetesPage";
import { StatutRequete } from "../../../model/requete/StatutRequete";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  requetes: IDataTable[];
}

export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
  requetes,
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
    requetes.forEach((requete) => {
      if (
        requete.reponse !== undefined &&
        requete.statut === StatutRequete.ASigner
      ) {
        requete.reponse.documentsDelivres.forEach((document) => {
          documentToSign.push({
            idDocumentDelivre: document.idDocumentDelivre,
            mimeType: document.mimeType,
            infos: [{ idRequete: document.idDocumentDelivre }],
            nomDocument: document.nom,
            conteneurSwift: document.conteneurSwift,
            idRequete: requete.idRequete,
          });
        });
      }
    });

    setDocumentsToSign(documentToSign);
  };

  return (
    <>
      <ValidationPopin
        buttonMessageId={libelle}
        canValidate={requetes.length !== 0}
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
