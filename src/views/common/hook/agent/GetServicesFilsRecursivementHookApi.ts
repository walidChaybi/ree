import { CONFIG_GET_TOUS_SERVICES_FILS } from "@api/configurations/agent/services/GetServicesFilsConfigApi";
import { IService } from "@model/agent/IService";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/FetchApiHook";

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

  const { appelApi: appelApiServicesFils } = useFetchApi(
    CONFIG_GET_TOUS_SERVICES_FILS
  );

  useEffect(() => {
    if (params?.idServiceParent) {
      appelApiServicesFils({
        parametres: {
          query: {
            idService: params.idServiceParent
          }
        },
        apresSucces: services => {
          setResultat({ servicesFils: mapServices(services) });
        },
        apresErreur: erreurs => {
          logError({
            messageUtilisateur:
              "Une erreur est survenu lors de la récupération des services",
            error: erreurs[0]
          });
        }
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
