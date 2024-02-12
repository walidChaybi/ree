import { useActeRecomposerApresSignatureApiHook } from "@hook/acte/ActeRecomposerApresSignatureApiHook";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React from "react";
import { MimeType } from "../../../../../ressources/MimeType";

interface ActeRegistreProps {
  idActeAAfficher?: string;
}

const ActeRegistre: React.FC<ActeRegistreProps> = ({ idActeAAfficher }) => {
  const resultat = useActeRecomposerApresSignatureApiHook(idActeAAfficher);
  return (
    <div className="ActeRegistre">
      {idActeAAfficher && (
        <VisionneuseDocument
          infoBulle={""}
          typeMime={MimeType.APPLI_PDF}
          contenuBlob={resultat}
        />
      )}
    </div>
  );
};

export default ActeRegistre;
