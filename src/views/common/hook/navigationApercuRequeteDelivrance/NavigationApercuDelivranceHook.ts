import { RECEContextData } from "@core/contexts/RECEContext";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { receUrl } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { getUrlApercuRequete, redirectionSelonStatutRequete } from "./NavigationApercuDelivranceUtils";

export interface INavigationApercuDelivranceParams {
  requete: IRequeteTableauDelivrance;
  urlCourante: string;
  autoriserTraitementAutoRDCS?: boolean;
}

export const useNavigationApercuDelivrance = (params: INavigationApercuDelivranceParams | null) => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const redirection: string = useMemo(() => {
    if (!params) return "";

    // Si la requete est attribuée à l'utilisateur connecté
    return utilisateurConnecte?.id === params.requete.idUtilisateur &&
      params.requete.statut &&
      params.requete.type === TypeRequete.DELIVRANCE.libelle
      ? redirectionSelonStatutRequete(utilisateurConnecte, params.requete, params.urlCourante)
      : getUrlApercuRequete(params.urlCourante, params.requete.idRequete);
  }, [params]);

  useEffect(() => {
    if (!redirection || !params?.urlCourante) return;

    const autoriserTraitementAutoRDCS = {
      autoriserTraitementAutoRDCS: params.autoriserTraitementAutoRDCS ?? true
    };

    receUrl.estUrlApercuRequete(params.urlCourante) ||
    receUrl.estUrlApercuTraitementRequete(params.urlCourante) ||
    receUrl.estUrlSaisirCourrier(params.urlCourante) ||
    receUrl.estUrlEdition(params.urlCourante)
      ? replaceUrl(navigate, redirection, autoriserTraitementAutoRDCS)
      : navigate(redirection, { state: autoriserTraitementAutoRDCS });
  }, [redirection, params?.urlCourante]);
};
