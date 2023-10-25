import { ICompositionDto } from "@api/appels/compositionApi";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React from "react";
import { MimeType } from "../../../../../ressources/MimeType";

interface ApercuProjetProps {
  documentAAfficher?: ICompositionDto;
}

export const ApercuProjet: React.FC<ApercuProjetProps> = props => {
  return (
    <div className="ApercuProjet">
      {props.documentAAfficher && (
        <VisionneuseDocument
          infoBulle={""}
          contenuBase64={props.documentAAfficher?.contenu}
          typeMime={MimeType.APPLI_PDF}
        />
      )}
    </div>
  );
};
