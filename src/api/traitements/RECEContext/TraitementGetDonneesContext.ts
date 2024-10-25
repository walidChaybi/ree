import { CONFIG_GET_TOUS_SERVICES } from "@api/configurations/agent/services/GetServicesConfigApi";
import { CONFIG_GET_TOUS_UTILISATEURS } from "@api/configurations/agent/utilisateur/GetUtilisateursConfigApi";
import { CONFIG_GET_DECRETS } from "@api/configurations/decret/GetDecretsConfigApi";
import { gereErreur } from "@hook/requete/PrendreEnChargeAleatoirementApiHook";
import { IService, Service } from "@model/agent/IService";
import { IUtilisateur, Utilisateur } from "@model/agent/IUtilisateur";
import { THeader } from "@model/api/Api";
import { Decret, IDecret } from "@model/etatcivil/commun/IDecret";
import { UN, ZERO } from "@util/Utils";
import { useEffect, useState } from "react";
import IServiceDto, { ServiceDto } from "../../../dto/etatcivil/agent/IServiceDto";
import IUtilisateurDto, { UtilisateurDto } from "../../../dto/etatcivil/agent/IUtilisateurDto";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import { TRAITEMENT_SANS_ERREUR, TTraitementApi } from "../TTraitementApi";

interface IReponseSucces {
  utilisateurs: IUtilisateur[];
  services: IService[];
  decrets: IDecret[];
}

const PLAGE_IMPORT = 100;

const ajouterUtilisateurs = (utilisateurDtos: IUtilisateurDto[], utilisateurs: IUtilisateur[]): IUtilisateur[] => [
  ...utilisateurs,
  ...utilisateurDtos.reduce((nouveauxUtilisateurs: IUtilisateur[], utilisateurDto: IUtilisateurDto) => {
    if (!UtilisateurDto.estDejaPresent(utilisateurDto, utilisateurs)) {
      nouveauxUtilisateurs.push(Utilisateur.depuiDto(utilisateurDto));
    }

    return nouveauxUtilisateurs;
  }, [])
];

const ajouterServices = (serviceDtos: IServiceDto[], services: IService[]): IService[] => [
  ...services,
  ...serviceDtos.reduce((nouveauxServices: IService[], serviceDto: IServiceDto) => {
    if (!ServiceDto.estDejaPresent(serviceDto, services)) {
      nouveauxServices.push(Service.depuisDto(serviceDto));
    }

    return nouveauxServices;
  }, [])
];

const aPageSuivante = (headers: THeader) => (headers?.link.indexOf(`rel="next"`) ?? -UN) >= ZERO;

export const TRAITEMENT_GET_DONNEES_CONTEXT: TTraitementApi<undefined, IReponseSucces> = {
  Lancer: terminerTraitement => {
    const [reponseTraitement, setReponseTraitement] = useState<IReponseSucces>({ utilisateurs: [], services: [], decrets: [] });
    const [appelsTermines, setAppelsTermines] = useState({ utilisateurs: false, services: false, decrets: false });
    const { appelApi: appelApiUtilisateurs } = useFetchApi(CONFIG_GET_TOUS_UTILISATEURS);
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
          setReponseTraitement(etatPrecedent => ({
            ...etatPrecedent,
            utilisateurs: ajouterUtilisateurs(utilisateurDtos, etatPrecedent.utilisateurs)
          }));

          aPageSuivante(headers)
            ? chargerTousLesUtilisateurs(page + UN)
            : setAppelsTermines(etatPrecedent => ({ ...etatPrecedent, utilisateurs: true }));
        },
        apresErreur: erreurs => {
          gereErreur(erreurs[ZERO], "Impossible de récupérer les utilisateurs");
          setAppelsTermines(etatPrecedent => ({ ...etatPrecedent, utilisateurs: true }));
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
          setReponseTraitement(etatPrecedent => ({ ...etatPrecedent, services: ajouterServices(serviceDtos, etatPrecedent.services) }));

          aPageSuivante(headers)
            ? chargerTousLesServices(page + UN)
            : setAppelsTermines(etatPrecedent => ({ ...etatPrecedent, services: true }));
        },
        apresErreur: erreurs => {
          gereErreur(erreurs[ZERO], "Impossible de récupérer les services");
          setAppelsTermines(etatPrecedent => ({ ...etatPrecedent, services: true }));
        }
      });
    };

    const chargerTousLesDecrets = () => {
      appelApiDecrets({
        apresSucces: decrets => {
          setReponseTraitement(etatPrecedent => ({ ...etatPrecedent, decrets: Decret.mapDecrets(decrets) }));
        },
        apresErreur: erreurs => {
          gereErreur(erreurs[ZERO], "Impossible de récupérer les décrets");
        },
        finalement: () => setAppelsTermines(etatPrecedent => ({ ...etatPrecedent, decrets: true }))
      });
    };

    const lancer = () => {
      chargerTousLesUtilisateurs(0);
      chargerTousLesServices(0);
      chargerTousLesDecrets();
    };

    useEffect(() => {
      const traitementTermine = Object.values(appelsTermines).reduce(
        (estTermine, appelTermine) => (!estTermine ? false : appelTermine),
        true
      );

      if (traitementTermine) {
        terminerTraitement();
      }
    }, [appelsTermines]);

    return { lancer, erreurTraitement: TRAITEMENT_SANS_ERREUR, reponseTraitement };
  }
};
