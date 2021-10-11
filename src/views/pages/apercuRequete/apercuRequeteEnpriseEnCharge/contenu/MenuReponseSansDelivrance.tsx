import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../model/requete/v2/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { filtrerListeActions } from "../../../../common/util/RequetesUtils";
import { getUrlWithoutIdParam } from "../../../../common/util/route/routeUtil";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import { getLibelle } from "../../../../common/widget/Text";
import { PATH_APERCU_COURRIER } from "../../../../router/ReceUrls";
import { IActionProps } from "./ChoixAction";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "./hook/UpdateChoixDelivranceHook";
import { IgnoreRequetePopin } from "./IgnoreRequetePopin";

const INDEX_REQUETE_INCOMPLETE = 0;
const INDEX_ACTE_NON_DETENU = 1;
const INDEX_DIVERS = 2;
const INDEX_IGNORER_REQUETE = 3;

export const MenuReponseSansDelivrance: React.FC<IActionProps> = props => {
  const history = useHistory();
  const refRepondreSansDelivranceOptions0 = useRef(null);

  const [paramUpdateChoixDelivrance, setParamUpdateChoixDelivrance] =
    useState<UpdateChoixDelivranceProps>();
  const [popinOuverte, setPopinOuverte] = useState<boolean>(false);

  const idRequete = useUpdateChoixDelivrance(paramUpdateChoixDelivrance);

  useEffect(() => {
    if (idRequete) {
      history.push(
        `${getUrlWithoutIdParam(
          history.location.pathname
        )}/${PATH_APERCU_COURRIER}/${idRequete}`
      );
    }
  }, [idRequete, history]);

  interface IChoixDelivrance {
    choixDelivrance?: ChoixDelivrance;
  }

  type ActionOptionAvecChoixDelivrance = IActionOption & IChoixDelivrance;

  const repondreSansDelivranceOptions: ActionOptionAvecChoixDelivrance[] = [
    {
      value: INDEX_REQUETE_INCOMPLETE,
      label: getLibelle("Requête incomplète (117 - 18 - 19)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0,
      choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE
    },
    {
      value: INDEX_ACTE_NON_DETENU,
      label: getLibelle("Acte non détenu au SCEC (115 - 64 - 24, ...)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0,
      choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC
    },
    {
      value: INDEX_DIVERS,
      label: getLibelle("Divers (17, ...)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0,
      choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_DIVERS
    },
    {
      value: INDEX_IGNORER_REQUETE,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [
        SousTypeDelivrance.RDC,
        SousTypeDelivrance.RDAPC,
        SousTypeDelivrance.RDCSC
      ],
      ref: refRepondreSansDelivranceOptions0
    }
  ];

  const handleReponseSansDelivranceMenu = (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_REQUETE_INCOMPLETE:
      case INDEX_ACTE_NON_DETENU:
      case INDEX_DIVERS:
        setParamUpdateChoixDelivrance({
          choixDelivrance:
            repondreSansDelivranceOptions[indexMenu].choixDelivrance,
          requete: props.requete as IRequeteDelivrance
        });
        break;
      case INDEX_IGNORER_REQUETE:
        setPopinOuverte(true);
        break;
    }
  };

  return (
    <>
      <MenuAction
        titre={getLibelle("Réponse sans délivrance")}
        listeActions={filtrerListeActions(
          props.requete as IRequeteDelivrance,
          repondreSansDelivranceOptions
        )}
        onSelect={handleReponseSansDelivranceMenu}
      />
      <IgnoreRequetePopin
        isOpen={popinOuverte}
        onClosePopin={() => setPopinOuverte(false)}
        requete={props.requete}
      />
    </>
  );
};
