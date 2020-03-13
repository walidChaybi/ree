import React from "react";
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
  return (
    <>
      <DocumentPresentation
        titre={"pages.requete.consultation.pieceJustificative.titre"}
        documents={parsePiecesJustificatives(piecesJustificatives)}
      />
      <DocumentPresentation
        titre={"pages.requete.consultation.courrierAccompagnement.titre"}
        documents={courriersAccompagnement}
      />
      <DocumentPresentation
        titre={"pages.requete.consultation.documentASigner.titre"}
        documents={documentsASigner}
        highlighted={true}
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
