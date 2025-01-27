import { getRequetesCreation, IQueryParametersPourRequetes, postRequetesServiceCreation, TypeAppelRequete } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import {
  IFiltreServiceRequeteCreationFormValues,
  IFiltresServiceRequeteCreation,
  mappingFiltreServiceCreationVersFiltreDto
} from "@model/form/creation/etablissement/IFiltreServiceRequeteCreation";
import { IRequeteTableauCreation, mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useContext, useEffect, useState } from "react";

export function useRequeteCreationApiHook(
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void,
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
          setParamsTableau(getParamsTableau(result));
          setEnChargement(false);
        }
      } catch (error) {
        logError({
          messageUtilisateur: "Impossible de récupérer les requêtes de création",
          error
        });
      }
    }
    fetchMesRequetes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametresLienRequete, typeRequete, setEnChargement, filtresReq]);

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
  utilisateurs: IUtilisateur[],
  services: IService[]
): IRequeteTableauCreation[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauCreation(requete, mappingSupplementaire, utilisateurs, services);
  });
}
