import React, { useState, useCallback } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { PopinSignature } from "../signature/PopinSignature";
import {
  DocumentsATraiter,
  DocumentsByRequete
} from "./hook/SignatureDocumentHook";
import { IDataTable } from "../../../../model/requete/IDataTable";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { getText } from "../Text";
import { Button } from "reakit/Button";
import { IOfficierSSOApi } from "../../../../model/IOfficierSSOApi";
import { normaliserNomOec } from "../../util/Utils";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  uniqueSignature?: boolean;
  connectedUser?: IOfficierSSOApi;
}

export interface TableauDataToUse {
  requetes?: IDataTable[];
  reloadData?: (allRequestSigned: boolean) => void;
}

export const BoutonSignature: React.FC<
  BoutonSignatureProps & TableauDataToUse
> = ({
  libelle,
  requetes = [],
  reloadData,
  uniqueSignature,
  connectedUser
}) => {
  const [showWaitState, setShowWaitState] = useState<boolean>(false);
  const [
    documentsByRequeteToSign,
    setDocumentsByRequeteToSign
  ] = useState<DocumentsByRequete>({});
  const closePopin = useCallback(
    (showPopin: boolean, canReload: boolean) => {
      if (showWaitState && showPopin === false) {
        setShowWaitState(showPopin);
        if (reloadData && (canReload === true || uniqueSignature !== true)) {
          reloadData(
            Object.keys(documentsByRequeteToSign).length === requetes.length
          );
        }
      }
    },
    [
      reloadData,
      documentsByRequeteToSign,
      requetes,
      showWaitState,
      uniqueSignature
    ]
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

        requete.reponse.documentsDelivres.forEach((document: any) => {
          if (document.avecCtv === true) {
            documentsATraiter.documentsToSign.push({
              idDocumentDelivre: document.idDocumentDelivre,
              mimeType: document.mimeType,
              infos: [{ cle: "idRequete", valeur: document.idDocumentDelivre }],
              nomDocument: document.nom,
              conteneurSwift: document.conteneurSwift,
              idRequete: requete.idRequete,
              numeroRequete: requete.idSagaDila
            });
          }
        });
        if (documentsATraiter.documentsToSign.length > 0) {
          newDocumentsByRequeteToSign[requete.idRequete] = documentsATraiter;
        }
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
      normaliserNomOec(requetes[0].nomOec) ===
        normaliserNomOec(`${connectedUser.prenom} ${connectedUser.nom}`)
    );
  } else {
    return requetes.some(req => req.statut === StatutRequete.ASigner);
  }
};
