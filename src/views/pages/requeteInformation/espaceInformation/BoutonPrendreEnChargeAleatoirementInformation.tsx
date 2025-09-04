import { HTTP_NOT_FOUND } from "@api/ApiManager";
import CONFIG_GET_REQUETE_INFORMATION_A_PRENDRE_EN_CHARGE from "@api/configurations/requete/information/GetRequeteInformationAPrendreEnChargeConfigApi";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@hook/requete/ActionHook";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_INFORMATION } from "../../../../router/infoPages/InfoPagesEspaceInformation";
import AfficherMessage from "../../../../utils/AfficherMessage";

interface IBoutonPrendreEnChargeAleatoirementInformationProps {
  disabled: boolean;
}

const BoutonPrendreEnChargeAleatoirementInformation: React.FC<IBoutonPrendreEnChargeAleatoirementInformationProps> = ({ disabled }) => {
  const navigate = useNavigate();

  const [miseAJourStatutRequeteParams, setMiseAJourStatutRequeteParams] = useState<ICreationActionEtMiseAjourStatutParams | null>(null);

  const { appelApi: recupererRequeteInformationAleatoire, enAttenteDeReponseApi: operationEnCours } = useFetchApi(
    CONFIG_GET_REQUETE_INFORMATION_A_PRENDRE_EN_CHARGE
  );
  const onClickPrendreEnCharge = useCallback(() => {
    recupererRequeteInformationAleatoire({
      apresSucces: idRequeteInformation =>
        setMiseAJourStatutRequeteParams({
          libelleAction: EStatutRequete.PRISE_EN_CHARGE,
          statutRequete: "PRISE_EN_CHARGE",
          requeteId: idRequeteInformation,
          callback: () => {
            navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_INFORMATION.url, { idRequeteParam: idRequeteInformation }));
          }
        }),

      apresErreur: (erreurs, status) => {
        status === HTTP_NOT_FOUND
          ? AfficherMessage.info("Il n'existe plus de requêtes disponibles à la prise en charge", { fermetureAuto: true })
          : AfficherMessage.erreur("Impossible de prendre en charge une requête suivante", { erreurs });
      }
    });
  }, [recupererRequeteInformationAleatoire]);

  usePostCreationActionEtMiseAjourStatutApi(miseAJourStatutRequeteParams);

  return (
    <BoutonOperationEnCours
      onClick={onClickPrendreEnCharge}
      estDesactive={disabled}
      toileDeFondVisible={operationEnCours}
    >
      {"Prendre en charge requête suivante"}
    </BoutonOperationEnCours>
  );
};

export default WithHabilitation(BoutonPrendreEnChargeAleatoirementInformation, "BoutonPrendreEnChargeAleatoirementInformation");
