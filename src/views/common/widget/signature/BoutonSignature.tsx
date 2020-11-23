import React, { useState, useCallback } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { PopinSignature } from "../signature/PopinSignature";
import {
  DocumentsATraiter,
  DocumentsByRequete
} from "./hook/SignatureDocumentHook";
import { IDataTable } from "../../../pages/espaceDelivrance/MesRequetesPage";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { IOfficierSSOApi } from "../../../core/login/LoginHook";
import { getText } from "../Text";
import { Button } from "reakit/Button";

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
  const [showWaitState, setShowWaitState] = useState<boolean>(false);
  const [documentsByRequeteToSign, setDocumentsByRequeteToSign] = useState<
    DocumentsByRequete
  >({});

  const closePopin = useCallback(
    (showPopin: boolean) => {
      if (showWaitState) {
        reloadData(
          Object.keys(documentsByRequeteToSign).length === requetes.length
        );
      }
      setShowWaitState(showPopin);
    },
    [reloadData, documentsByRequeteToSign, requetes, showWaitState]
  );

  const handleClickSignature = () => {
    setShowWaitState(true);
    const newDocumentsByRequeteToSign: DocumentsByRequete = {};
    requetes.forEach(requete => {
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

        requete.reponse.documentsDelivres.forEach(document => {
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
      <Button
        disabled={!signaturePossible(requetes, uniqueSignature, connectedUser)}
        onClick={handleClickSignature}
      >
        {getText(libelle)}
      </Button>

      <PopinSignature
        documentsByRequete={documentsByRequeteToSign}
        open={showWaitState}
        onClose={closePopin}
      />
    </>
  );
};

const signaturePossible = (
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
    return requetes.some(req => req.statut === StatutRequete.ASigner);
  }
};
