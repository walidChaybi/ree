import { compositionApi } from "@api/appels/compositionApi";
import { getDonneesPourCompositionActeAvantSignatureMentions } from "@api/appels/etatcivilApi";
import { useContext, useEffect, useState } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import AffichagePDF from "../../../commun/affichageDocument/AffichagePDF";
import OngletsContenu from "../../../commun/onglets/OngletsContenu";

interface IOngletActeMisAJourProps {
  estActif: boolean;
}

const OngletActeMisAJour: React.FC<IOngletActeMisAJourProps> = ({ estActif }) => {
  const { idActe, composerActeMisAJour } = useContext(EditionMiseAJourContext.Valeurs);
  const { setComposerActeMisAJour } = useContext(EditionMiseAJourContext.Actions);
  const [contenuActeMisAJour, setContenuActeMisAJour] = useState<string | null>(null);

  useEffect(() => {
    if (!composerActeMisAJour) {
      return;
    }

    getDonneesPourCompositionActeAvantSignatureMentions(idActe).then(data =>
      compositionApi.getCompositionActeTexte(data.body).then(dataComposition => {
        setContenuActeMisAJour(dataComposition.body.data.contenu ?? "");
        setComposerActeMisAJour(false);
      })
    );
  }, [composerActeMisAJour]);

  return (
    <OngletsContenu estActif={estActif}>
      <div className="flex h-[calc(100vh-16rem)] flex-col gap-1">
        <AffichagePDF
          contenuBase64={contenuActeMisAJour}
          typeZoom={90}
        />
      </div>
    </OngletsContenu>
  );
};

export default OngletActeMisAJour;
