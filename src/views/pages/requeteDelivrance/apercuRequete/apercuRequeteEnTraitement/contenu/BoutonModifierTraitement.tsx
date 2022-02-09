import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../../../model/agent/IOfficier";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../../../common/hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { getUrlWithParam } from "../../../../../common/util/route/routeUtil";
import { storeRece } from "../../../../../common/util/storeRece";
import { getLibelle } from "../../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../../common/widget/attente/BoutonOperationEnCours";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";

interface BoutonModifierTraitementProps {
  requete: IRequeteDelivrance;
  dataHistory: any;
}

export const BoutonModifierTraitement: React.FC<BoutonModifierTraitementProps> = props => {
  const requeteDelivrance = props.requete;
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);

  const [params, setParams] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setParams({
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      libelleAction: getLibelle("Revue du traitement"),
      urlCourante: getUrlWithParam(history.location.pathname, props.requete.id),
      requete: mappingRequeteDelivranceToRequeteTableau(props.requete),
      pasDeTraitementAuto: true
    });
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  const estAValider =
    props.requete.statutCourant.statut === StatutRequete.A_VALIDER;

  const estASigner =
    props.requete.statutCourant.statut === StatutRequete.A_SIGNER;

  const mAppartient =
    props.requete.idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;

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
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      estDesactive={estDisabled}
      title={getLibelle(
        "Retour à la prise en charge de la requête, les documents constitués seront supprimés"
      )}
    >
      {getLibelle("Modifier le traitement")}
    </BoutonOperationEnCours>
  );
};
