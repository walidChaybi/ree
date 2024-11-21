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
      <AffichagePDF
        contenuBase64={contenuActeMisAJour}
        typeZoom="automatic-zoom"
      />
    </OngletsContenu>
  );
};

export default OngletActeMisAJour;
