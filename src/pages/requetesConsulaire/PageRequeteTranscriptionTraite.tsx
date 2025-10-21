import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import PartieDroiteTraite from "../../composants/pages/requetesConsulaire/traite/PartieDroiteTraite";
import PartieGaucheTraite from "../../composants/pages/requetesConsulaire/traite/PartieGaucheTraite";
import useFetchApi from "../../hooks/api/FetchApiHook";
import LiensRECE from "../../router/LiensRECE";
import AfficherMessage from "../../utils/AfficherMessage";

const PageRequeteTranscriptionTraite: React.FC = () => {
  const { idRequeteParam } = useParams();
  const [requete, setRequete] = useState<IRequeteCreationTranscription | null>(null);
  const { appelApi: getDetailRequete, enAttenteDeReponseApi: enAttenteDetailRequete } = useFetchApi(CONFIG_GET_DETAIL_REQUETE, true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!idRequeteParam) {
      navigate(LiensRECE.retourArriere(), { replace: true });

      return;
    }

    getDetailRequete({
      parametres: {
        path: {
          idRequete: idRequeteParam
        },
        query: {
          isConsultationHistoriqueAction: true
        }
      },
      apresSucces: data => {
        setRequete(mappingRequeteCreation(data) as IRequeteCreationTranscription);
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération de la requête", { erreurs });
        navigate(-1);
      }
    });
  }, []);

  return (
    <div className="mt-4 flex gap-8">
      {enAttenteDetailRequete && <PageChargeur />}

      {requete && (
        <>
          <PartieGaucheTraite requete={requete} />
          <PartieDroiteTraite idActe={requete.titulaires?.[0].suiviDossiers?.[0].idActe} />
        </>
      )}
    </div>
  );
};

export default PageRequeteTranscriptionTraite;
