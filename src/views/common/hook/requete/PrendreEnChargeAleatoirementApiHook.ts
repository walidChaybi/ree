import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { getRequeteAleatoire } from "@api/appels/requeteApi";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { mappingUneRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { mappingUneRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IRequeteAleatoireResultat {
  requete: TRequeteTableau;
}

export function useGetRequeteAleatoire(type: TypeRequete, prendreEnCharge: boolean) {
  const { utilisateurs, services } = useContext(RECEContextData);
  const [requeteAleatoireResultat, setRequeteAleatoireResultat] = useState<IRequeteAleatoireResultat | undefined>();
  useEffect(() => {
    async function fetchRequeteAleatoire() {
      try {
        if (prendreEnCharge) {
          switch (type) {
            case TypeRequete.DELIVRANCE:
              const resultatDel = await getRequeteAleatoire(TypeRequete.DELIVRANCE.nom);
              const requeteResultatDelMappee = mappingUneRequeteTableauDelivrance(resultatDel.body.data, false, utilisateurs, services);
              setRequeteAleatoireResultat({
                requete: requeteResultatDelMappee
              });
              break;
            case TypeRequete.INFORMATION:
              const resultatInfo = await getRequeteAleatoire(TypeRequete.INFORMATION.nom);
              const requeteResultatInfoMappee = mappingUneRequeteTableauInformation(resultatInfo.body.data, false, utilisateurs, services);
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

export const gereErreur = (erreur: any, setRequeteAleatoireResultat: any) => {
  erreur.response?.status === HTTP_NOT_FOUND
    ? setRequeteAleatoireResultat?.({ requete: undefined })
    : AfficherMessage.erreur("Impossible de prendre en charge une requête", {
        erreurs: estTableauErreurApi(erreur) ? erreur : [],
        fermetureAuto: true
      });
};
