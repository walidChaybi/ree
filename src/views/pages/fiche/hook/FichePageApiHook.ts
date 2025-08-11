import { getInformationsFiche } from "@api/appels/etatcivilApi";
import { mapActe, mapRcRca } from "@hook/repertoires/MappingRepertoires";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

interface IDataFicheApi {
  data: any;
}

export function useFichePageApiHook(actualisationInfosFiche: boolean, typeFiche?: ETypeFiche, identifiant?: string) {
  const [dataFicheState, setDataFicheState] = useState<IDataFicheApi>({} as IDataFicheApi);
  useEffect(() => {
    if (identifiant != null && typeFiche != null) {
      getInformationsFiche(typeFiche, identifiant)
        .then((result: any) => {
          const dataFiche = {} as IDataFicheApi;

          switch (typeFiche) {
            case ETypeFiche.RC:
            case ETypeFiche.RCA:
              dataFiche.data = mapRcRca(result.body.data);
              break;

            case ETypeFiche.PACS:
              dataFiche.data = FichePacs.depuisDto(result.body.data);
              break;

            case ETypeFiche.ACTE:
              dataFiche.data = mapActe(result.body.data);
              break;

            default:
              break;
          }
          setDataFicheState(dataFiche);
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer les informations de la fiche", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [typeFiche, identifiant, actualisationInfosFiche]);

  return {
    dataFicheState
  };
}
