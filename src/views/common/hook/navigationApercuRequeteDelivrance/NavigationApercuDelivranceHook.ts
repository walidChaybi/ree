import { RECEContextData } from "@core/contexts/RECEContext";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { getUrlApercuRequete, redirectionSelonStatutRequete } from "./NavigationApercuDelivranceUtils";

export interface INavigationApercuDelivranceParams {
  requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">;
  urlCourante: string;
  autoriserTraitementAutoRDCS?: boolean;
}

export const useNavigationApercuDelivrance = (params: INavigationApercuDelivranceParams | null) => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const redirection: string = useMemo(() => {
    if (!params) return "";

    // Si la requete est attribuée à l'utilisateur connecté
    return utilisateurConnecte.id === params.requete.idUtilisateur &&
      params.requete.statut &&
      ("idRequete" in params.requete ? params.requete.type === TypeRequete.DELIVRANCE.libelle : params.requete.type === "DELIVRANCE")
      ? redirectionSelonStatutRequete(utilisateurConnecte, params.requete)
      : getUrlApercuRequete("idRequete" in params.requete ? params.requete.idRequete : params.requete.id);
  }, [params]);

  useEffect(() => {
    if (!redirection || !params?.urlCourante) return;

    navigate(redirection, {
      state: {
        autoriserTraitementAutoRDCS: params.autoriserTraitementAutoRDCS ?? true
      }
    });
  }, [redirection, params?.urlCourante]);
};
