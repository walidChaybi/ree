import { compositionApi } from "@api/appels/compositionApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteMisAJourConfigApi";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../ressources/EMimeType";
import AffichageDocument from "../../../commun/affichageDocument/AffichageDocument";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../../requetesDelivrance/editionRequete/ConteneurVoletEdition";

interface IPartieDroiteTraiteProps {
  idActe?: string;
}

enum ECleOngletPartieDroite {
  ACTE_RECOMPOSE = "acte_recompose"
}

const PartieDroiteTraite: React.FC<IPartieDroiteTraiteProps> = ({ idActe }) => {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [ongletActif, setOngletActif] = useState<ECleOngletPartieDroite>(ECleOngletPartieDroite.ACTE_RECOMPOSE);
  const { appelApi: getDonneesPourCompositionActeTexte } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR);

  useEffect(() => {
    getDonneesPourCompositionActeTexte({
      parametres: { path: { idActe: idActe ?? "" } },
      apresSucces: donneesComposition => {
        compositionApi.getCompositionActeTexte(donneesComposition).then(retour => {
          setPdfBase64(retour.body.data.contenu ?? "");
        });
      },
      apresErreur: messageErreur => {
        console.error(`Erreur lors de la récupération de l'acte recomposé: ${messageErreur}`);
      }
    });
  }, []);

  return (
    <div className="flex h-screen w-1/2 flex-col">
      <OngletsBouton<ECleOngletPartieDroite>
        onglets={[
          {
            cle: ECleOngletPartieDroite.ACTE_RECOMPOSE,
            libelle: "Acte recomposé"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={valeur => setOngletActif(valeur)}
      />

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletPartieDroite.ACTE_RECOMPOSE}
        estScrollable
      >
        <div className="mr-2">
          <AffichageDocument
            contenuBase64={pdfBase64}
            typeZoom={90}
            typeMime={EMimeType.APPLI_PDF}
          />
        </div>
      </ConteneurVoletEdition>
    </div>
  );
};

export default PartieDroiteTraite;
