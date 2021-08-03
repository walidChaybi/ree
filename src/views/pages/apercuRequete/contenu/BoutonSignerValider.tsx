import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../common/hook/v2/requete/ActionHook";
import { aDroitPrendreEnCharge } from "../../../common/util/RequetesUtils";
import { storeRece } from "../../../common/util/storeRece";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../common/widget/Text";
import { replaceUrl } from "../../../router/ReceUrls";
import "./scss/BoutonPrendreEnCharge.scss";
interface BoutonSignerValiderProps {
  requete: TRequete;
}

export const BoutonSignerValider: React.FC<BoutonSignerValiderProps> =
  props => {
    const history = useHistory();
    const [estDisabled, setEstDisabled] = useState(true);

    const [params, setParams] =
      useState<CreationActionEtMiseAjourStatutParams | undefined>();

    let futurStatut: StatutRequete;
    switch (props.requete.canal) {
      case TypeCanal.COURRIER:
        futurStatut = StatutRequete.TRAITE_A_IMPRIMER;
        break;
      case TypeCanal.INTERNET:
        futurStatut = StatutRequete.TRAITE_A_DELIVRER_DEMAT;
        break;
      default:
        futurStatut = StatutRequete.TRAITE_A_DELIVRER_DEMAT;
    }

    const setActionEtUpdateStatut = () => {
      setParams({
        requeteId: props.requete.id,
        libelleAction: futurStatut.libelle,
        statutRequete: futurStatut
      });
    };

    const idAction = usePostCreationActionEtMiseAjourStatutApi(params);

    useEffect(() => {
      if (idAction) {
        replaceUrl(history, storeRece.retourUrl);
      }
    }, [idAction, history]);

    const estAValider =
      props.requete.statutCourant.statut === StatutRequete.A_VALIDER;

    const mAppartient =
      props.requete.idUtilisateur ===
      storeRece.utilisateurCourant?.idUtilisateur;

    if (
      estAValider &&
      mAppartient &&
      aDroitPrendreEnCharge(props.requete as IRequeteDelivrance) &&
      estDisabled
    ) {
      setEstDisabled(false);
    }

    return (
      <>
        <BoutonOperationEnCours
          onClick={setActionEtUpdateStatut}
          class="BoutonPriseEnCharge"
          estDesactive={estDisabled}
        >
          {getLibelle("Valider et terminer")}
        </BoutonOperationEnCours>
      </>
    );
  };
