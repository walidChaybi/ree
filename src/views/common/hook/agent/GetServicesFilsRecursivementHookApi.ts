import { getTousLesServicesFils } from "@api/appels/agentApi";
import { IService } from "@model/agent/IService";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IGetServicesFilsParams {
  idServiceParent?: string;
}

export interface IGetServicesFilsResultat {
  servicesFils: IService[];
}
export function useGetServicesFilsRecursivementHookApi(
  params?: IGetServicesFilsParams
) {
  const [resultat, setResultat] = useState<IGetServicesFilsResultat>();

  useEffect(() => {
    if (params?.idServiceParent) {
      getTousLesServicesFils(params.idServiceParent)
        .then(res => {
          setResultat({ servicesFils: mapServices(res.body.data) });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenu lors de la récupération des services",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
function mapServices(services: any): IService[] {
  return services.sort((service1: IService, service2: IService) =>
    service1.libelleService.localeCompare(service2.libelleService)
  ) as IService[];
}
