import { compositionApi } from "@api/appels/compositionApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteMisAJourConfigApi";
import { useContext, useEffect, useState } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../ressources/EMimeType";
import AfficherMessage from "../../../../utils/AfficherMessage";
import AffichageDocument from "../../../commun/affichageDocument/AffichageDocument";
import OngletsContenu from "../../../commun/onglets/OngletsContenu";

interface IOngletActeMisAJourProps {
  estActif: boolean;
}

const OngletActeMisAJour: React.FC<IOngletActeMisAJourProps> = ({ estActif }) => {
  const { idActe, composerActeMisAJour } = useContext(EditionMiseAJourContext.Valeurs);
  const { setComposerActeMisAJour } = useContext(EditionMiseAJourContext.Actions);
  const [contenuActeMisAJour, setContenuActeMisAJour] = useState<string | null>(null);

  const { appelApi: recupererDonneesPourCompositionActeTexteMisAJour } = useFetchApi(
    CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR
  );

  useEffect(() => {
    if (!composerActeMisAJour) return;

    recupererDonneesPourCompositionActeTexteMisAJour({
      parametres: { path: { idActe } },
      apresSucces: donneesComposition => {
        compositionApi.getCompositionActeTexte(donneesComposition).then(retour => {
          setContenuActeMisAJour(retour.body.data.contenu ?? "");
          setComposerActeMisAJour(false);
        });
      },
      apresErreur: erreurs => AfficherMessage.erreur("Impossible de composer le document", { erreurs })
    });
  }, [composerActeMisAJour]);

  return (
    <OngletsContenu estActif={estActif}>
      <div className="flex h-[calc(100vh-16rem)] flex-col gap-1">
        <AffichageDocument
          contenuBase64={contenuActeMisAJour}
          typeZoom={90}
          typeMime={EMimeType.APPLI_PDF}
        />
      </div>
    </OngletsContenu>
  );
};

export default OngletActeMisAJour;
