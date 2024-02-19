import { VisionneuseActe } from "@composant/visionneuseActe/VisionneuseActe";
import { useActeRecomposerApresSignatureApiHook } from "@hook/acte/ActeRecomposerApresSignatureApiHook";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React from "react";
import { MimeType } from "../../../../../ressources/MimeType";

interface ActeRegistreProps {
  idActeAAfficher?: string;
  estSignature?: boolean;
}

const ActeRegistre: React.FC<ActeRegistreProps> = ({
  idActeAAfficher,
  estSignature
}) => {
  const resultat = useActeRecomposerApresSignatureApiHook(idActeAAfficher);
  return (
    <div className="ActeRegistre">
      {idActeAAfficher && estSignature ? (
        <VisionneuseDocument
          infoBulle={""}
          typeMime={MimeType.APPLI_PDF}
          contenuBlob={resultat}
        />
      ) : (
        <VisionneuseActe idActe={idActeAAfficher} />
      )}
    </div>
  );
};

export default ActeRegistre;
