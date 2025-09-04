import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import { getUrlApercuRequete, redirectionSelonStatutRequete } from "./NavigationApercuDelivranceUtils";

export interface INavigationApercuDelivranceParams {
  requete: IRequeteTableauDelivrance | RequeteTableauRMC<"DELIVRANCE">;
  autoriserTraitementAutoRDCS?: boolean;
}

export const useNavigationApercuDelivrance = (params: INavigationApercuDelivranceParams | null) => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  useEffect(() => {
    if (!params) return;

    const estRequeteDelivrance: boolean =
      "idRequete" in params.requete ? params.requete.type === TypeRequete.DELIVRANCE.libelle : params.requete.type === "DELIVRANCE";
    const idRequete: string = "idRequete" in params.requete ? params.requete.idRequete : params.requete.id;

    // Si la requete est attribuée à l'utilisateur connecté
    const redirection =
      utilisateurConnecte.id === params.requete.idUtilisateur && params.requete.statut && estRequeteDelivrance
        ? redirectionSelonStatutRequete(utilisateurConnecte, params.requete)
        : getUrlApercuRequete(idRequete);

    navigate(redirection, {
      state: {
        autoriserTraitementAutoRDCS: params.autoriserTraitementAutoRDCS ?? true
      }
    });
  }, [params]);
};
