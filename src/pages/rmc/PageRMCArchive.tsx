import { CONFIG_POST_RMC_ARCHIVE } from "@api/configurations/etatCivil/acte/PostRMCArchiveConfigApi";
import { RMCArchiveForm } from "@model/form/rmc/RMCArchiveForm";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import { getParamsTableauRMCDepuisHeaders, TParamsTableauRMC } from "@util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL_ACTE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useEffect, useState } from "react";
import DefilementAutomatique from "../../composants/commun/defilementAutomatique/DefilementAutomatique";
import RMCArchive from "../../composants/pages/rmc/formulaire/RMCArchive";
import { RMCContextProvider } from "../../contexts/RMCContextProvider";
import useFetchApi from "../../hooks/api/FetchApiHook";
import AfficherMessage from "../../utils/AfficherMessage";
import { StockageLocal } from "../../utils/StockageLocal";
import { RMCActeArchiveResultats } from "../../views/pages/rechercheMultiCriteres/acteArchive/resultats/RMCActeArchiveResultats";

interface IRMCActeArchiveApiResultat {
  resultatRMCActe: ResultatRMCActe[];
  paramsTableauRMCActe?: TParamsTableauRMC;
}

const PageRMCArchive: React.FC = () => {
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  const [nouvelleRecherche, setNouvelleRecherche] = useState<boolean>(false);
  const [resultatRMCArchive, setResultatRMCArchive] = useState<IRMCActeArchiveApiResultat | null>(null);
  const { appelApi: getRmcActe, enAttenteDeReponseApi: enAttenteRMC } = useFetchApi(CONFIG_POST_RMC_ARCHIVE);

  const onSubmitRMCArchive = (valeurs: ICriteresRMC) => {
    StockageLocal.stocker("CRITERES_RMC_ARCHIVE", valeurs);

    const criteresRMC = RMCArchiveForm.versDto(valeurs);

    getRmcActe({
      parametres: { query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` }, body: criteresRMC },
      apresSucces: (actes, headers) => {
        setResultatRMCArchive({
          resultatRMCActe: actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null),
          paramsTableauRMCActe: getParamsTableauRMCDepuisHeaders(headers)
        });
      },
      apresErreur: (erreurs, statut) => {
        console.error("Erreur lors de la RMC acte :", erreurs);
        statut === 413
          ? AfficherMessage.info("La recherche renvoie plus de 100 résultats. Veuillez affiner votre recherche.", { fermetureAuto: true })
          : AfficherMessage.erreur("Une erreur est survenue lors de la recherche multi-critères d'actes", { erreurs });
      }
    });

    setNouvelleRecherche(true);
    setNouvelleRecherche(false);
  };

  return (
    <>
      <RMCContextProvider>
        <RMCArchive onSubmit={onSubmitRMCArchive} />
      </RMCContextProvider>
      <DefilementAutomatique faireDefiler={!enAttenteRMC && Boolean(resultatRMCArchive)} />
      {resultatRMCArchive?.resultatRMCActe && resultatRMCArchive.paramsTableauRMCActe && (
        <RMCActeArchiveResultats
          dataRMCActeArchive={resultatRMCArchive.resultatRMCActe}
          dataTableauRMCActeArchive={resultatRMCArchive.paramsTableauRMCActe}
          resetRMC={nouvelleRecherche}
        />
      )}
    </>
  );
};

export default PageRMCArchive;
