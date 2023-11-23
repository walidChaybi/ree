import { postValiderProjetActe } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IValiderProjetActeParams {
  idRequete: string;
  idSuiviDossier: string;
}

interface IValiderProjetActeResultat {
  projetEstValide: boolean;
}

export function useValiderProjetActeApiHook(
  params?: IValiderProjetActeParams
): IValiderProjetActeResultat {
  const [projetEstValide, setProjetEstValide] = useState<boolean>(false);
  useEffect(() => {
    if (params?.idSuiviDossier) {
      postValiderProjetActe(params.idRequete, params.idSuiviDossier)
        .then((res: any) => {
          if (res) {
            setProjetEstValide(true);
          }
        })
        .catch((error: any) => {
          logError({
            error,
            messageUtilisateur:
              "Impossible de valider le projet d'acte, veuillez réessayer"
          });
        });
    }
  }, [params]);

  return {
    projetEstValide
  };
}
