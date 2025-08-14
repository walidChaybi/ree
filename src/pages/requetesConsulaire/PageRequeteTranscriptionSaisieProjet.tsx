import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PartieDroiteSaisieProjet from "../../composants/pages/requetesConsulaire/saisieProjet/PartieDroiteSaisieProjet";
import PartieGaucheSaisieProjet from "../../composants/pages/requetesConsulaire/saisieProjet/PartieGaucheSaisieProjet";
import SaisieProjetActeTranscritContextProvider from "../../contexts/SaisieProjetActeTranscritContextProvider";
import LiensRECE from "../../router/LiensRECE";

const PageRequeteTranscriptionSaisieProjet: React.FC = () => {
  const { idRequeteParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const estModeConsultation = useMemo<boolean>(() => LiensRECE.estPageConsultation(), [location.pathname]);

  useEffect(() => {
    if (!idRequeteParam) {
      navigate(LiensRECE.retourArriere(), { replace: true });
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
