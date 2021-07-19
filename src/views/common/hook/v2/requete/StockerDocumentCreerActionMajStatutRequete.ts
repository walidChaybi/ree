import { useEffect, useState } from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../model/requete/v2/IDocumentReponse";
import { usePostDocumentsReponseApi } from "../DocumentReponseHook";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "./ActionHook";

export function useStockerDocumentCreerActionMajStatutRequete(
  libelleAction: string,
  statutRequete: StatutRequete,
  documentsReponsePourStockage?: IDocumentReponse[],
  requeteId?: string
) {
  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<CreationActionEtMiseAjourStatutParams | undefined>();

  // 3- Stockage du document réponse une fois celui-ci créé
  const uuidDocumentsReponse = usePostDocumentsReponseApi(
    requeteId,
    documentsReponsePourStockage
  );

  // 4- Une fois le document stocké, création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  useEffect(
    () => {
      if (uuidDocumentsReponse) {
        setCreationActionEtMiseAjourStatutParams({
          requeteId,
          libelleAction,
          statutRequete
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uuidDocumentsReponse]
  );

  // 5- Une fois le document stocké et les paramètres créés, mise à jour du status de la requête + création d'une action
  const idAction = usePostCreationActionEtMiseAjourStatutApi(
    creationActionEtMiseAjourStatutParams
  );

  return { idAction, uuidDocumentsReponse };
}
