import TRAITEMENT_RMC_ACTES_INSCRIPTIONS, { IResultatRMCActesInscriptions } from "@api/traitements/rmc/TraitementRMCActesInscriptions";
import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import React, { useEffect, useState } from "react";
import DefilementAutomatique from "../../composants/commun/defilementAutomatique/DefilementAutomatique";
import RMCActeInscription from "../../composants/pages/rmc/formulaire/RMCActeInscription";
import { RMCContextProvider } from "../../contexts/RMCContextProvider";
import useTraitementApi from "../../hooks/api/TraitementApiHook";
import { StockageLocal } from "../../utils/StockageLocal";
import { RMCActeInscriptionResultats } from "../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCActeInscriptionResultats";

const PageRMCActeInscription: React.FC = () => {
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  const [nouvelleRMCActeInscription, setNouvelleRMCActeInscription] = useState<boolean>(false);
  const [resultatRMCActeInscription, setResultatRMCActeInscription] = useState<IResultatRMCActesInscriptions | null>(null);

  const { lancerTraitement, traitementEnCours: enAttenteRMC } = useTraitementApi(TRAITEMENT_RMC_ACTES_INSCRIPTIONS);

  const onSubmitRMCActeInscription = (valeurs: ICriteresRMC) => {
    StockageLocal.stocker("CRITERES_RMC_ACTE_INSCRIPTION", valeurs);
    lancerTraitement({
      parametres: {
        valeursFormulaire: valeurs
      },
      apresSucces: setResultatRMCActeInscription
    });

    setNouvelleRMCActeInscription(true);
    setNouvelleRMCActeInscription(false);
  };

  return (
    <>
      <RMCContextProvider>
        <RMCActeInscription onSubmit={onSubmitRMCActeInscription} />
      </RMCContextProvider>
      <DefilementAutomatique faireDefiler={!enAttenteRMC && Boolean(resultatRMCActeInscription)} />
      {resultatRMCActeInscription && (
        <RMCActeInscriptionResultats
          typeRMC="Classique"
          dataRMCActe={resultatRMCActeInscription.resultatRMCActe}
          dataTableauRMCActe={resultatRMCActeInscription.paramsTableauRMCActe}
          dataRMCInscription={resultatRMCActeInscription.resultatRMCInscription}
          dataTableauRMCInscription={resultatRMCActeInscription.paramsTableauRMCInscription}
          resetRMC={nouvelleRMCActeInscription}
          rmcEnCours={enAttenteRMC}
        />
      )}
    </>
  );
};

export default PageRMCActeInscription;
