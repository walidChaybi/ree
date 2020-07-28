import React, { useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import Image from "@material-ui/icons/Image";
import { getText } from "../../../../common/widget/Text";
import { IDocumentDetail } from "./interfaces/IDocumentDetail";
import { lectureDuDocument, convertToBlob } from "./DocumentPresentation";
import { requestDocumentApi } from "./DocumentRequeteHook";
import "./sass/DocumentDetail.scss";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { IDocumentDelivre } from "../RequeteType";
const byteSize = require("byte-size");

interface IDocumentDetailProps {
  document: IDocumentDetail;
  groupement: GroupementDocument;
  onClickHandler: (
    event: React.MouseEvent,
    document: IDocumentDetail,
    groupement: GroupementDocument,
    stateSetter?: (document: IDocumentDetail) => void
  ) => void;
  openedInViewer?: IDocumentDetail;
  stateSetter?: (document: IDocumentDetail) => void;
  setDocumentDelivreFct: (doc: IDocumentDelivre) => void;
}

export const DocumentDetail: React.FC<IDocumentDetailProps> = ({
  document,
  groupement,
  onClickHandler,
  openedInViewer,
  stateSetter,
  setDocumentDelivreFct,
}) => {
  useEffect(() => {
    if (
      openedInViewer &&
      openedInViewer.identifiantDocument === document.identifiantDocument
    ) {
      requestDocumentApi(
        document.identifiantDocument,
        groupement,
        document.mimeType
      ).then((result) => {
        lectureDuDocument(
          URL.createObjectURL(
            convertToBlob(result.documentDelivre.contenu, result.mimeType)
          )
        );
        setDocumentDelivreFct(result.documentDelivre);
      });
    }
  }, [
    document.identifiantDocument,
    document.mimeType,
    groupement,
    openedInViewer,
    setDocumentDelivreFct,
  ]);

  return (
    <ListItem
      className="ListeDocument"
      selected={
        openedInViewer &&
        openedInViewer.identifiantDocument === document.identifiantDocument
      }
      onClick={(event) => {
        onClickHandler(event, document, groupement, stateSetter);
      }}
      title={getText("pages.requete.consultation.icon.visualiser")}
    >
      <ListItemAvatar>
        {document.mimeType === "application/pdf" ? (
          <Avatar title={getText("pages.requete.consultation.icon.pdf")}>
            <PictureAsPdf />
          </Avatar>
        ) : (
          <Avatar title={getText("pages.requete.consultation.icon.png")}>
            <Image />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        className="InformationDocument"
        primary={document.nom}
        secondary={getDetailMimeTypeEtTaille(
          document.mimeType,
          document.taille
        )}
      />
    </ListItem>
  );
};

function convertirBytesEnKiloOctet(bytes: number): number {
  return byteSize(bytes, { units: "metric_octet" });
}

function getDetailMimeTypeEtTaille(
  mimeType: "image/png" | "application/pdf" | undefined,
  taille: number
) {
  const defaultMimeType: string = mimeType ? mimeType : "application/pdf";
  return `${defaultMimeType} ${convertirBytesEnKiloOctet(taille)}`;
}
