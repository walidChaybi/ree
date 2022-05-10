import React, { useCallback, useState } from "react";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { IOfficier } from "../../../../model/agent/IOfficier";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../model/requete/IDocumentReponse";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import { getValeurOuVide } from "../../util/Utils";
import { BoutonOperationEnCours } from "../attente/BoutonOperationEnCours";
import { PopinSignature } from "../signature/PopinSignature";
import {
  DocumentsATraiter,
  DocumentsByRequete
} from "./hook/SignatureDocumentHook";

interface BoutonSignatureProps extends DialogDisclosureHTMLProps {
  libelle: string;
  uniqueSignature?: boolean;
  connectedUser?: IOfficier;
}

export interface TableauDataToUse {
  requetes?: IRequeteTableauDelivrance[];
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
  const [documentsByRequeteToSign, setDocumentsByRequeteToSign] =
    useState<DocumentsByRequete>({});

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
        requete.documentsReponses &&
        requete.documentsReponses.length > 0 &&
        requete.statut === StatutRequete.A_SIGNER.libelle &&
        DocumentReponse.verifierDocumentsValides(requete.documentsReponses)
      ) {
        const documentsATraiter: DocumentsATraiter = {
          documentsToSign: [],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.getEnumFromLibelleCourt(
            requete.sousType
          ),
          canal: requete.canal,
          idActe: requete.documentsReponses.find(el => el.idActe)?.idActe
        };

        requete.documentsReponses.forEach((document: IDocumentReponse) => {
          if (document.avecCtv === true) {
            documentsATraiter.documentsToSign.push({
              id: document.id,
              mimeType: document.mimeType,
              infos: [{ cle: "idRequete", valeur: document.id }],
              nomDocument: document.nom,
              conteneurSwift: document.conteneurSwift,
              idRequete: requete.idRequete,
              numeroRequete: getValeurOuVide(requete.numero)
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
      <BoutonOperationEnCours
        estDesactive={
          !signaturePossible(requetes, uniqueSignature, connectedUser)
        }
        onClick={handleClickSignature}
        checkDirtyActive={true}
      >
        {libelle}
      </BoutonOperationEnCours>

      <PopinSignature
        documentsByRequete={documentsByRequeteToSign}
        open={showWaitState}
        onClose={closePopin}
      />
    </>
  );
};

const signaturePossible = (
  requetes: IRequeteTableauDelivrance[],
  uniqueSignature = false,
  connectedUser?: IOfficier
): boolean => {
  if (uniqueSignature === true) {
    const requete = requetes[0];
    return (
      requete.statut === StatutRequete.A_SIGNER.libelle &&
      connectedUser !== undefined &&
      connectedUser.idUtilisateur === requete.idUtilisateur &&
      DocumentReponse.verifierDocumentsValides(requete.documentsReponses)
    );
  } else {
    return requetes.some(req => req.statut === StatutRequete.A_SIGNER.libelle);
  }
};
