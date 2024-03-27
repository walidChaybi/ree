import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { VisionneuseActe } from "@composant/visionneuseActe/VisionneuseActe";
import { useActeRecomposerApresSignatureApiHook } from "@hook/acte/ActeRecomposerApresSignatureApiHook";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React, { useEffect, useState } from "react";
import { MimeType } from "../../../../../ressources/MimeType";

interface ActeRegistreProps {
  idActeAAfficher?: string;
  affichageApresSignature?: boolean;
}

const ActeRegistre: React.FC<ActeRegistreProps> = ({
  idActeAAfficher,
  affichageApresSignature
}) => {
  const [
    acteRecomposerApresSignatureParams,
    setActeRecomposerApresSignatureParams
  ] = useState<string>();
  const resultat = useActeRecomposerApresSignatureApiHook(
    acteRecomposerApresSignatureParams
  );

  useEffect(() => {
    if (affichageApresSignature && idActeAAfficher) {
      setActeRecomposerApresSignatureParams(idActeAAfficher);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idActeAAfficher]);

  return (
    <div className="ActeRegistre">
      {affichageApresSignature ? (
        <VisionneuseDocument
          infoBulle="Visionneuse acte registre"
          typeMime={MimeType.APPLI_PDF}
          contenuBlob={resultat}
        />
      ) : (
        <>
          <AlertesActes idActeInit={idActeAAfficher} />
          <VisionneuseActe idActe={idActeAAfficher} />
        </>
      )}
    </div>
  );
};

export default ActeRegistre;
