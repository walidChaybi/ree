import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { IRMCAutoPersonneParams, useRMCAutoPersonneApiAvecCacheHook } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { useEffect, useState } from "react";
import { IDataTableauActeInscriptionSelectionne } from "../../tableauActesInscriptionsSelectionnes/IDataTableauActeInscriptionSelectionne";
import { useDataTableauActesInscriptionsSelectionnesHook } from "../../tableauActesInscriptionsSelectionnes/hook/DataTableauActesInscriptionsSelectionnesHook";

interface IDataTableauxOngletRMCPersonne {
  dataActesInscriptionsSelectionnes?: IDataTableauActeInscriptionSelectionne[];
  setDataActesInscriptionsSelectionnes: React.Dispatch<React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>>;
  setRmcAutoPersonneParams: React.Dispatch<React.SetStateAction<IRMCAutoPersonneParams | undefined>>;
  resultatRMCAutoPersonne?: IRMCPersonneResultat[];
  rmcAutoPersonneEnChargement: boolean;
}

export function useDataTableauxOngletRMCPersonne(requete?: IRequeteCreation): IDataTableauxOngletRMCPersonne {
  // RMC Personne
  const [rmcAutoPersonneParams, setRmcAutoPersonneParams] = useState<IRMCAutoPersonneParams>();
  const resultatRMCAutoPersonne = useRMCAutoPersonneApiAvecCacheHook(rmcAutoPersonneParams);
  const [rmcAutoPersonneEnChargement, setRmcAutoPersonneEnChargement] = useState<boolean>(true);

  useEffect(() => {
    if (requete) {
      const titulaire = getPostulantNationaliteOuTitulaireActeTranscritDresse(requete);
      if (titulaire) {
        setRmcAutoPersonneParams(mapTitulaireVersRMCAutoPersonneParams(titulaire));
      }
    }
  }, [requete]);

  useEffect(() => {
    if (resultatRMCAutoPersonne) {
      setRmcAutoPersonneEnChargement(false);
    }
  }, [resultatRMCAutoPersonne]);

  // Actes ou inscriptions selectionnes
  const { dataActesInscriptionsSelectionnes, setDataActesInscriptionsSelectionnes } = useDataTableauActesInscriptionsSelectionnesHook(
    requete?.piecesJustificatives
  );

  return {
    dataActesInscriptionsSelectionnes,
    setDataActesInscriptionsSelectionnes,
    setRmcAutoPersonneParams,
    resultatRMCAutoPersonne,
    rmcAutoPersonneEnChargement
  };
}
