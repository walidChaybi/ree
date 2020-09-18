import React, { useEffect, useState, useCallback } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { ValidationPopin } from "../../common/widget/ValidationPopin";
import { PopinSignature } from "./signature/PopinSignature";
import {
  DocumentsATraiter,
  DocumentsByRequete
} from "./signature/SignatureDocumentHook";
import { IDataTable } from "./MesRequetesPage";
import { StatutRequete } from "../../../model/requete/StatutRequete";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  requetes: IDataTable[];
  reloadData: (allRequestSigned: boolean) => void;
}

export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
  requetes,
  reloadData
}) => {
  const validerButtonRef = React.createRef<HTMLButtonElement>();

  const [showWaitState, setShowWaitState] = useState<boolean>(false);
  const [documentsByRequeteToSign, setDocumentsByRequeteToSign] = useState<
    DocumentsByRequete
  >({});

  useEffect(() => {
    if (validerButtonRef.current) {
      validerButtonRef.current.focus();
    }
  }, [validerButtonRef]);

  const closePopin = useCallback(
    (showPopin: boolean, changePage: boolean) => {
      setShowWaitState(showPopin);
      if (changePage === true) {
        reloadData(
          Object.keys(documentsByRequeteToSign).length === requetes.length
        );
      }
    },
    [reloadData, documentsByRequeteToSign, requetes]
  );

  const handleClickSignature = () => {
    setShowWaitState(true);

    const newDocumentsByRequeteToSign: DocumentsByRequete = {};
    requetes.forEach((requete) => {
      if (
        requete.reponse !== undefined &&
        requete.statut === StatutRequete.ASigner &&
        requete.reponse.documentsDelivres.length > 0
      ) {
        const documentsATraiter: DocumentsATraiter = {
          documentsToSign: [],
          documentsToSave: [],
          sousTypeRequete: requete.sousTypeRequete
        };

        requete.reponse.documentsDelivres.forEach((document) => {
          documentsATraiter.documentsToSign.push({
            idDocumentDelivre: document.idDocumentDelivre,
            mimeType: document.mimeType,
            infos: [{ cle: "idRequete", valeur: document.idDocumentDelivre }],
            nomDocument: document.nom,
            conteneurSwift: document.conteneurSwift,
            idRequete: requete.idRequete,
            numeroRequete: requete.idSagaDila
          });
        });

        newDocumentsByRequeteToSign[requete.idRequete] = documentsATraiter;
      }
    });

    setDocumentsByRequeteToSign(newDocumentsByRequeteToSign);
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
        documentsByRequete={documentsByRequeteToSign}
        open={showWaitState}
        onClose={closePopin}
      />
    </>
  );
};
