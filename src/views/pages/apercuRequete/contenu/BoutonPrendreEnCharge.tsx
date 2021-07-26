import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Droit } from "../../../../model/Droit";
import { officierHabiliterPourLeDroit } from "../../../../model/IOfficierSSOApi";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { storeRece } from "../../../common/util/storeRece";
import { getLibelle } from "../../../common/widget/Text";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import "./scss/BoutonPrendreEnCharge.scss";

interface BoutonPrendreEnChargeProps {
  requete: TRequete;
}

export const BoutonPrendreEnCharge: React.FC<BoutonPrendreEnChargeProps> = props => {
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);

  const [params, setParams] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setParams({
      requete: mapRequeteRmcAuto(props.requete as IRequeteDelivrance),
      dataRequetes: [],
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      urlCourante: getUrlWithParam(history.location.pathname, props.requete.id)
    });
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  const estATraiterOuATransferee =
    props.requete.statutCourant.statut === StatutRequete.A_TRAITER ||
    props.requete.statutCourant.statut === StatutRequete.TRANSFEREE;

  const mAppartientOuAppartientAPersonne =
    !props.requete.idUtilisateur ||
    props.requete.idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;

  const comedecDroitDelivrerCOMEDECouDroitDelivrer = aDroitPrendreEnCharge(
    props.requete as IRequeteDelivrance
  );

  const appartientAMonServiceMereServiceOuFillesServices =
    storeRece.utilisateurCourant?.entite?.idEntite === props.requete.idEntite ||
    storeRece.utilisateurCourant?.entitesFilles?.some(
      el => el.idEntite === props.requete.idEntite
    ) ||
    storeRece.utilisateurCourant?.entite?.hierarchieEntite?.some(
      el => el.entiteMere.idEntite === props.requete.idEntite
    );

  if (
    estATraiterOuATransferee &&
    mAppartientOuAppartientAPersonne &&
    comedecDroitDelivrerCOMEDECouDroitDelivrer &&
    appartientAMonServiceMereServiceOuFillesServices &&
    estDisabled
  ) {
    setEstDisabled(false);
  }

  return (
    <button
      className="BoutonPriseEnCharge"
      type="button"
      disabled={estDisabled}
      onClick={setActionEtUpdateStatut}
    >
      {getLibelle("Prendre en charge")}
    </button>
  );
};

const mapRequeteRmcAuto = (requete: IRequeteDelivrance): IRequeteTableau => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  return mappingRequeteDelivranceToRequeteTableau(requete);
};

const aDroitPrendreEnCharge = (requete: IRequeteDelivrance) => {
  return (
    (requete?.provenanceRequete?.provenance === Provenance.COMEDEC &&
      officierHabiliterPourLeDroit(Droit.DELIVRER_COMEDEC)) ||
    (requete?.provenanceRequete?.provenance !== Provenance.COMEDEC &&
      officierHabiliterPourLeDroit(Droit.DELIVRER))
  );
};
