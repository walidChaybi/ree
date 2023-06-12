import { getReqNataliById } from "@api/appels/requeteApi";
import { mappingRequetesTableauCreation } from "@hook/requete/creation/DonneesRequeteCreationApiHook";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

type useRechercheReqNataliResultat = {
  dataRechercheReqNatali: IRequeteTableauCreation[];
};

export function useRechercheReqNataliApiHook(
  recherche?: string
): useRechercheReqNataliResultat {
  const [resultat, setResultat] = useState<IRequeteTableauCreation[]>([]);

  useEffect(() => {
    if (recherche) {
      getReqNataliById(recherche)
        .then(res => {
          if (res) {
            setResultat(mappingRequetesTableauCreation(res.body.data, false));
          }
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: `Impossible de récupérer la requête Natali associé au dossier ${recherche}`,
            error
          });
        });
    }
  }, [recherche]);

  return {
    dataRechercheReqNatali: resultat
  };
}
