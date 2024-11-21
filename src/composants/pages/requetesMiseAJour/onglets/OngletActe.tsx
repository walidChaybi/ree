import { compositionApi } from "@api/appels/compositionApi";
import { getDonneesPourCompositionActeTexte } from "@api/appels/etatcivilApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { useContext, useEffect, useState } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import AffichagePDF from "../../../commun/affichageDocument/AffichagePDF";
import OngletsContenu from "../../../commun/onglets/OngletsContenu";

interface IOngletActeProps {
  estActif: boolean;
}

const OngletActe: React.FC<IOngletActeProps> = ({ estActif }) => {
  const { idActe } = useContext(EditionMiseAJourContext.Valeurs);
  const [contenuActe, setContenuActe] = useState<string | null>(null);

  useEffect(() => {
    if (!idActe) {
      return;
    }

    // const { appelApi: appelApiDonneesPourComposition } = useFetchApi(
    //   CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE
    // );
    // const { appelApi: appelApicompositionActeTexte } = useFetchApi(
    //   CONFIG_POST_COMPOSITION_ACTE_TEXTE
    // );

    // appelApiDonneesPourComposition({
    //   parametres: {
    //     path: {
    //       idActe: idActe
    //     }
    //   },
    //   apresSucces: donneesComposition => {

    //     appelApicompositionActeTexte({
    //       parametres: {
    //         body: {
    //           donneesComposition: donneesComposition
    //         }
    //       },
    //       apresSucces: acteCompose => {
    //         //setContenuActe(acteCompose.contenu ?? "");
    //       },
    //       apresErreur: erreurs => {
    //         logError({
    //           messageUtilisateur:
    //             "Impossible de récupérer les données pour la composition de l'acte",
    //           error: erreurs[0]
    //         });
    //       }
    //     });
    //   },
    //   apresErreur: erreurs => {
    //     logError({
    //       messageUtilisateur: "Impossible de récupérer l'acte recomposé'",
    //       error: erreurs[0]
    //     });
    //   }
    // });

    getDonneesPourCompositionActeTexte(idActe).then(data =>
      compositionApi.getCompositionActeTexte(data.body).then(dataComposition => setContenuActe(dataComposition.body.data.contenu ?? ""))
    );
  }, [idActe]);

  return (
    <OngletsContenu estActif={estActif}>
      <AlertesActes idActeInit={idActe} />
      <AffichagePDF
        contenuBase64={contenuActe}
        typeZoom="automatic-zoom"
      />
    </OngletsContenu>
  );
};

export default OngletActe;
