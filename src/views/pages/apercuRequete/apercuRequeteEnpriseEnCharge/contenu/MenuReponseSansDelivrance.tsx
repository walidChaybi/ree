import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { filtrerListeActions } from "../../../../common/util/RequetesUtils";
import { getUrlWithoutIdParam } from "../../../../common/util/route/routeUtil";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import { getLibelle } from "../../../../common/widget/Text";
import { PATH_APERCU_COURRIER_ACCOMPAGNEMENT } from "../../../../router/ReceUrls";
import { IActionProps } from "./ChoixAction";

export const MenuReponseSansDelivrance: React.FC<IActionProps> = props => {
  const INDEX_REQUETE_INCOMPLETE = 0;
  const INDEX_ACTE_NON_DETENU = 1;
  const INDEX_DIVERS = 2;
  const INDEX_FIN_TRAITEMENT = 3;

  const history = useHistory();
  const refRepondreSansDelivranceOptions0 = useRef(null);

  const repondreSansDelivranceOptions: IActionOption[] = [
    {
      value: INDEX_REQUETE_INCOMPLETE,
      label: getLibelle("Requête incomplète (117 - 18 - 19)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    },
    {
      value: INDEX_ACTE_NON_DETENU,
      label: getLibelle("Acte non détenu au SCEC (115 - 64 - 24, ...)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    },
    {
      value: INDEX_DIVERS,
      label: getLibelle("Divers (17, ...)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    },
    {
      value: INDEX_FIN_TRAITEMENT,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    }
  ];

  const handleReponseSansDelivranceMenu = async (indexMenu: number) => {
    if (
      (props.requete as IRequeteDelivrance).sousType ===
        SousTypeDelivrance.RDC ||
      (props.requete as IRequeteDelivrance).sousType === SousTypeDelivrance.RDD
    ) {
      switch (indexMenu) {
        case INDEX_REQUETE_INCOMPLETE:
        case INDEX_ACTE_NON_DETENU:
        case INDEX_DIVERS:
        case INDEX_FIN_TRAITEMENT:
          break;
      }
      history.push(
        `${getUrlWithoutIdParam(
          history.location.pathname
        )}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/${props.requete.id}`
      );
    }
  };

  return (
    <MenuAction
      titre={getLibelle("Réponse sans délivrance")}
      listeActions={filtrerListeActions(
        props.requete as IRequeteDelivrance,
        repondreSansDelivranceOptions
      )}
      onSelect={handleReponseSansDelivranceMenu}
    />
  );
};
