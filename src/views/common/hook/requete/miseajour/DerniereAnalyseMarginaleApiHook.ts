import { getDerniereAnalyseMarginale } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";
import { useEffect, useState } from "react";
import { IPrenomOrdonnes } from "./../../../../../model/requete/IPrenomOrdonnes";

export interface IDerniereAnalyseMarginalResultat {
  id: string;
  dateDebut: number;
  estValide: boolean;
  titulaire: {
    nom: string;
    prenoms: IPrenomOrdonnes[];
    ordre: number;
    nomPartie1: string;
    nomPartie2: string;
  };
}

export function useDerniereAnalyseMarginaleApiHook(idActe: string | undefined) {
  const [resultat, setResultat] = useState<IDerniereAnalyseMarginalResultat>();

  useEffect(() => {
    if (idActe) {
      getDerniereAnalyseMarginale(idActe)
        .then(reponse => {
          setResultat(mappingDerniereAnalyseMarginal(reponse.body.data));
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de récuperer la dernière analyse marginale"
          });
        });
    }
  }, [idActe]);

  return resultat;
}

function mappingDerniereAnalyseMarginal(
  data: any
): IDerniereAnalyseMarginalResultat {
  return {
    id: data.id,
    dateDebut: data.dateDebut,
    estValide: data.estValide,
    titulaire: {
      nom: data.titulaires[0].nom,
      ordre: data.titulaires[0].ordre,
      prenoms: mapPrenomsVersPrenomsOrdonnes(data.titulaires[0].prenoms),
      nomPartie1: data.titulaires[0].nomPartie1 || "",
      nomPartie2: data.titulaires[0].nomPartie2 || ""
    }
  };
}
