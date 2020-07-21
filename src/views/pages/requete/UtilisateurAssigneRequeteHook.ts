import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { ApiEndpoints } from "../../router/UrlManager";
import { IDataTable } from "./MesRequetesPage";
import { IRequeteApi } from "./DonneesRequeteHook";
import moment from "moment";

export interface IQueryParametersAssigneRequetes {
  idRequete: string;
  nomOec: string;
  prenomOec: string;
}

export function useUtilisateurRequeteApi(
  queryParameters?: IQueryParametersAssigneRequetes,
  requetes?: IDataTable[]
) {
  const [dataState, setDataState] = useState<IQueryParametersAssigneRequetes>();
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    if (queryParameters !== undefined) {
      const api = ApiManager.getInstance("rece-requete-api", "v1");

      const requetesToSend: IRequeteApi[] = requetes
        ? requetes.map((r) => {
            const newRequest = {
              dateCreation: moment(r.dateCreation, "DD/MM/YYYY").unix(),
              dateDerniereMaj: moment(r.dateDerniereMaj, "DD/MM/YYYY").unix(),
              dateStatut: moment(r.dateStatut, "DD/MM/YYYY").unix(),
              anneeEvenement: r.anneeEvenement,
              idRequete: r.idRequete,
              idSagaDila: r.idSagaDila,
              idRequeteInitiale: r.idRequeteInitiale,
              jourEvenement: r.jourEvenement,
              moisEvenement: r.moisEvenement,
              natureActe: r.natureActe,
              canal: r.canal,
              motif: r.motif,
              nbExemplaire: r.nbExemplaire,
              paysEvenement: r.paysEvenement,
              piecesJustificatives: r.piecesJustificatives,
              provenance: r.provenance,
              reponse: r.reponse!,
              requerant: r.requerant,
              sousTypeRequete: r.sousTypeRequete,
              statut: r.statut,
              titulaires: r.titulaires,
              typeActe: r.typeActe,
              typeRequete: r.typeRequete,
              villeEvenement: r.villeEvenement,
            };
            if (newRequest.reponse !== undefined) {
              newRequest.reponse.nomOec = queryParameters.nomOec;
              newRequest.reponse.prenomOec = queryParameters.prenomOec;
            }

            return newRequest;
          })
        : [];

      api
        .fetch({
          method: HttpMethod.PUT,
          uri: ApiEndpoints.RequetesUrl,
          data: [...requetesToSend],
          headers: [],
        })
        .then(() => {
          if (requetes !== undefined) {
            const idxRequete = requetes.findIndex(
              (r) => r.idRequete === queryParameters.idRequete
            );

            requetes[
              idxRequete
            ].nomOec = `${queryParameters.prenomOec} ${queryParameters.nomOec}`;
          }
          setDataState(queryParameters);
        })
        .catch((error) => {
          setErrorState(error);
        });
    }
  }, [queryParameters, requetes]);

  return {
    dataState,
    errorState,
  };
}
