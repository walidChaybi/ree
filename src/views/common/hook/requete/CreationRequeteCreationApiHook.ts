import { creationRequeteCreation, creationRequeteCreationEtTransmissionEntite } from "@api/appels/requeteApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mappingRequeteCreation } from "./DetailRequeteHook";

export interface ISaisieRequeteRCTCAEnvoyer {
  canal: string;
  lienRequerant: any;
  natureActeTranscrit: string;
  villeRegistre?: string;
  provenance: string;
  requerant: any;
  sousType: string;
  titulaires: any[];
  type: string;
}

export type ISaisieRequeteAEnvoyer = ISaisieRequeteRCTCAEnvoyer;

export interface ICreationRequeteCreationParams {
  requete?: ISaisieRequeteAEnvoyer;
  idEntiteRattachement?: string;
}

export function useCreationRequeteCreation(
  params?: ICreationRequeteCreationParams
): string | undefined {
  const [resultat, setResultat] = useState<string>();

  useEffect(() => {
    if (params?.requete) {
      creationRequeteCreation(params.requete)
        .then((result: any) => {
          setResultat(mappingRequeteCreation(result.body.data[0]).id);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de la création de la requête",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}

export function useCreationRequeteCreationEtTransmissionEntite(
  params?: ICreationRequeteCreationParams
): string | undefined {
  const [idRequeteCree, setIdRequeteCree] = useState<string>();

  useEffect(() => {
    if (params?.requete && params.idEntiteRattachement) {
      creationRequeteCreationEtTransmissionEntite(
        params.requete,
        params.idEntiteRattachement
      )
        .then((result: any) => {
          setIdRequeteCree(result.body.data[0].id);
        })
        .catch((err: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de la transmission de la requête",
            error: err
          });
        });
    }
  }, [params]);

  return idRequeteCree;
}

