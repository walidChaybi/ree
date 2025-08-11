import { getRequetesCreation, IQueryParametersPourRequetes, postRequetesServiceCreation, TypeAppelRequete } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IService } from "@model/agent/IService";
import { Utilisateur } from "@model/agent/Utilisateur";
import {
  IFiltreServiceRequeteCreationFormValues,
  IFiltresServiceRequeteCreation,
  mappingFiltreServiceCreationVersFiltreDto
} from "@model/form/creation/etablissement/IFiltreServiceRequeteCreation";
import { IRequeteTableauCreation, mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { getParamsTableauDepuisReponseApi, IParamsTableau } from "@util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useContext, useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export function useRequeteCreationApiHook(
  typeRequete: TypeAppelRequete,
  parametresLienRequete?: IQueryParametersPourRequetes,
  setParametresLienRequete?: React.Dispatch<React.SetStateAction<IQueryParametersPourRequetes | undefined>>
) {
  const { utilisateurs, services } = useContext(RECEContextData);
  const [dataState, setDataState] = useState<IRequeteTableauCreation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});
  const [filtresReq, setFiltresReq] = useState<IFiltresServiceRequeteCreation>({} as IFiltresServiceRequeteCreation);

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        if (parametresLienRequete) {
          const listeStatuts = parametresLienRequete.statuts?.join(",");
          const result =
            typeRequete === TypeAppelRequete.MES_REQUETES_CREATION
              ? await getRequetesCreation(listeStatuts, parametresLienRequete)
              : await postRequetesServiceCreation(parametresLienRequete, mappingFiltreServiceCreationVersFiltreDto(filtresReq));
          const mesRequetes = mappingRequetesTableauCreation(result?.body?.data, false, utilisateurs, services);
          setDataState(mesRequetes);
          setParamsTableau(getParamsTableauDepuisReponseApi(result));
        }
      } catch (erreurs) {
        AfficherMessage.erreur("Impossible de récupérer les requêtes de création", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
          fermetureAuto: true
        });
      }
    }
    fetchMesRequetes();
  }, [parametresLienRequete, typeRequete, filtresReq]);

  function onSubmit(values: IFiltreServiceRequeteCreationFormValues) {
    setFiltresReq({ ...values });
    if (setParametresLienRequete && parametresLienRequete) {
      setParametresLienRequete({
        ...parametresLienRequete,
        range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
      });
    }
  }

  return {
    dataState,
    paramsTableau,
    onSubmit
  };
}

function mappingRequetesTableauCreation(
  resultatsRecherche: any,
  mappingSupplementaire: boolean,
  utilisateurs: Utilisateur[],
  services: IService[]
): IRequeteTableauCreation[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauCreation(requete, mappingSupplementaire, utilisateurs, services);
  });
}
