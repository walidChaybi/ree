import React, { useState, useEffect } from "react";
import { DocumentPresentation } from "./DocumentPresentation";
import { TypeDocument } from "../../../../../model/requete/TypeDocument";
import { IPieceJustificative, IDocumentDelivre } from "../RequeteType";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { getText } from "../../../../common/widget/Text";
import { IDocumentDetail } from "./interfaces/IDocumentDetail";

interface IDocumentsDelivres {
  courriersAccompagnement: IDocumentDetail[];
  documentsASigner: IDocumentDetail[];
}

interface IDocumentsRequeteProps {
  piecesJustificatives: IPieceJustificative[];
  documentsDelivres: IDocumentDelivre[];
}

export const DocumentsRequete: React.FC<IDocumentsRequeteProps> = ({
  piecesJustificatives,
  documentsDelivres
}) => {
  const { courriersAccompagnement, documentsASigner } = parseDocumentsDelivres(
    documentsDelivres
  );
  const [extraitVisibleState, setExtraitVisibleState] = useState<
    IDocumentDetail
  >(extraitALireParDefault(documentsASigner));

  useEffect(() => {
    const { documentsASigner } = parseDocumentsDelivres(documentsDelivres);
    setExtraitVisibleState(extraitALireParDefault(documentsASigner));
  }, [documentsDelivres]);

  return (
    <>
      <DocumentPresentation
        titre={"pages.requete.consultation.pieceJustificative.titre"}
        documents={parsePiecesJustificatives(piecesJustificatives)}
        documentVisible={extraitVisibleState}
        setDocumentVisibleFct={setExtraitVisibleState}
      />
      <DocumentPresentation
        titre={"pages.requete.consultation.documentsADelivres.titre"}
        documents={[...courriersAccompagnement, ...documentsASigner]}
        documentVisible={extraitVisibleState}
        setDocumentVisibleFct={setExtraitVisibleState}
      />
    </>
  );
};

function parsePiecesJustificatives(
  piecesJustificatives: IPieceJustificative[]
): IDocumentDetail[] {
  const documentsDetails: IDocumentDetail[] = [];
  piecesJustificatives.forEach((element, index) => {
    documentsDetails.push({
      identifiantDocument: element.idPieceJustificative,
      groupement: GroupementDocument.PieceJustificative,
      mimeType: element.mimeType as "image/png" | "application/pdf",
      nom: getText("pages.requete.consultation.pieceJustificative.nomFichier", [
        `${index}`
      ]),
      taille: element.taille
    });
  });
  return documentsDetails;
}

function parseDocumentsDelivres(
  documentsDelivres: IDocumentDelivre[]
): IDocumentsDelivres {
  const courriersAccompagnement: IDocumentDetail[] = [];
  const documentsASigner: IDocumentDetail[] = [];
  documentsDelivres.forEach(element => {
    if (
      element.typeDocument === TypeDocument.FA116 ||
      element.typeDocument === TypeDocument.FA50
    ) {
      courriersAccompagnement.push(
        parseDocumentDelivre(element, GroupementDocument.CourrierAccompagnement)
      );
    } else {
      documentsASigner.push(
        parseDocumentDelivre(element, GroupementDocument.DocumentAsigner)
      );
    }
  });
  return { courriersAccompagnement, documentsASigner };
}

function parseDocumentDelivre(
  documentDelivre: IDocumentDelivre,
  groupement: GroupementDocument
): IDocumentDetail {
  return {
    identifiantDocument: documentDelivre.idDocumentDelivre,
    groupement,
    nom: getText(
      `pages.requete.consultation.documentDelivre.type.${documentDelivre.typeDocument}`
    ),
    mimeType: documentDelivre.mimeType as "image/png" | "application/pdf",
    taille: documentDelivre.taille
  };
}

function extraitALireParDefault(documents: IDocumentDetail[]): IDocumentDetail {
  const copieIntegralePresente = isCopieIntegralePresente(documents);
  const documentsALire = documents.filter((element, index) => {
    if (documents.length === 1) {
      return true;
    } else if (
      copieIntegralePresente &&
      element.nom ===
        getText(
          "pages.requete.consultation.documentDelivre.type.COPIE_INTEGRALE"
        )
    ) {
      return true;
    } else if (!copieIntegralePresente && index === 0) {
      return true;
    }
    return false;
  });
  return documentsALire[0];
}

function isCopieIntegralePresente(documents: IDocumentDetail[]): boolean {
  return (
    documents.filter(
      element =>
        element.nom ===
        getText(
          "pages.requete.consultation.documentDelivre.type.COPIE_INTEGRALE"
        )
    ).length > 0
  );
}
