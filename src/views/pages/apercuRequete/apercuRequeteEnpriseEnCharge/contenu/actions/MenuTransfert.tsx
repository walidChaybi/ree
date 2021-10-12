import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { IReponseSansDelivranceCSMariageComposition } from "../../../../../../model/composition/IReponseSansDelivranceCSMariageComposition";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IActionOption } from "../../../../../../model/requete/v2/IActionOption";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import {
  TransfertParams,
  useTransfertApi
} from "../../../../../common/hook/v2/requete/TransfertHook";
import { filtrerListeActions } from "../../../../../common/util/RequetesUtils";
import { getUrlWithParam } from "../../../../../common/util/route/routeUtil";
import { Option } from "../../../../../common/util/Type";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import { GroupeBouton } from "../../../../../common/widget/menu/GroupeBouton";
import { TransfertServicePopin } from "../../../../../common/widget/menu/TransfertServicePopin";
import { getLibelle } from "../../../../../common/widget/Text";
import { URL_MES_REQUETES_APERCU_REQUETE } from "../../../../../router/ReceUrls";
import { IActionProps } from "./ChoixAction";

export const MenuTransfert: React.FC<IActionProps> = props => {
  const history = useHistory();

  const refReponseTransfertOptions0 = useRef(null);
  const refReponseTransfertOptions1 = useRef(null);
  const refReponseTransfertOptions2 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  useState<IReponseSansDelivranceCSMariageComposition | undefined>();

  const [popinServiceOpen, setPopinServiceOpen] = useState<boolean>(false);
  const [param, setParam] = useState<TransfertParams>({});

  const INDEX_ACTION_TRANSFERT_SERVICE = 0;
  const INDEX_ACTION_TRANSFERT_OFFICIER = 1;
  const INDEX_ACTION_TRANSFERT_ABANDON = 2;

  const onCloseService = () => {
    setPopinServiceOpen(false);
  };

  const onValidateService = (entite: Option) => {
    setParam({
      idRequete: props.requete.id,
      idEntite: entite.value,
      idUtilisateur: "",
      statutRequete: StatutRequete.TRANSFEREE,
      libelleAction: `Requête attribuée à ${entite.str}`
    });
    setPopinServiceOpen(false);
  };

  const idAction = useTransfertApi(param);

  useEffect(() => {
    if (idAction) {
      history.push(
        getUrlWithParam(URL_MES_REQUETES_APERCU_REQUETE, props.requete.id)
      );
    }
  }, [idAction, history, props.requete.id]);

  const reponseSansDelivranceCSOptions: IActionOption[] = [
    {
      value: INDEX_ACTION_TRANSFERT_SERVICE,
      label: getLibelle("À un service"),
      ref: refReponseTransfertOptions0
    },
    {
      value: INDEX_ACTION_TRANSFERT_OFFICIER,
      label: getLibelle("À un Officier d'État Civil"),
      ref: refReponseTransfertOptions1
    },
    {
      value: INDEX_ACTION_TRANSFERT_ABANDON,
      label: getLibelle("Abandon traitement"),
      ref: refReponseTransfertOptions2
    }
  ];

  const handleTransfertMenu = async (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_ACTION_TRANSFERT_SERVICE:
        setPopinServiceOpen(true);
        break;
      //TODO
      /*case INDEX_ACTION_TRANSFERT_OFFICIER:
        break;
      case INDEX_ACTION_TRANSFERT_ABANDON:
        break;*/
    }
  };

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={"Transférer"}
        listeActions={filtrerListeActions(
          props.requete as IRequeteDelivrance,
          reponseSansDelivranceCSOptions
        )}
        onSelect={handleTransfertMenu}
      />
      <TransfertServicePopin
        open={popinServiceOpen}
        onClose={onCloseService}
        onValidate={onValidateService}
      ></TransfertServicePopin>
    </>
  );
};
