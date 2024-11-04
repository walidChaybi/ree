import { useApercuActeRecomposerAvantSignatureMentions } from "@hook/acte/mentions/ActeRecomposerAvantSignatureMentionsApiHook";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import { useEffect, useState } from "react";
import { MimeType } from "../../../../../ressources/MimeType";

type ApercuActeMisAJourProps = {
  idActeAAfficher?: string;
  doitMettreAJourApercu: boolean;
  setDoitMettreAJourApercu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ApercuActeMisAJour: React.FC<ApercuActeMisAJourProps> = ({
  idActeAAfficher,
  doitMettreAJourApercu,
  setDoitMettreAJourApercu
}) => {
  const [acteRecomposeAvantSignatureMentionsParams, setActeRecomposeAvantSignatureMentionsParams] = useState<string>();
  const documentMisAJour = useApercuActeRecomposerAvantSignatureMentions(acteRecomposeAvantSignatureMentionsParams);

  useEffect(() => {
    if (documentMisAJour) {
      setActeRecomposeAvantSignatureMentionsParams(undefined);
      setDoitMettreAJourApercu && setDoitMettreAJourApercu(false);
    }
  }, [documentMisAJour]);

  useEffect(() => {
    if (idActeAAfficher || doitMettreAJourApercu) {
      setActeRecomposeAvantSignatureMentionsParams(idActeAAfficher);
    }
  }, [idActeAAfficher, doitMettreAJourApercu]);

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
