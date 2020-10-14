import React, { useEffect, useState, useCallback } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { ValidationPopin } from "../ValidationPopin";
import { PopinSignature } from "../signature/PopinSignature";
import {
  DocumentsATraiter,
  DocumentsByRequete
} from "./hook/SignatureDocumentHook";
import { IDataTable } from "../../../pages/requetes/MesRequetesDelivrancePage";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { IOfficierSSOApi } from "../../../core/login/LoginHook";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  requetes: IDataTable[];
  reloadData: (allRequestSigned: boolean) => void;
  uniqueSignature?: boolean;
  connectedUser?: IOfficierSSOApi;
}

export const BoutonSignature: React.FC<BoutonSignatureProps> = ({
  libelle,
  requetes,
  reloadData,
  uniqueSignature,
  connectedUser
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
        canValidate={canValidate(requetes, uniqueSignature, connectedUser)}
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

const canValidate = (
  requetes: IDataTable[],
  uniqueSignature = false,
  connectedUser?: IOfficierSSOApi
): boolean => {
  if (uniqueSignature === true) {
    return (
      connectedUser !== undefined &&
      requetes[0].nomOec === `${connectedUser.prenom} ${connectedUser.nom}`
    );
  } else {
    return requetes.some((req) => req.statut === StatutRequete.ASigner);
  }
};
