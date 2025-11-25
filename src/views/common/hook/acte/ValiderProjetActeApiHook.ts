import { postValiderProjetActe } from "@api/appels/requeteApi";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

interface IValiderProjetActeParams {
  idRequete: string;
  idSuiviDossier: string;
}

interface IValiderProjetActeResultat {
  projetEstValide: boolean;
}

export const useValiderProjetActeApiHook = (params?: IValiderProjetActeParams): IValiderProjetActeResultat => {
  const [projetEstValide, setProjetEstValide] = useState<boolean>(false);
  useEffect(() => {
    if (params?.idSuiviDossier) {
      postValiderProjetActe(params.idRequete, params.idSuiviDossier)
        .then((res: any) => {
          if (res) {
            setProjetEstValide(true);
          }
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de valider le projet d'acte, veuillez réessayer", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return {
    projetEstValide
  };
};
