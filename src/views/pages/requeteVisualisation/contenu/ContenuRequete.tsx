import React from "react";
import { ResumeRequete } from "./ResumeRequete";
import "./sass/ContenuRequete.scss";
import { IDataTable } from "../../requetes/MesRequetesDelivrancePage";
import { DocumentsRequete } from "../../../common/widget/document/DocumentsRequete";
import { ExtraitDocument } from "../../../common/widget/document/ExtraitDocument";
import { IDocumentDelivre } from "../../../common/types/RequeteType";

interface ContenuRequeteProps {
  requete: IDataTable;
  setDocumentDelivreFct?: (doc: IDocumentDelivre) => void;
}

export const ContenuRequete: React.FC<ContenuRequeteProps> = (props) => {
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
