import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import { getLibelle } from "../../../../common/widget/Text";
import { receUrl } from "../../../../router/ReceUrls";
import { useGenerationCertificatSituation } from "../../../rechercheMultiCriteres/autoActesInscriptions/hook/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseDelivrer } from "../../../rechercheMultiCriteres/autoActesInscriptions/hook/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseDelivrer";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { IActionProps } from "./ChoixAction";
import "./scss/ChoixAction.scss";

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

  const resultGenerationCertificatSituation = useGenerationCertificatSituation(
    mappingRequeteDelivranceToRequeteTableau(
      props.requete as IRequeteDelivrance
    ),
    inscriptionSelected,
    acteSelected,
    specificationPhraseDelivrer
  );

  const handleDelivrerMenu = async () => {
    setInscriptionSelected(
      props.inscriptionSelected ? props.inscriptionSelected : []
    );
    setActeSelected(props.acteSelected ? props.acteSelected : []);
    setOperationEnCours(true);
  };

  useEffect(() => {
    if (resultGenerationCertificatSituation) {
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatSituation, history]);

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
