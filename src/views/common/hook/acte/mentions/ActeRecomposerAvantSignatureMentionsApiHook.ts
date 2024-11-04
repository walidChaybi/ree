import { getDonneesPourCompositionActeAvantSignatureMentions } from "@api/appels/etatcivilApi";
import { ICompositionActeTexteParams, useCompositionActeTexteApiHook } from "@hook/composition/CompositionActeTexte";
import { base64ToBlob } from "@util/FileUtils";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export function useApercuActeRecomposerAvantSignatureMentions(idActe?: string) {
  const [documentFinalResultat, setDocumentFinalResultat] = useState<Blob>();
  const [donneePourCompositionParams, setDonneesPourCompositionParams] = useState<ICompositionActeTexteParams>();

  const resultat = useCompositionActeTexteApiHook(donneePourCompositionParams);

  useEffect(() => {
    if (idActe) {
      getDonneesPourCompositionActeAvantSignatureMentions(idActe)
        .then(response => {
          setDonneesPourCompositionParams({ acteTexteJson: response.body });
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible de récupérer les données de l'acte pour composer le document mis à jour"
          });
        });
    }
  }, [idActe]);

  useEffect(() => {
    if (resultat?.donneesComposition) {
      setDocumentFinalResultat(base64ToBlob(resultat.donneesComposition.contenu));
    }
  }, [resultat]);

  return documentFinalResultat;
}
