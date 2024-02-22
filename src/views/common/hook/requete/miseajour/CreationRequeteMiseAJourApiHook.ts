import { postRequeteMiseAJour } from "@api/appels/requeteApi";
import { SousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import { ITitulaireRequeteMiseAJour } from "@model/requete/ITitulaireRequeteMiseAJour";
import {
  ID,
  ID_ACTE,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE_ID,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ICreationRequeteMiseAJourApiHookParams {
  sousType: string;
  idActeMAJ: string;
  titulaires: ITitulaireRequeteMiseAJour[];
}

export function useCreationRequeteMiseAJourApiHook(
  params?: ICreationRequeteMiseAJourApiHookParams
) {
  const [resultatIdRequete, setResultatIdRequete] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    function fetchData() {
      if (params) {
        postRequeteMiseAJour(params)
          .then(response => {
            setResultatIdRequete(response.body.data.id);
          })
          .catch(error => {
            logError({
              error,
              messageUtilisateur:
                "Impossible de d'accéder à la requete de mise a jour de l'acte"
            });
          });
      }
    }
    fetchData();
  }, [params, navigate]);

  useEffect(() => {
    if (params && resultatIdRequete) {
      navigate(
        getNavigationFromTypeMiseAJour(
          params.sousType,
          resultatIdRequete,
          params.idActeMAJ
        )
      );
    }
  }, [resultatIdRequete, params, navigate]);

  return resultatIdRequete;
}

function getNavigationFromTypeMiseAJour(
  value: string,
  idRequete: string,
  idActe: string
) {
  let baseUrl: string;
  if (SousTypeMiseAJour.estRMAC(SousTypeMiseAJour.getEnumFor(value))) {
    baseUrl = URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID;
  } else {
    baseUrl = URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE_ID;
  }
  return baseUrl.replace(ID, idRequete).replace(ID_ACTE, idActe);
}
