import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../model/agent/IOfficier";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../common/hook/v2/requete/ActionHook";
import { storeRece } from "../../../common/util/storeRece";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { getLibelle } from "../../../common/widget/Text";
import { receUrl } from "../../../router/ReceUrls";
import "./scss/BoutonPrendreEnCharge.scss";
interface BoutonValiderTerminerProps {
  requete: IRequeteDelivrance;
}

export const BoutonValiderTerminer: React.FC<BoutonValiderTerminerProps> = props => {
  const requeteDelivrance = props.requete;
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);

  const [params, setParams] = useState<
    CreationActionEtMiseAjourStatutParams | undefined
  >();

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
      receUrl.replaceUrl(history, storeRece.retourUrl);
    }
  }, [idAction, history]);

  const estAValider =
    props.requete.statutCourant.statut === StatutRequete.A_VALIDER;

  const mAppartient =
    props.requete.idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;

  if (
    estAValider &&
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
        estDesactive={estDisabled}
      >
        {getLibelle("Valider et terminer")}
      </BoutonOperationEnCours>
    </>
  );
};
