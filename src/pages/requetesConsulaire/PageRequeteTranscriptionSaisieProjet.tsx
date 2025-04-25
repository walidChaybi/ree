import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import messageManager from "@util/messageManager";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import PartieDroiteSaisieProjet from "../../composants/pages/requetesConsulaire/saisieProjet/PartieDroiteSaisieProjet";
import PartieGaucheSaisieProjet from "../../composants/pages/requetesConsulaire/saisieProjet/PartieGaucheSaisieProjet";
import useFetchApi from "../../hooks/api/FetchApiHook";

export const PageRequeteTranscriptionSaisieProjet: React.FC = () => {
  const { idRequeteParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [requete, setRequete] = useState<IRequeteCreationTranscription | null>(null);
  const estModeConsultation = useMemo<boolean>(() => location.pathname.includes(URL_RECHERCHE_REQUETE), [location.pathname]);

  const { appelApi, enAttenteDeReponseApi } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);

  useEffect(() => {
    if (!idRequeteParam) {
      navigate(-1);

      return;
    }

    appelApi({
      parametres: {
        path: {
          idRequete: idRequeteParam
        },
        query: {
          isConsultation: estModeConsultation,
          isConsultationHistoriqueAction: false
        }
      },
      apresSucces: data => {
        setRequete(mappingRequeteCreation(data) as IRequeteCreation);
      },
      apresErreur: messageErreur => {
        messageManager.showError("Une erreur est survenue lors de la récupération des informations de l'acte");
        console.error(`Erreur la récupération de la requete: ${messageErreur}`);
        navigate(-1);
      }
    });
  }, []);

  return (
    <div className="mt-4 flex gap-8">
      {enAttenteDeReponseApi || !requete ? (
        <PageChargeur />
      ) : (
        <>
          <PartieGaucheSaisieProjet
            requete={requete}
            estModeConsultation={estModeConsultation}
          />
          <PartieDroiteSaisieProjet requete={requete} />
        </>
      )}
    </div>
  );
};
