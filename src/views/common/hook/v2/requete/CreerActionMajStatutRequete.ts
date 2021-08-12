import { useEffect, useState } from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "./ActionHook";

export interface IActionStatutRequete {
  libelleAction: string;
  statutRequete: StatutRequete;
  requeteId?: string;
}

export function useCreerActionMajStatutRequete(
  actionStatutRequete?: IActionStatutRequete
) {
  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<CreationActionEtMiseAjourStatutParams | undefined>();

  // Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  useEffect(
    () => {
      if (
        actionStatutRequete &&
        actionStatutRequete.requeteId &&
        actionStatutRequete.libelleAction &&
        actionStatutRequete.statutRequete
      ) {
        setCreationActionEtMiseAjourStatutParams({
          requeteId: actionStatutRequete.requeteId,
          libelleAction: actionStatutRequete.libelleAction,
          statutRequete: actionStatutRequete.statutRequete
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionStatutRequete]
  );

  // Une fois les paramètres créés, mise à jour du status de la requête + création d'une action
  const idAction = usePostCreationActionEtMiseAjourStatutApi(
    creationActionEtMiseAjourStatutParams
  );

  return { idAction };
}
