import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { ApiEndpoints } from "../../router/UrlManager";
import { IDataTable } from "./MesRequetesPage";
import { FormatDate } from "../../../ressources/FormatDate";
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

      const requete = requetes
        ? requetes.find((requ) => requ.idRequete === queryParameters.idRequete)
        : null;

      const requetesToSend = [];
      if (requete != null) {
        requetesToSend.push({
          dateCreation: moment(
            requete.dateCreation,
            FormatDate.DDMMYYYY
          ).unix(),
          dateDerniereMaj: moment(
            requete.dateDerniereMaj,
            FormatDate.DDMMYYYY
          ).unix(),
          dateStatut: moment(requete.dateStatut, FormatDate.DDMMYYYY).unix(),
          anneeEvenement: requete.anneeEvenement,
          idRequete: requete.idRequete,
          idSagaDila: requete.idSagaDila,
          idRequeteInitiale: requete.idRequeteInitiale,
          jourEvenement: requete.jourEvenement,
          moisEvenement: requete.moisEvenement,
          natureActe: requete.natureActe,
          canal: requete.canal,
          motifRequete: requete.motifRequete,
          nbExemplaire: requete.nbExemplaire,
          paysEvenement: requete.paysEvenement,
          piecesJustificatives: requete.piecesJustificatives,
          provenance: requete.provenance,
          reponse: requete.reponse!,
          requerant: requete.requerant,
          sousTypeRequete: requete.sousTypeRequete,
          statut: requete.statut,
          titulaires: requete.titulaires,
          typeActe: requete.typeActe,
          typeRequete: requete.typeRequete,
          villeEvenement: requete.villeEvenement,
          documentsDelivres: requete.documentsDelivres,
          nomOec: queryParameters.nomOec,
          prenomOec: queryParameters.prenomOec,
        });
      }

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
