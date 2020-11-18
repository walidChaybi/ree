import React from "react";
import { ResumeRequete } from "./ResumeRequete";
import "./sass/ContenuRequete.scss";
import { IDataTable } from "../../espaceDelivrance/MesRequetesPage";
import { ExtraitDocument } from "../../../common/widget/document/ExtraitDocument";
import { IDocumentDelivre } from "../../../common/types/RequeteType";
import { DocumentsRequete } from "./document/DocumentsRequete";

interface ContenuRequeteProps {
  requete: IDataTable;
  setDocumentDelivreFct?: (doc: IDocumentDelivre) => void;
}

export const ContenuRequete: React.FC<ContenuRequeteProps> = props => {
  return (
    <div className="contenu-requete">
      <div className="side left">
        <ResumeRequete requete={props.requete} />
        <DocumentsRequete
          piecesJustificatives={props.requete.piecesJustificatives}
          documentsDelivres={props.requete.reponse?.documentsDelivres || []}
          setDocumentDelivreFct={props.setDocumentDelivreFct}
        />
      </div>
      <div className="side right">
        <ExtraitDocument titre="pages.requete.consultation.extrait.titre" />
      </div>
    </div>
  );
};
