import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { supprimerNullEtUndefinedDuTableau } from "../../../../common/util/Utils";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import { getLibelle } from "../../../../common/widget/Text";
import { receUrl } from "../../../../router/ReceUrls";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { IActionProps } from "./ChoixAction";
import { useDelivrerCertificatSituationHook } from "./hook/DelivrerCertificatSituationHook";

export const MenuDelivrer: React.FC<IActionProps> = props => {
  const history = useHistory();

  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [acteSelected, setActeSelected] = useState<IResultatRMCActe[]>();
  const [inscriptionSelected, setInscriptionSelected] = useState<
    IResultatRMCInscription[]
  >();

  const delivrerOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle("Certificat de situation"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refDelivrerOptions0
    }
  ];

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    mappingRequeteDelivranceToRequeteTableau(
      props.requete as IRequeteDelivrance
    ),
    inscriptionSelected,
    acteSelected
  );

  const handleDelivrerMenu = async () => {
    setInscriptionSelected(
      props.inscriptionSelected
        ? supprimerNullEtUndefinedDuTableau(props.inscriptionSelected)
        : []
    );
    setActeSelected(
      props.acteSelected
        ? supprimerNullEtUndefinedDuTableau(props.acteSelected)
        : []
    );
    setOperationEnCours(true);
  };

  useEffect(() => {
    if (resultDeliverCertificatSituation) {
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
      <MenuAction
        titre={"Délivrer"}
        listeActions={delivrerOptions}
        onSelect={handleDelivrerMenu}
      />
    </>
  );
};
