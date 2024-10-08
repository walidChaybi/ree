import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { useEffect } from "react";

export const useChargerDonneesApplicatives = () => {
  useEffect(() => {
    GestionnaireARetraiterDansSaga.init();
    gestionnaireDoubleOuverture.init();
  }, []);
};
