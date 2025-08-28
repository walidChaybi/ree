import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { RMCActeInscriptionResultats } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCActeInscriptionResultats";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useEffect, useState } from "react";

import TRAITEMENT_RMC_ACTES_INSCRIPTIONS, { IResultatRMCActesInscriptions } from "@api/traitements/rmc/TraitementRMCActesInscriptions";
import DefilementAutomatique from "../../composants/commun/defilementAutomatique/DefilementAutomatique";
import RMCActeInscription from "../../composants/pages/rmc/formulaire/RMCActeInscription";
import { RMCContextProvider } from "../../contexts/RMCContextProvider";
import useTraitementApi from "../../hooks/api/TraitementApiHook";
import { StockageLocal } from "../../utils/StockageLocal";

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

  const onSubmitRMCActeInscription = (valeurs: IRMCActeInscriptionForm) => {
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
      <DefilementAutomatique faireDefiler={Boolean(resultatRMCActeInscription)} />
      {resultatRMCActeInscription && (
        <RMCActeInscriptionResultats
          typeRMC="Classique"
          dataRMCActe={resultatRMCActeInscription.resultatRMCActe}
          dataTableauRMCActe={resultatRMCActeInscription.paramsTableauRMCActe}
          dataRMCInscription={resultatRMCActeInscription.resultatRMCInscription}
          dataTableauRMCInscription={resultatRMCActeInscription.paramsTableauRMCInscription}
          resetRMC={nouvelleRMCActeInscription}
          nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
          nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
          nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
          nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
          rmcActeEnCours={enAttenteRMC}
          rmcInscriptionEnCours={enAttenteRMC}
        />
      )}
    </>
  );
};

export default PageRMCActeInscription;
