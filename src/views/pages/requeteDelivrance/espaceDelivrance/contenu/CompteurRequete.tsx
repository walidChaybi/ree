import { CONFIG_GET_NOMBRE_REQUETES } from "@api/configurations/requete/GetNombreRequetesConfigApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import React, { useEffect, useState } from "react";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../../utils/AfficherMessage";
import "./scss/CompteurRequete.scss";

interface CompteurRequeteProps {
  reloadCompteur: boolean;
}

export const CompteurRequete: React.FC<CompteurRequeteProps> = props => {
  const [nombreRequetes, setNombreRequetes] = useState<number>(0);
  const { appelApi: getNombreRequetes } = useFetchApi(CONFIG_GET_NOMBRE_REQUETES);

  useEffect(() => {
    getNombreRequetes({
      parametres: { query: { statuts: StatutRequete.A_SIGNER.nom } },
      apresSucces: nombre => setNombreRequetes(nombre),
      apresErreur: erreurs => AfficherMessage.erreur("Erreur lors de la récupération du nombre de requêtes", { erreurs })
    });
  }, [props.reloadCompteur]);

  return <span className={"compteur-requetes"}>{`Total de requêtes à signer : ${nombreRequetes}`}</span>;
};
