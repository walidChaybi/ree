import React from "react";
import { ResumeRequete } from "./ResumeRequete";
import "./sass/ContenuRequete.scss";
import { IDataTable } from "../RequeteTableauHeaderCell";
import { DocumentsRequete } from "./document/DocumentsRequete";
import { TextField } from "@material-ui/core";
import { Text } from "../../../common/widget/Text";
import { ExtraitDocument } from "./document/ExtraitDocument";

interface ContenuRequeteProps {
  requete: IDataTable;
}

export const ContenuRequete: React.FC<ContenuRequeteProps> = props => {
  return (
    <div className="contenu-requete">
      <div className="side left">
        <ResumeRequete requete={props.requete} />
        <TextField
          disabled
          label={<Text messageId={"pages.requetes.apercu.commentaires"} />}
          className="commentaires"
          multiline
          rows="4"
          value={props.requete.reponse.commentaire}
          variant="outlined"
        />
        <DocumentsRequete
          piecesJustificatives={props.requete.piecesJustificatives}
          documentsDelivres={props.requete.reponse.documentsDelivres}
        />
      </div>
      <div className="side right">
        <ExtraitDocument
          titre="pages.requete.consultation.extrait.titre"
          highlighted={true}
        />
      </div>
    </div>
  );
};
