import {
  getReqNataliById,
  getRequetesCreation,
  IQueryParametersPourRequetes,
  postRequetesServiceCreation,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  IRequeteTableauCreation,
  mappingUneRequeteTableauCreation
} from "@model/requete/IRequeteTableauCreation";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { Option } from "@util/Type";
import { useEffect, useState } from "react";

export interface FiltreEtRechercheFormValues {
  numeroRequete: string;
  sousType: string;
  priorisation: string;
  attribueA: Option | null;
  attribueAuService: Option | null;
  statut: string;
}

export interface FiltresReqDto {
  sousType: string | null;
  tagPriorisation: string | null;
  idAgent: string | null;
  idEntiteRattachement: string | null;
  statuts: string[] | null;
}

export type FiltresFormValues = Omit<
  FiltreEtRechercheFormValues,
  "numeroRequete"
>;

const defaultFiltre: FiltresReqDto = {
  sousType: "",
  tagPriorisation: "",
  idAgent: "",
  idEntiteRattachement: "",
  statuts: StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.CREATION).map(
    st => st.cle
  )
};

export function useRequeteCreationApiHook(
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void,
  queryParameters?: IQueryParametersPourRequetes
) {
  const [dataState, setDataState] = useState<IRequeteTableauCreation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});
  const [numeroReqNatali, setNumeroReqNatali] = useState<string>();
  const [filtresReq, setFiltresReq] = useState<FiltresFormValues>(
    {} as FiltresFormValues
  );

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        if (queryParameters) {
          const listeStatuts = queryParameters.statuts?.join(",");
          const result =
            typeRequete === TypeAppelRequete.MES_REQUETES_CREATION
              ? await getRequetesCreation(listeStatuts, queryParameters)
              : await postRequetesServiceCreation(
                  queryParameters,
                  mappingFiltresFormToFiltresDto(filtresReq)
                );
          const mesRequetes = mappingRequetesTableauCreation(
            result?.body?.data,
            false
          );
          setDataState(mesRequetes);
          setParamsTableau(getParamsTableau(result));
          setEnChargement(false);
        }
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes de création",
          error
        });
      }
    }
    fetchMesRequetes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParameters, typeRequete, setEnChargement, filtresReq]);

  useEffect(() => {
    if (numeroReqNatali) {
      getReqNataliById(numeroReqNatali)
        .then(res => {
          if (res) {
            setDataState(mappingRequetesTableauCreation(res.body.data, false));
            setParamsTableau(getParamsTableau(res));
          }
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: `Impossible de récupérer la requête Natali associée au dossier ${numeroReqNatali}`,
            error
          });
        });
    }
  }, [numeroReqNatali]);

  function onSubmit(values: FiltreEtRechercheFormValues) {
    setNumeroReqNatali(values.numeroRequete);
    if (!values.numeroRequete) {
      setFiltresReq({ ...values });
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
  mappingSupplementaire: boolean
): IRequeteTableauCreation[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauCreation(requete, mappingSupplementaire);
  });
}

export function mappingFiltresFormToFiltresDto(
  filtre: FiltresFormValues
): FiltresReqDto {
  return {
    sousType: filtre.sousType || null,
    tagPriorisation: filtre.priorisation || null,
    idAgent: filtre.attribueA?.cle || null,
    idEntiteRattachement: filtre.attribueAuService?.cle || null,
    statuts: filtre.statut ? [filtre.statut] : defaultFiltre.statuts
  };
}
