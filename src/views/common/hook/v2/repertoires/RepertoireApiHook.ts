import { useEffect, useState } from "react";
import { getInformationsFicheRepertoire } from "../../../../../api/appels/etatcivilApi";
import { IFicheActe } from "../../../../../model/etatcivil/acte/IFicheActe";
import { TypeFiche } from "../../../../../model/etatcivil/enum/TypeFiche";
import { IFichePacs } from "../../../../../model/etatcivil/pacs/IFichePacs";
import { IFicheRcRca } from "../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { logError } from "../../../util/LogManager";
import { mapPacs, mapRcRca } from "./MappingRepertoires";

export type TFiche = IFicheRcRca | IFichePacs | IFicheActe;

export function useInformationsRepertoireApiHook(
  typeFiche?: TypeFiche,
  identifiant?: string
) {
  const [informationsRepertoire, setInformationsRepertoire] = useState<
    TFiche | undefined
  >();

  useEffect(() => {
    if (identifiant != null && typeFiche != null) {
      getInformationsFicheRepertoire(typeFiche, identifiant)
        .then((result: any) => {
          let infoRepertoire = {} as TFiche;

          switch (typeFiche) {
            case TypeFiche.RC:
            case TypeFiche.RCA:
              infoRepertoire = mapRcRca(result.body.data);
              break;

            case TypeFiche.PACS:
              infoRepertoire = mapPacs(result.body.data);
              break;

            default:
              break;
          }

          setInformationsRepertoire(infoRepertoire);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les informations du repertoire",
            error
          });
        });
    }
  }, [typeFiche, identifiant]);

  return informationsRepertoire;
}
