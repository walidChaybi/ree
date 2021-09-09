import { useEffect, useState } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import { TypeFiche } from "../../../../model/etatcivil/enum/TypeFiche";
import {
  mapActe,
  mapPacs,
  mapRcRca
} from "../../../common/hook/v2/repertoires/MappingRepertoires";
import { logError } from "../../../common/util/LogManager";

export interface IDataFicheApi {
  data: any;
}

export function useFichePageApiHook(
  typeFiche: TypeFiche,
  identifiant: string,
  indexCourant: number,
  actualisationInfosFiche: boolean
) {
  const [dataFicheState, setDataFicheState] = useState<IDataFicheApi>(
    {} as IDataFicheApi
  );
  useEffect(() => {
    if ((identifiant != null && typeFiche != null) || actualisationInfosFiche) {
      getInformationsFiche(typeFiche, identifiant)
        .then((result: any) => {
          const dataFiche = {} as IDataFicheApi;

          switch (typeFiche) {
            case TypeFiche.RC:
            case TypeFiche.RCA:
              dataFiche.data = mapRcRca(result.body.data);
              break;

            case TypeFiche.PACS:
              dataFiche.data = mapPacs(result.body.data);
              break;

            case TypeFiche.ACTE:
              dataFiche.data = mapActe(result.body.data);
              break;

            default:
              break;
          }
          setDataFicheState(dataFiche);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les informations de la fiche",
            error
          });
        });
    }
  }, [typeFiche, identifiant, indexCourant, actualisationInfosFiche]);

  return {
    dataFicheState
  };
}
