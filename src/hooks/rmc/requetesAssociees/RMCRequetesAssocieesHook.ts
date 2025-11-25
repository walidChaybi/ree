import { CONFIG_POST_RMC_REQUETE } from "@api/configurations/requete/rmc/PostRMCRequeteConfigApi";
import { THeader } from "@model/api/Api";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { ITableauRMC } from "@model/rmc/ITableauRMC";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { mappingCriteresRMCRequeteVersDto } from "@model/rmc/requete/ICriteresRMCRequeteDto";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import RequeteAssociee, { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { TRequeteTableauRMCDto } from "@model/rmc/requete/RequeteTableauRMC";
import { useEffect, useState } from "react";
import AfficherMessage from "../../../utils/AfficherMessage";
import TableauUtils from "../../../utils/TableauUtils";
import useFetchApi from "../../api/FetchApiHook";

export const useRMCRequetesAssociees = (setTableauRMC: React.Dispatch<React.SetStateAction<ITableauRMC | null>>) => {
  const [estPopinOuverte, setEstPopinOuverte] = useState<boolean>(false);
  const [valeursRMCRequete, setValeursRMCRequete] = useState<IRMCRequeteForm<keyof typeof ETypeRequete | ""> | null>(null);
  const [criteresRechercheRequete, setCriteresRechercheRequete] = useState<ICriteresRMCRequete>();

  const { appelApi: postRmcRequete, enAttenteDeReponseApi: enAttenteDeReponseApiRmcRequete } = useFetchApi(CONFIG_POST_RMC_REQUETE);

  const gererClicNouvelleRMC = () => {
    setEstPopinOuverte(true);
  };

  const onFermeturePopin = (afficherPopin: boolean) => {
    if (estPopinOuverte) {
      setEstPopinOuverte(afficherPopin);
    }
  };

  useEffect(() => {
    if (!criteresRechercheRequete?.valeurs) return;

    postRmcRequete({
      parametres: {
        query: { range: criteresRechercheRequete.range },
        body: mappingCriteresRMCRequeteVersDto(criteresRechercheRequete.valeurs)
      },
      apresSucces: (requetes: TRequeteTableauRMCDto[], headers: THeader) => {
        setTableauRMC({
          requetesAssociees: requetes
            ?.map(requete => RequeteAssociee.depuisDto(requete))
            .filter((requete): requete is TRequeteAssociee => requete !== null),
          nombreTotalLignes: TableauUtils.recupererNombreTotalLignesDepuisHeaders(headers)
        });
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Impossible de récupérer les requetes de la recherche multi-critères", { erreurs });
        criteresRechercheRequete?.onErreur?.();
      }
    });
  }, [criteresRechercheRequete]);

  return {
    estPopinOuverte,
    enAttenteDeReponseApiRmcRequete,
    valeursRMCRequete,
    setValeursRMCRequete,
    setCriteresRechercheRequete,
    gererClicNouvelleRMC,
    onFermeturePopin
  };
};
