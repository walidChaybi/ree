import { getInformationsFiche } from "@api/appels/etatcivilApi";
import { mapActe, mapRcRca } from "@hook/repertoires/MappingRepertoires";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IDataFicheApi {
  data: any;
}

export function useFichePageApiHook(
  actualisationInfosFiche: boolean,
  typeFiche?: TypeFiche,
  identifiant?: string,
  estConsultation = false
) {
  const [dataFicheState, setDataFicheState] = useState<IDataFicheApi>({} as IDataFicheApi);
  useEffect(() => {
    if (identifiant != null && typeFiche != null) {
      getInformationsFiche(typeFiche, identifiant, estConsultation)
        .then((result: any) => {
          const dataFiche = {} as IDataFicheApi;

          switch (typeFiche) {
            case TypeFiche.RC:
            case TypeFiche.RCA:
              dataFiche.data = mapRcRca(result.body.data);
              break;

            case TypeFiche.PACS:
              dataFiche.data = FichePacs.depuisDto(result.body.data);
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
            messageUtilisateur: "Impossible de récupérer les informations de la fiche",
            error
          });
        });
    }
  }, [typeFiche, identifiant, actualisationInfosFiche, estConsultation]);

  return {
    dataFicheState
  };
}
