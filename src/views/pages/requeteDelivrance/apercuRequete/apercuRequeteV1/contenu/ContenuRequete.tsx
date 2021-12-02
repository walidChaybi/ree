import React from "react";
import { IDataTable } from "../../../../../../model/requete/IDataTable";
import { IDocumentDelivre } from "../../../../../common/types/RequeteType";
import { ErrorManagerBoundary } from "../../../../../common/util/ErrorManagerBoundary";
import { ExtraitDocument } from "../../../../../common/widget/document/ExtraitDocument";
import { DocumentsRequete } from "./document/DocumentsRequete";
import { ResumeRequete } from "./ResumeRequete";
import "./scss/ContenuRequete.scss";

interface ContenuRequeteProps {
  requete: IDataTable;
  setDocumentDelivreFct?: (doc: IDocumentDelivre) => void;
}

export const ContenuRequete: React.FC<ContenuRequeteProps> = props => {
  return (
    <div className="contenu-requete">
      <div className="side left">
        <ResumeRequete requete={props.requete} />

        <ErrorManagerBoundary>
          <DocumentsRequete
            piecesJustificatives={props.requete.piecesJustificatives}
            documentsDelivres={props.requete.reponse?.documentsDelivres || []}
            setDocumentDelivreFct={props.setDocumentDelivreFct}
          />
        </ErrorManagerBoundary>
      </div>
      <div className="side right">
        <ExtraitDocument titre="pages.requete.consultation.extrait.titre" />
      </div>
    </div>
  );
};
