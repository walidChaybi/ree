import { getRegistrePapierParIdProjetActe } from "@api/appels/etatcivilApi";
import { IRegistreDto, Registre } from "@model/etatcivil/acte/Registre";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IRecupererRegistrePapierParIdActeParams {
  idActe?: string;
}

export const useRecupererRegistrePapierParIdActeApiHook = (params?: IRecupererRegistrePapierParIdActeParams): Registre | null => {
  const [registre, setRegistre] = useState<Registre | null>(null);

  useEffect(() => {
    if (params?.idActe) {
      getRegistrePapierParIdProjetActe(params.idActe)
        .then(reponse => setRegistre(Registre.depuisDto(reponse.body.data as IRegistreDto)))
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer le registre papier du projet d'acte.", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);
  return registre;
};
