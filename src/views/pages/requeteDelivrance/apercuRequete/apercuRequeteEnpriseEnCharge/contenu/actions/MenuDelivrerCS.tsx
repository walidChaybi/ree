import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { SousTypeDelivrance } from "../../../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../../../model/requete/v2/IActionOption";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { filtrerListeActions } from "../../../../../../common/util/RequetesUtils";
import { supprimerNullEtUndefinedDuTableau } from "../../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../../common/widget/attente/OperationEnCours";
import { GroupeBouton } from "../../../../../../common/widget/menu/GroupeBouton";
import { getLibelle } from "../../../../../../common/widget/Text";
import { receUrl } from "../../../../../../router/ReceUrls";
import { mappingRequeteDelivranceToRequeteTableau } from "../../../mapping/ReqDelivranceToReqTableau";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import { useDelivrerCertificatSituationHook } from "./hook/DelivrerCertificatSituationHook";

const INDEX_ACTION_CERTIFICAT_SITUATION = 0;

export const MenuDelivrerCS: React.FC<IChoixActionDelivranceProps> = props => {
  const history = useHistory();
  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] = useState<
    IResultatRMCInscription[] | undefined
  >();

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    mappingRequeteDelivranceToRequeteTableau(props.requete),
    inscriptions,
    actes
  );

  const delivrerOptions: IActionOption[] = getOptionsMenuDelivrer(
    refDelivrerOptions0
  );

  const handleDelivrerMenu = () => {
    setOperationEnCours(true);
    setInscriptions(
      props.inscriptions
        ? supprimerNullEtUndefinedDuTableau(props.inscriptions)
        : []
    );
    setActes(props.actes ? supprimerNullEtUndefinedDuTableau(props.actes) : []);
  };

  /////////////////////////////////////
  // Certificat de situation
  /////////////////////////////////////
  useEffect(() => {
    if (resultDeliverCertificatSituation) {
      setOperationEnCours(false);
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDeliverCertificatSituation, history]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={getLibelle("Délivrer")}
        listeActions={filtrerListeActions(props.requete, delivrerOptions)}
        onSelect={handleDelivrerMenu}
      />
    </>
  );
};

function getOptionsMenuDelivrer(
  refDelivrerOptions0: React.MutableRefObject<null>
): IActionOption[] {
  return [
    {
      value: INDEX_ACTION_CERTIFICAT_SITUATION,
      label: getLibelle("Certificat de situation"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refDelivrerOptions0
    }
  ];
}
