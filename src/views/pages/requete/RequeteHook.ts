import { useState, useEffect } from "react";
import { ApiManager, HttpMethod } from "../../../api/ApiManager";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { IRequeteApi } from "./RequeteTableau";
import { IDataTable } from "./RequeteTableauHeaderCell";
import moment from "moment";

export function useRequeteApi() {
  const [dataState, setDataState] = useState();
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    setDataState(undefined);
    setErrorState(undefined);
    const api = ApiManager.getInstance("rece-requete-api", "v1");
    const queryParameters = {
      nomOec: "slaoui",
      prenomOec: "nabil",
      statut: StatutRequete.ASigner
    };
    api
      .fetch({
        method: HttpMethod.GET,
        uri: "/requetes",
        parameters: queryParameters
      })
      .then(result => {
        setDataState(reponseRequeteMapper(result.data));
      })
      .catch(error => {
        setErrorState(error);
      });
  }, []);
  return { dataState, errorState };
}

function reponseRequeteMapper(data: IRequeteApi[]): IDataTable[] {
  let result: IDataTable[] = [];
  data.forEach(element => result.push(reponseRequeteMapperUnitaire(element)));
  return result;
}

function reponseRequeteMapperUnitaire(data: IRequeteApi): IDataTable {
  return {
    identifiant: data.idSagaDila.toString(),
    sousTypeRequete: data.sousTypeRequete,
    canalProvenance: data.provenance,
    natureActe: data.natureActe,
    dateCreation: moment.unix(data.dateCreation).format("DD/MM/YYYY"),
    dateStatut: moment.unix(data.dateStatut).format("DD/MM/YYYY"),
    statutRequete: data.statut,
    prioriteRequete: "TODO",
    requerant: data.requerant.nomOuRaisonSociale
  };
}
