import { getRegistrePapierParIdProjetActe } from "@api/appels/etatcivilApi";
import { IRegistre } from "@model/etatcivil/acte/IRegistre";
import { ITypeRegistre } from "@model/etatcivil/acte/TypeRegistre";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { logError } from "@util/LogManager";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IRecupererRegistrePapierParIdActeParams {
  idActe?: string;
}

export const useRecupererRegistrePapierParIdActeApiHook = (params?: IRecupererRegistrePapierParIdActeParams): IRegistre | undefined => {
  const [registre, setRegistre] = useState<IRegistre>();

  useEffect(() => {
    if (params?.idActe) {
      getRegistrePapierParIdProjetActe(params.idActe)
        .then(reponse => setRegistre(mapRegistre(reponse.body.data)))
        .catch((erreur: any) => {
          logError({
            error: erreur,
            messageUtilisateur: "Impossible de récupérer le registre papier du projet d'acte."
          });
        });
    }
  }, [params]);
  return registre;
};

const mapRegistre = (data: any): IRegistre | undefined => {
  return data
    ? {
        id: getValeurOuUndefined(data.id),
        famille: TypeFamille.getEnumFor(getValeurOuUndefined(data.famille)),
        pocopa: getValeurOuUndefined(data.pocopa),
        type: mapTypeRegistre(data.type),
        annee: getValeurOuUndefined(data.annee),
        support1: getValeurOuUndefined(data.support1),
        support2: getValeurOuUndefined(data.support2),
        numeroDernierActe: getValeurOuUndefined(data.numeroDernierActe),
        pvOuverture: getValeurOuUndefined(data.pvOuverture),
        dateOuverture: new Date(getValeurOuUndefined(data.dateOuverture)),
        pvFermeture: getValeurOuUndefined(data.pvFermeture),
        dateFermeture: data.dateFermeture ? new Date(data.dateFermeture) : undefined,
        decret2017: getValeurOuUndefined(data.decret2017)
      }
    : undefined;
};

const mapTypeRegistre = (data?: any): ITypeRegistre | undefined => {
  return data
    ? {
        id: getValeurOuUndefined(data.id),
        famille: TypeFamille.getEnumFor(getValeurOuUndefined(data.famille)),
        pocopa: getValeurOuUndefined(data.pocopa),
        paysPocopa: getValeurOuUndefined(data.paysPocopa),
        dateRattachement: getValeurOuUndefined(data.dateRattachement),
        dateTransfertScec: getValeurOuUndefined(data.dateTransfertScec),
        gereScec: getValeurOuUndefined(data.gereScec),
        estOuvert: getValeurOuUndefined(data.estOuvert)
      }
    : undefined;
};
