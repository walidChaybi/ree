import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { utilisateurADroit } from "../../../../../../model/agent/IUtilisateur";
import { IReponseSansDelivranceCSMariageComposition } from "../../../../../../model/composition/IReponseSansDelivranceCSMariageComposition";
import { Droit } from "../../../../../../model/Droit";
import { SousTypeDelivrance } from "../../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IActionOption } from "../../../../../../model/requete/v2/IActionOption";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import {
  TransfertParams,
  useTransfertApi
} from "../../../../../common/hook/v2/requete/TransfertHook";
import { filtrerListeActions } from "../../../../../common/util/RequetesUtils";
import { getUrlWithParam } from "../../../../../common/util/route/routeUtil";
import { storeRece } from "../../../../../common/util/storeRece";
import { Option, Options } from "../../../../../common/util/Type";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import { GroupeBouton } from "../../../../../common/widget/menu/GroupeBouton";
import { TransfertPopin } from "../../../../../common/widget/menu/TransfertPopin";
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

  const [servicePopinOpen, setServicePopinOpen] = useState<boolean>(false);
  const [agentPopinOpen, setAgentPopinOpen] = useState<boolean>(false);
  const [param, setParam] = useState<TransfertParams>({});

  const INDEX_ACTION_TRANSFERT_SERVICE = 0;
  const INDEX_ACTION_TRANSFERT_OFFICIER = 1;
  const INDEX_ACTION_TRANSFERT_ABANDON = 2;

  const onCloseService = () => {
    setServicePopinOpen(false);
  };
  const onCloseAgent = () => {
    setAgentPopinOpen(false);
  };

  const onValidateService = (entite: Option) => {
    setParam({
      idRequete: props.requete.id,
      idEntite: entite.value,
      idUtilisateur: "",
      statutRequete: StatutRequete.TRANSFEREE,
      libelleAction: `Requête attribuée à ${entite.str}`
    });
    setServicePopinOpen(false);
  };
  const onValidateAgent = (agent: Option) => {
    setParam({
      idRequete: props.requete.id,
      idEntite: storeRece.listeUtilisateurs.find(
        utilisateur => utilisateur.idUtilisateur === agent.value
      )?.entite?.idEntite,
      idUtilisateur: agent.value,
      statutRequete: StatutRequete.TRANSFEREE,
      libelleAction: `Requête attribuée à ${agent.str}`
    });
    setAgentPopinOpen(false);
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
        setServicePopinOpen(true);
        break;
      case INDEX_ACTION_TRANSFERT_OFFICIER:
        setAgentPopinOpen(true);
        break;
      /* TODO
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
      <TransfertPopin
        open={servicePopinOpen}
        onClose={onCloseService}
        onValidate={onValidateService}
        options={listeEntiteToOptions()}
        titre="Transfert à un service"
      ></TransfertPopin>
      <TransfertPopin
        open={agentPopinOpen}
        onClose={onCloseAgent}
        onValidate={onValidateAgent}
        options={listeUtilisateursToOptions(
          props.requete as IRequeteDelivrance
        )}
        titre="Transfert à un Officier d'État Civil"
      ></TransfertPopin>
    </>
  );
};

function listeEntiteToOptions(): Options {
  return storeRece.listeEntite
    .filter(entite => entite.estDansSCEC)
    .map(entite => {
      return { value: entite.idEntite, str: entite.libelleEntite };
    });
}

function listeUtilisateursToOptions(requete: IRequeteDelivrance): Options {
  return storeRece.listeUtilisateurs
    .filter(utilisateur => {
      const estDuSCEC = utilisateur.entite?.estDansSCEC;
      const aDroit =
        requete.sousType === SousTypeDelivrance.RDDCO
          ? utilisateurADroit(Droit.DELIVRER_COMEDEC, utilisateur)
          : utilisateurADroit(Droit.DELIVRER, utilisateur);
      return estDuSCEC && aDroit;
    })
    .map(utilisateur => {
      return {
        value: utilisateur.idUtilisateur,
        str: `${utilisateur.prenom} ${utilisateur.nom}`
      };
    });
}
