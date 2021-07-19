import React, { useEffect, useState } from "react";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import {
  getAttestationDocuments,
  getAutresDocuments,
  getCertificatDocuments,
  getcopieIntegraleDocuments,
  getCourriersAccompagnementDocuments,
  getExtraitDocuments
} from "../../../../../model/requete/TypeDocument";
import { MimeType } from "../../../../../ressources/MimeType";
import { IDocumentDetail } from "../../../../common/types/IDocumentDetail";
import {
  IDocumentDelivre,
  IPieceJustificative
} from "../../../../common/types/RequeteType";
import { getText } from "../../../../common/widget/Text";
import { DocumentPresentation } from "./DocumentPresentation";

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
      identifiantDocument: element.id,
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
  documentDelivre?: IDocumentDelivre
): IDocumentDetail {
  return documentDelivre
    ? {
        identifiantDocument: documentDelivre.idDocumentDelivre,
        nom: getText(
          `pages.requete.consultation.documentDelivre.type.${documentDelivre.typeDocument}`
        ),
        mimeType: documentDelivre.mimeType as
          | MimeType.IMAGE_PNG
          | MimeType.APPLI_PDF,
        taille: documentDelivre.taille
      }
    : {
        identifiantDocument: "inconnu",
        nom: "inconnu",
        mimeType: MimeType.IMAGE_PNG,
        taille: 0
      };
}

export function extraitALireParDefault(
  documents: IDocumentDelivre[]
): IDocumentDetail | undefined {
  let documentAlireParDefaut: IDocumentDetail | undefined;
  if (documents.length > 0) {
    const copieIntegraleDocuments = getcopieIntegraleDocuments(documents);
    const extraitDocuments = getExtraitDocuments(documents);
    const certificatDocuments = getCertificatDocuments(documents);
    const attestationDocuments = getAttestationDocuments(documents);
    const courriersAccompagnementDocuments =
      getCourriersAccompagnementDocuments(documents);
    const autresDocuments = getAutresDocuments(documents);
    documentAlireParDefaut = parseDocumentDelivre(
      copieIntegraleDocuments[0] ||
        extraitDocuments[0] ||
        certificatDocuments[0] ||
        attestationDocuments[0] ||
        courriersAccompagnementDocuments[0] ||
        autresDocuments[0] ||
        documents[0]
    );
  }
  return documentAlireParDefaut;
}
