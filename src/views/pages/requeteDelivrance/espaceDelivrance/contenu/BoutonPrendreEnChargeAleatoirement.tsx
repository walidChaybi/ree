import { HTTP_NOT_FOUND } from "@api/ApiManager";
import CONFIG_GET_REQUETE_DELIVRANCE_A_PRENDRE_EN_CHARGE from "@api/configurations/requete/delivrance/GetRequeteDelivranceAPrendreEnChargeConfigApi";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@views/common/hook/requete/ActionHook";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import LiensRECE from "../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE } from "../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import AfficherMessage from "../../../../../utils/AfficherMessage";

interface IBoutonPrendreEnChargeAleatoirementProps {
  disabled: boolean;
}

const BoutonPrendreEnChargeAleatoirement: React.FC<IBoutonPrendreEnChargeAleatoirementProps> = ({ disabled }) => {
  const navigate = useNavigate();
  const [miseAJourStatutRequeteEtRedirectionParams, setMiseAJourStatutRequeteEtRedirectionParams] = useState<
    ICreationActionEtMiseAjourStatutParams | undefined
  >();

  const { appelApi: recupererRequeteDelivranceAleatoire, enAttenteDeReponseApi: operationEnCours } = useFetchApi(
    CONFIG_GET_REQUETE_DELIVRANCE_A_PRENDRE_EN_CHARGE
  );
  const onClickPrendreEnCharge = useCallback(() => {
    recupererRequeteDelivranceAleatoire({
      apresSucces: idRequeteDelivrance =>
        setMiseAJourStatutRequeteEtRedirectionParams({
          requeteId: idRequeteDelivrance,
          libelleAction: EStatutRequete.PRISE_EN_CHARGE,
          statutRequete: "PRISE_EN_CHARGE",
          callback: () => {
            navigate(
              LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url, {
                idRequeteParam: idRequeteDelivrance
              })
            );
          }
        }),
      apresErreur: (erreurs, status) => {
        status === HTTP_NOT_FOUND
          ? AfficherMessage.info("Il n'existe plus de requêtes disponibles à la prise en charge", { fermetureAuto: true })
          : AfficherMessage.erreur("Impossible de prendre en charge une requête suivante", { erreurs });
      }
    });
  }, [recupererRequeteDelivranceAleatoire]);

  usePostCreationActionEtMiseAjourStatutApi(miseAJourStatutRequeteEtRedirectionParams);

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

export default WithHabilitation(BoutonPrendreEnChargeAleatoirement, "BoutonPrendreEnChargeAleatoirement");
