import { compositionApi, ICompositionDto } from "@api/appels/compositionApi";
import { IProjetActeComposition } from "@model/composition/acte/IProjetActeComposition";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

interface ICompositionProjetActeApiHookResultat {
  documentComposer: ICompositionDto;
}

export interface ICompositionProjetActeParams {
  projetActeComposition: IProjetActeComposition;
}

export function useCompositionProjetActeApiHook(params?: ICompositionProjetActeParams): ICompositionProjetActeApiHookResultat {
  const [document, setDocument] = useState<ICompositionDto>({} as ICompositionDto);
  useEffect(() => {
    if (params) {
      compositionApi
        .getCompositionProjetActe(params.projetActeComposition)
        .then(res => {
          setDocument(res.body?.data);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Erreur lors de la génération du pdf à composer"
          });
        });
    }
  }, [params]);

  return {
    documentComposer: document
  };
}
