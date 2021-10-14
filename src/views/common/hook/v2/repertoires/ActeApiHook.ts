import { useEffect, useState } from "react";
import { getInformationsFicheActe } from "../../../../../api/appels/etatcivilApi";
import { logError } from "../../../util/LogManager";
import { mapActe, TFiche } from "./MappingRepertoires";

export function useInformationsActeApiHook(identifiant?: string) {
  const [informationsActe, setInformationsActe] = useState<
    TFiche | undefined
  >();

  useEffect(() => {
    if (identifiant) {
      getInformationsFicheActe(identifiant)
        .then((result: any) => {
          const infoRepertoire = mapActe(result.body.data) as TFiche;
          setInformationsActe(infoRepertoire);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les informations de l'acte",
            error
          });
        });
    } else {
      setInformationsActe({} as TFiche);
    }
  }, [identifiant]);

  return informationsActe;
}
