import { compositionApi, ICompositionDto } from "@api/appels/compositionApi";
import { IProjetActeComposition } from "@model/composition/acte/IProjetActeComposition";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

interface ICompositionProjetActeApiHookResultat {
  documentCompose: ICompositionDto;
}

export interface ICompositionProjetActeParams {
  projetActeComposition: IProjetActeComposition;
}

export const useCompositionProjetActeApiHook = (params?: ICompositionProjetActeParams): ICompositionProjetActeApiHookResultat => {
  const [document, setDocument] = useState<ICompositionDto>({} as ICompositionDto);
  useEffect(() => {
    if (params) {
      compositionApi
        .getCompositionProjetActe(params.projetActeComposition)
        .then(res => {
          setDocument(res.body?.data);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Erreur lors de la génération du pdf à composer", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return {
    documentCompose: document
  };
};
