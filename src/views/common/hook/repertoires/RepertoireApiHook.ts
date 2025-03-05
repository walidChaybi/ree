import { getInformationsFicheRepertoire } from "@api/appels/etatcivilApi";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { TFiche, mapRcRca } from "./MappingRepertoires";

export function useInformationsRepertoireApiHook(typeFiche?: TypeFiche, identifiant?: string) {
  const [informationsRepertoire, setInformationsRepertoire] = useState<TFiche | undefined>();

  useEffect(() => {
    if (identifiant != null && typeFiche != null) {
      getInformationsFicheRepertoire(typeFiche, identifiant)
        .then((result: any) => {
          let infoRepertoire: TFiche | null = null;
          switch (typeFiche) {
            case TypeFiche.RC:
            case TypeFiche.RCA:
              infoRepertoire = mapRcRca(result.body.data);
              break;
            case TypeFiche.PACS:
              infoRepertoire = FichePacs.depuisDto(result.body.data);
              break;
          }
          if (infoRepertoire === null) {
            console.error("Certaines données obligatoires de la fiche RC/RCA/PACS sont absentes ou invalides.");
          } else {
            setInformationsRepertoire(infoRepertoire);
          }
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: "Impossible de récupérer les informations du repertoire",
            error
          });
        });
    }
  }, [typeFiche, identifiant]);

  return informationsRepertoire;
}
