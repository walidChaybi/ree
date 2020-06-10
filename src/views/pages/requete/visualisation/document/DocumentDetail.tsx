import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import Image from "@material-ui/icons/Image";
import { getText } from "../../../../common/widget/Text";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { IDocumentDetail } from "./interfaces/IDocumentDetail";
const byteSize = require("byte-size");

interface IDocumentDetailProps {
  document: IDocumentDetail;
  onClickHandler: (
    event: React.MouseEvent,
    identifiantDocument: string,
    groupement: GroupementDocument,
    mimeType: string
  ) => void;
}

export const DocumentDetail: React.FC<IDocumentDetailProps> = ({
  document,
  onClickHandler
}) => {
  return (
    <ListItem>
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
      <ListItemSecondaryAction>
        <IconButton
          title={getText("pages.requete.consultation.icon.visualiser")}
          edge="end"
          aria-label="consulter"
          onClick={event => {
            onClickHandler(
              event,
              document.identifiantDocument,
              document.groupement,
              document.mimeType
            );
          }}
        >
          <VisibilityIcon />
        </IconButton>
      </ListItemSecondaryAction>
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
