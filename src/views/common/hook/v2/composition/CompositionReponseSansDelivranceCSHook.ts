import { useEffect, useState } from "react";
import { compositionApi } from "../../../../../api/appels/compositionApi";
import { IDonneesComposition } from "../../../../../model/composition/commun/retourApiComposition/IDonneesComposition";
import { IContenuReponseSansDelivranceCS } from "../../../../../model/composition/IReponseSansDelivranceCS";
import { logError } from "../../../util/LogManager";
import { getLibelle } from "../../../widget/Text";

export function useCompositionReponseSansDelivranceCSApi(
  document?: string,
  reponseSansDelivranceCS?: IContenuReponseSansDelivranceCS
) {
  const [
    donneesComposition,
    setDonneesComposition
  ] = useState<IDonneesComposition>();

  useEffect(() => {
    if (reponseSansDelivranceCS && document) {
      compositionApi
        .getCompositionReponseSansDelivranceCS(
          document,
          reponseSansDelivranceCS
        )
        .then(result => {
          setDonneesComposition(result.body.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle(
              "Impossible de créer le document pour la réponse négative"
            )
          });
        });
    }
  }, [reponseSansDelivranceCS, document]);

  return donneesComposition;
}
