import React from "react";
import { ResumeRequete } from "./ResumeRequete";
import "./sass/ContenuRequete.scss";
import { IDataTable } from "../MesRequetesPage";
import { DocumentsRequete } from "./document/DocumentsRequete";
import { ExtraitDocument } from "./document/ExtraitDocument";

interface ContenuRequeteProps {
  requete: IDataTable;
}

export const ContenuRequete: React.FC<ContenuRequeteProps> = props => {
  return (
    <div className="contenu-requete">
      <div className="side left">
        <ResumeRequete requete={props.requete} />
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
