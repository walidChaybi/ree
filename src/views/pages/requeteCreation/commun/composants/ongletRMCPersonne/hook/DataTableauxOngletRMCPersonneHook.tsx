import { CONFIG_POST_RMC_AUTO_PERSONNE } from "@api/configurations/etatCivil/personnes/PostRMCAutoPersonneConfigApi";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import {
  IRMCAutoTitulaireDto,
  titulaireRequeteVersRMCAutoTitulaireDto
} from "@model/rmc/acteInscription/rechercheForm/IRMCAutoTitulaireDto";
import { useCacheLocalPage } from "@util/cacheLocalPageHook/CacheLocalPageHook";
import { IRMCPersonneResultat } from "@views/common/hook/rmcAuto/IRMCPersonneResultat";
import { concatValeursRMCAutoPersonneRequest, mappingRMCPersonneResultat } from "@views/common/hook/rmcAuto/RMCAutoPersonneUtils";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@views/pages/requeteCreation/commun/requeteCreationUtils";
import { NB_LIGNES_PAR_APPEL_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../../../../utils/AfficherMessage";
import { IDataTableauActeInscriptionSelectionne } from "../../tableauActesInscriptionsSelectionnes/IDataTableauActeInscriptionSelectionne";
import { useDataTableauActesInscriptionsSelectionnesHook } from "../../tableauActesInscriptionsSelectionnes/hook/DataTableauActesInscriptionsSelectionnesHook";

interface IDataTableauxOngletRMCPersonne {
  dataActesInscriptionsSelectionnes?: IDataTableauActeInscriptionSelectionne[];
  setDataActesInscriptionsSelectionnes: React.Dispatch<React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>>;
  setCriteresRMCAutoPersonne: React.Dispatch<React.SetStateAction<IRMCAutoTitulaireDto | undefined>>;
  resultatRMCAutoPersonne: IRMCPersonneResultat[] | null;
  rmcAutoPersonneEnChargement: boolean;
}

export const useDataTableauxOngletRMCPersonne = (requete?: IRequeteCreation): IDataTableauxOngletRMCPersonne => {
  const [criteresRMCAutoPersonne, setCriteresRMCAutoPersonne] = useState<IRMCAutoTitulaireDto>();
  const [resultatRMCAutoPersonne, setResultatRMCAutoPersonne] = useState<IRMCPersonneResultat[] | null>(null);

  const { cacheLocalPage } = useCacheLocalPage<IRMCAutoTitulaireDto, IRMCPersonneResultat[]>(concatValeursRMCAutoPersonneRequest);

  useEffect(() => {
    const titulaire = getPostulantNationaliteOuTitulaireActeTranscritDresse(requete);
    if (titulaire) {
      setCriteresRMCAutoPersonne(titulaireRequeteVersRMCAutoTitulaireDto(titulaire));
    }
  }, [requete]);

  const { appelApi: postRMCAutoPersonne, enAttenteDeReponseApi: rmcAutoPersonneEnChargement } = useFetchApi(CONFIG_POST_RMC_AUTO_PERSONNE);

  useEffect(() => {
    if (!criteresRMCAutoPersonne) return;

    const resultatEnCache = cacheLocalPage.get(criteresRMCAutoPersonne);

    if (resultatEnCache) {
      setResultatRMCAutoPersonne(resultatEnCache);
      return;
    }

    postRMCAutoPersonne({
      parametres: {
        body: criteresRMCAutoPersonne,
        query: { range: `0-${NB_LIGNES_PAR_APPEL_PERSONNE}` }
      },
      apresSucces: resultats => {
        const resultatRMCAuto = mappingRMCPersonneResultat(resultats);
        cacheLocalPage.set(criteresRMCAutoPersonne, resultatRMCAuto);
        setResultatRMCAutoPersonne(resultatRMCAuto);
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de récupérer les personnes de la recherche multi-critères.", {
          erreurs
        })
    });
  }, [criteresRMCAutoPersonne]);

  const { dataActesInscriptionsSelectionnes, setDataActesInscriptionsSelectionnes } = useDataTableauActesInscriptionsSelectionnesHook(
    requete?.piecesJustificatives
  );

  return {
    dataActesInscriptionsSelectionnes,
    setDataActesInscriptionsSelectionnes,
    setCriteresRMCAutoPersonne,
    resultatRMCAutoPersonne,
    rmcAutoPersonneEnChargement
  };
};
