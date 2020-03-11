import React from "react";
import { ResumeRequete } from "./ResumeRequete";
import "./sass/ContenuRequete.scss";
import { IDataTable } from "../RequeteTableauHeaderCell";
import { TextField } from "@material-ui/core";
import { Text } from "../../../common/widget/Text";

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
          defaultValue={props.requete.reponse.commentaire || " "}
          variant="outlined"
        />
      </div>
      <div className="side right">todo extrait</div>
    </div>
  );
};
