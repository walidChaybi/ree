/* v8 ignore start */
import { CONFIG_GET_TOUS_SERVICES } from "@api/configurations/agent/services/GetServicesConfigApi";
import { CONFIG_GET_TOUS_UTILISATEURS } from "@api/configurations/agent/utilisateur/GetUtilisateursConfigApi";
import { CONFIG_GET_DECRETS } from "@api/configurations/decret/GetDecretsConfigApi";
import { IService, Service } from "@model/agent/IService";
import { IUtilisateur, Utilisateur } from "@model/agent/IUtilisateur";
import { THeader } from "@model/api/Api";
import { Decret, IDecret } from "@model/etatcivil/commun/IDecret";
import { logError } from "@util/LogManager";
import { UN, ZERO } from "@util/Utils";
import { useEffect, useState } from "react";
import IServiceDto, { ServiceDto } from "../dto/etatcivil/agent/IServiceDto";
import IUtilisateurDto, {
  UtilisateurDto
} from "../dto/etatcivil/agent/IUtilisateurDto";
import useFetchApi from "./FetchApiHook";

const PLAGE_IMPORT = 100;

const ajouterUtilisateurs = (
  utilisateurDtos: IUtilisateurDto[],
  utilisateurs: IUtilisateur[]
): IUtilisateur[] => [
  ...utilisateurs,
  ...utilisateurDtos
    .filter(
      (utilisateurDto: IUtilisateurDto) =>
        !UtilisateurDto.estDejaPresent(utilisateurDto, utilisateurs)
    )
    .map((utilisateurDto: IUtilisateurDto) =>
      Utilisateur.depuiDto(utilisateurDto)
    )
];

const ajouterServices = (
  serviceDtos: IServiceDto[],
  services: IService[]
): IService[] => [
  ...services,
  ...serviceDtos
    .filter(
      (serviceDto: IServiceDto) =>
        !ServiceDto.estDejaPresent(serviceDto, services)
    )
    .map((serviceDto: IServiceDto) => Service.depuisDto(serviceDto))
];

const aPageSuivante = (headers: THeader) =>
  (headers?.link.indexOf(`rel="next"`) ?? ZERO) >= ZERO;

const gereErreur = (error: any, message: string) => {
  logError({
    messageUtilisateur: message,
    error
  });
};

const useChargerDonneesContexte = (estUtilisateurConnecte: boolean) => {
  const [utilisateurs, setUtilisateurs] = useState<IUtilisateur[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [decrets, setDecrets] = useState<IDecret[]>([]);

  const { appelApi: appelApiUtilisateurs } = useFetchApi(
    CONFIG_GET_TOUS_UTILISATEURS
  );

  const { appelApi: appelApiServices } = useFetchApi(CONFIG_GET_TOUS_SERVICES);

  const { appelApi: appelApiDecrets } = useFetchApi(CONFIG_GET_DECRETS);

  const chargerTousLesUtilisateurs = (page: number) => {
    appelApiUtilisateurs({
      parametres: {
        query: {
          lite: false,
          range: `${page}-${PLAGE_IMPORT}`
        }
      },
      apresSucces: (utilisateurDtos, headers) => {
        setUtilisateurs(utilisateursPrecedents =>
          ajouterUtilisateurs(utilisateurDtos, utilisateursPrecedents)
        );

        if (aPageSuivante(headers)) {
          chargerTousLesUtilisateurs(page + UN);
        }
      },
      apresErreur: erreurs => {
        gereErreur(erreurs[ZERO], "Impossible de récupérer les utilisateurs");
      }
    });
  };

  const chargerTousLesServices = (page: number) => {
    appelApiServices({
      parametres: {
        query: {
          range: `${page}-${PLAGE_IMPORT}`
        }
      },
      apresSucces: (serviceDtos, headers) => {
        setServices(servicesPrecedents =>
          ajouterServices(serviceDtos, servicesPrecedents)
        );

        if (aPageSuivante(headers)) {
          chargerTousLesServices(page + UN);
        }
      },
      apresErreur: erreurs => {
        gereErreur(erreurs[ZERO], "Impossible de récupérer les services");
      }
    });
  };

  const chargerTousLesDecrets = () => {
    appelApiDecrets({
      apresSucces: decrets => {
        setDecrets(Decret.mapDecrets(decrets));
      },
      apresErreur: erreurs => {
        gereErreur(erreurs[ZERO], "Impossible de récupérer les décrets");
      }
    });
  };

  useEffect(() => {
    if (estUtilisateurConnecte) {
      chargerTousLesUtilisateurs(ZERO);
      chargerTousLesServices(ZERO);
      chargerTousLesDecrets();
    }
  }, [estUtilisateurConnecte]);

  return {
    utilisateurs,
    services,
    decrets
  };
};

export default useChargerDonneesContexte;
/* v8 ignore end */
