import { useApercuActeRecomposerAvantSignatureMentions } from "@hook/acte/mentions/ActeRecomposerAvantSignatureMentionsApiHook";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import { useEffect, useState } from "react";
import { MimeType } from "../../../../../ressources/MimeType";

type ApercuActeMisAJourProps = {
  idActeAAfficher?: string;
};

export const ApercuActeMisAJour: React.FC<ApercuActeMisAJourProps> = ({
  idActeAAfficher
}) => {
  const [
    acteRecomposeAvantSignatureMentionsParams,
    setActeRecomposeAvantSignatureMentionsParams
  ] = useState<string>();
  const documentMisAJour = useApercuActeRecomposerAvantSignatureMentions(
    acteRecomposeAvantSignatureMentionsParams
  );

  useEffect(() => {
    if (documentMisAJour) {
      setActeRecomposeAvantSignatureMentionsParams(undefined);
    }
  }, [documentMisAJour]);

  useEffect(() => {
    if (idActeAAfficher) {
      setActeRecomposeAvantSignatureMentionsParams(idActeAAfficher);
    }
  }, [idActeAAfficher]);

  return (
    <div className="ActeRegistreMisAJour">
      {idActeAAfficher && documentMisAJour && (
        <VisionneuseDocument
          infoBulle="Visionneuse acte mis à jour"
          typeMime={MimeType.APPLI_PDF}
          contenuBlob={documentMisAJour}
        />
      )}
    </div>
  );
};
