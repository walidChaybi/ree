import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Image from "@material-ui/icons/Image";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import React, { useEffect } from "react";
import { GroupementDocument } from "../../../../../../../model/requete/GroupementDocument";
import { MimeType } from "../../../../../../../ressources/MimeType";
import { requestDocumentApi } from "../../../../../../common/hook/DocumentRequeteHook";
import { IDocumentDetail } from "../../../../../../common/types/IDocumentDetail";
import { IDocumentDelivre } from "../../../../../../common/types/RequeteType";
import { getText } from "../../../../../../common/widget/Text";
import { convertToBlob, lectureDuDocument } from "./DocumentPresentation";
import "./scss/DocumentDetail.scss";

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
  setDocumentDelivreFct?: (doc: IDocumentDelivre) => void;
}

export const DocumentDetail: React.FC<IDocumentDetailProps> = ({
  document,
  groupement,
  onClickHandler,
  openedInViewer,
  stateSetter,
  setDocumentDelivreFct
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
      ).then(result => {
        lectureDuDocument(
          URL.createObjectURL(
            convertToBlob(result.documentDelivre.contenu, result.mimeType)
          )
        );
        if (setDocumentDelivreFct) {
          setDocumentDelivreFct(result.documentDelivre);
        }
      });
    } else {
      lectureDuDocument("");
    }
  }, [
    document.identifiantDocument,
    document.mimeType,
    groupement,
    openedInViewer,
    setDocumentDelivreFct
  ]);

  return (
    <ListItem
      className="ListeDocument"
      selected={
        openedInViewer &&
        openedInViewer.identifiantDocument === document.identifiantDocument
      }
      onClick={event => {
        onClickHandler(event, document, groupement, stateSetter);
      }}
      title={getText("pages.requete.consultation.icon.visualiser")}
    >
      <ListItemAvatar>
        {document.mimeType === MimeType.APPLI_PDF ? (
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
  mimeType: MimeType.IMAGE_PNG | MimeType.APPLI_PDF | undefined,
  taille: number
) {
  const defaultMimeType: string = mimeType ? mimeType : MimeType.APPLI_PDF;
  return `${defaultMimeType} ${convertirBytesEnKiloOctet(taille)}`;
}
