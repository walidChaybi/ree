import { compositionApi } from "@api/appels/compositionApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteConfigApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { useContext, useEffect, useState } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../ressources/EMimeType";
import AfficherMessage from "../../../../utils/AfficherMessage";
import AffichageDocument from "../../../commun/affichageDocument/AffichageDocument";
import OngletsContenu from "../../../commun/onglets/OngletsContenu";

interface IOngletActeProps {
  estActif: boolean;
}

const OngletActe: React.FC<IOngletActeProps> = ({ estActif }) => {
  const { idActe, estActeSigne } = useContext(EditionMiseAJourContext.Valeurs);
  const [contenuActe, setContenuActe] = useState<string | null>(null);

  const { appelApi: recupererDonneesCompositionActeTexte } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE);

  useEffect(() => {
    if (!idActe || (contenuActe !== null && !estActeSigne)) return;

    recupererDonneesCompositionActeTexte({
      parametres: { path: { idActe } },
      apresSucces: donneesPourCompositionActeTexte => {
        compositionApi
          .getCompositionActeTexte(donneesPourCompositionActeTexte)
          .then(dataComposition => setContenuActe(dataComposition.body.data.contenu ?? ""));
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération de l'acte texte.", {
          erreurs
        })
    });
  }, [idActe, estActeSigne]);

  return (
    <OngletsContenu estActif={estActif}>
      <div className="flex h-[calc(100vh-16rem)] flex-col gap-1">
        <AlertesActes idActeInit={idActe} />
        <AffichageDocument
          contenuBase64={contenuActe}
          typeZoom={90}
          typeMime={EMimeType.APPLI_PDF}
        />
      </div>
    </OngletsContenu>
  );
};

export default OngletActe;
