import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { getRequeteAleatoire } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { mappingUneRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { mappingUneRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { logError } from "@util/LogManager";
import { useContext, useEffect, useState } from "react";

export interface IRequeteAleatoireResultat {
  requete: TRequeteTableau;
}

export function useGetRequeteAleatoire(
  type: TypeRequete,
  prendreEnCharge: boolean
) {
  const { utilisateurs, services } = useContext(RECEContextData);
  const [requeteAleatoireResultat, setRequeteAleatoireResultat] = useState<
    IRequeteAleatoireResultat | undefined
  >();
  useEffect(() => {
    async function fetchRequeteAleatoire() {
      try {
        if (prendreEnCharge) {
          switch (type) {
            case TypeRequete.DELIVRANCE:
              const resultatDel = await getRequeteAleatoire(
                TypeRequete.DELIVRANCE.nom
              );
              const requeteResultatDelMappee =
                mappingUneRequeteTableauDelivrance(
                  resultatDel.body.data,
                  false,
                  utilisateurs,
                  services
                );
              setRequeteAleatoireResultat({
                requete: requeteResultatDelMappee
              });
              break;
            case TypeRequete.INFORMATION:
              const resultatInfo = await getRequeteAleatoire(
                TypeRequete.INFORMATION.nom
              );
              const requeteResultatInfoMappee =
                mappingUneRequeteTableauInformation(
                  resultatInfo.body.data,
                  false,
                  utilisateurs,
                  services
                );
              setRequeteAleatoireResultat({
                requete: requeteResultatInfoMappee
              });
              break;
          }
        }
      } catch (error) {
        gereErreur(error, setRequeteAleatoireResultat);
      }
    }

    fetchRequeteAleatoire();
  }, [type, prendreEnCharge]);

  return requeteAleatoireResultat;
}

export function gereErreur(error: any, setRequeteAleatoireResultat: any) {
  if (error.response && error.response.status === HTTP_NOT_FOUND) {
    setRequeteAleatoireResultat({ requete: undefined });
  } else {
    logError({
      messageUtilisateur:
        "Impossible de prendre en charge aléatoirement une requête",
      error
    });
  }
}
