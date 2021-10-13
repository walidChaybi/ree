import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../model/agent/IOfficier";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { storeRece } from "../../../common/util/storeRece";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../common/widget/Text";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import "./scss/BoutonPrendreEnCharge.scss";
interface BoutonModifierTraitementProps {
  requete: TRequete;
  dataHistory: any;
}

export const BoutonModifierTraitement: React.FC<BoutonModifierTraitementProps> =
  props => {
    const requeteDelivrance = props.requete as IRequeteDelivrance;
    const history = useHistory();
    const [estDisabled, setEstDisabled] = useState(true);

    const [params, setParams] =
      useState<CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined>();

    const setActionEtUpdateStatut = () => {
      setParams({
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        libelleAction: getLibelle("Revue du traitement"),
        urlCourante: getUrlWithParam(
          history.location.pathname,
          props.requete.id
        ),
        requete: mappingRequeteDelivranceToRequeteTableau(
          props.requete as IRequeteDelivrance
        ),
        dataRequetes: [],
        pasDeTraitementAuto: true
      });
    };

    useCreationActionMiseAjourStatutEtRmcAuto(params);

    const estAValider =
      props.requete.statutCourant.statut === StatutRequete.A_VALIDER;

    const estASigner =
      props.requete.statutCourant.statut === StatutRequete.A_SIGNER;

    const mAppartient =
      props.requete.idUtilisateur ===
      storeRece.utilisateurCourant?.idUtilisateur;

    if (
      (estAValider || estASigner) &&
      mAppartient &&
      provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
        requeteDelivrance.provenanceRequete.provenance.libelle
      ) &&
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
          title={getLibelle(
            "Retour à la prise en charge de la requête, les documents constitués seront supprimés"
          )}
        >
          {getLibelle("Modifier le traitement")}
        </BoutonOperationEnCours>
      </>
    );
  };
