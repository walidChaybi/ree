import { GestionnaireNomenclature } from "@api/nomenclature/GestionnaireNomenclature";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { useEffect, useState } from "react";

export const useChargerDonneesApplicatives = () => {
  const [donneesChargees, setDonneesChargees] = useState<boolean>(false);

  useEffect(() => {
    GestionnaireARetraiterDansSaga.init();
    gestionnaireDoubleOuverture.init();
    GestionnaireNomenclature.chargerToutesLesNomenclatures().finally(() =>
      setDonneesChargees(true)
    );
  }, []);

  return { donneesChargees: donneesChargees };
};
