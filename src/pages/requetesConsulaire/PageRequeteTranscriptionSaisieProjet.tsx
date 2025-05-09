import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PartieDroiteSaisieProjet from "../../composants/pages/requetesConsulaire/saisieProjet/PartieDroiteSaisieProjet";
import PartieGaucheSaisieProjet from "../../composants/pages/requetesConsulaire/saisieProjet/PartieGaucheSaisieProjet";
import SaisieProjetActeTranscritContextProvider from "../../contexts/SaisieProjetActeTranscritContextProvider";

const PageRequeteTranscriptionSaisieProjet: React.FC = () => {
  const { idRequeteParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const estModeConsultation = useMemo<boolean>(() => location.pathname.includes(URL_RECHERCHE_REQUETE), [location.pathname]);

  useEffect(() => {
    if (!idRequeteParam) {
      navigate(-1);
    }
  }, []);

  return (
    <div className="mt-4 flex gap-8">
      {idRequeteParam && (
        <SaisieProjetActeTranscritContextProvider
          idRequete={idRequeteParam}
          estModeConsultation={estModeConsultation}
        >
          <PartieGaucheSaisieProjet estModeConsultation={estModeConsultation} />
          <PartieDroiteSaisieProjet />
        </SaisieProjetActeTranscritContextProvider>
      )}
    </div>
  );
};

export default PageRequeteTranscriptionSaisieProjet;
