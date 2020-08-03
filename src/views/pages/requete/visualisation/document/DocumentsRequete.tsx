import React, { useState, useEffect } from "react";
import { DocumentPresentation } from "./DocumentPresentation";
import { TypeDocument } from "../../../../../model/requete/TypeDocument";
import { IPieceJustificative, IDocumentDelivre } from "../RequeteType";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { getText } from "../../../../common/widget/Text";
import { IDocumentDetail } from "./interfaces/IDocumentDetail";
import { MimeType } from "../../../../../ressources/MimeType";

interface IDocumentsDelivres {
  courriersAccompagnement: IDocumentDetail[];
  documentsASigner: IDocumentDetail[];
}

interface IDocumentsRequeteProps {
  piecesJustificatives: IPieceJustificative[];
  documentsDelivres: IDocumentDelivre[];
  setDocumentDelivreFct?: (doc: IDocumentDelivre) => void;
}

export const DocumentsRequete: React.FC<IDocumentsRequeteProps> = ({
  piecesJustificatives,
  documentsDelivres,
  setDocumentDelivreFct
}) => {
  const [extraitVisibleState, setExtraitVisibleState] = useState<
    IDocumentDetail | undefined
  >(extraitALireParDefault(documentsDelivres));

  useEffect(() => {
    setExtraitVisibleState(extraitALireParDefault(documentsDelivres));
  }, [documentsDelivres]);

  const mockFct = (doc: IDocumentDelivre) => {}; // FIXME

  return (
    <>
      <DocumentPresentation
        titre={"pages.requete.consultation.pieceJustificative.titre"}
        documents={parsePiecesJustificatives(piecesJustificatives)}
        groupement={GroupementDocument.PieceJustificative}
        documentVisible={extraitVisibleState}
        setDocumentVisibleFct={setExtraitVisibleState}
        setDocumentDelivreFct={mockFct} // FIXME
      />
      <DocumentPresentation
        titre={"pages.requete.consultation.documentsADelivres.titre"}
        documents={parseDocumentsDelivres(documentsDelivres)}
        groupement={GroupementDocument.DocumentDelivre}
        documentVisible={extraitVisibleState}
        setDocumentVisibleFct={setExtraitVisibleState}
        setDocumentDelivreFct={setDocumentDelivreFct}
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
      mimeType: element.mimeType as MimeType.IMAGE_PNG | MimeType.APPLI_PDF,
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
): IDocumentDetail[] {
  const documentsResult: IDocumentDetail[] = [];
  documentsDelivres.forEach(element => {
    documentsResult.push(parseDocumentDelivre(element));
  });
  return documentsResult;
}

function parseDocumentDelivre(
  documentDelivre: IDocumentDelivre
): IDocumentDetail {
  return {
    identifiantDocument: documentDelivre.idDocumentDelivre,
    nom: getText(
      `pages.requete.consultation.documentDelivre.type.${documentDelivre.typeDocument}`
    ),
    mimeType: documentDelivre.mimeType as
      | MimeType.IMAGE_PNG
      | MimeType.APPLI_PDF,
    taille: documentDelivre.taille
  };
}

export function extraitALireParDefault(
  documents: IDocumentDelivre[]
): IDocumentDetail | undefined {
  if (documents.length > 0) {
    const copieIntegraleDocuments = getDocumentsByTypeDocument(
      documents,
      TypeDocument.CopieIntegrale
    );
    const extraitDocuments = [
      ...getDocumentsByTypeDocument(
        documents,
        TypeDocument.ExtraitAvecFiliation
      ),
      ...getDocumentsByTypeDocument(
        documents,
        TypeDocument.ExtraitSansFiliation
      ),
      ...getDocumentsByTypeDocument(documents, TypeDocument.ExtraitPlurilingue)
    ];
    const certificatDocuments = [
      ...getDocumentsByTypeDocument(
        documents,
        TypeDocument.CertificatSituationRC
      ),
      ...getDocumentsByTypeDocument(
        documents,
        TypeDocument.CertificatSituationRCA
      ),
      ...getDocumentsByTypeDocument(
        documents,
        TypeDocument.CertificatSituationRCetRCA
      ),
      ...getDocumentsByTypeDocument(
        documents,
        TypeDocument.CertificatSituationPACS
      )
    ];
    const attestationDocuments = getDocumentsByTypeDocument(
      documents,
      TypeDocument.AtestationPACS
    );
    const courriersAccompagnementDocuments = [
      ...getDocumentsByTypeDocument(documents, TypeDocument.FA50),
      ...getDocumentsByTypeDocument(documents, TypeDocument.FA116),
      ...getDocumentsByTypeDocument(documents, TypeDocument.FA117),
      ...getDocumentsByTypeDocument(documents, TypeDocument.FA118)
    ];
    const autresDocuments = getDocumentsByTypeDocument(
      documents,
      TypeDocument.CopieNonSignee
    );
    return parseDocumentDelivre(
      copieIntegraleDocuments[0] ||
        extraitDocuments[0] ||
        certificatDocuments[0] ||
        attestationDocuments[0] ||
        courriersAccompagnementDocuments[0] ||
        autresDocuments[0] ||
        undefined
    );
  }
  return undefined;
}

const getDocumentsByTypeDocument = (
  documents: IDocumentDelivre[],
  type: TypeDocument
): IDocumentDelivre[] => {
  return documents.filter(element => element.typeDocument === type);
};
