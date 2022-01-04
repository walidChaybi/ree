import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../../../model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../../../model/requete/IActionOption";
import { DoubleSubmitUtil } from "../../../../../../common/util/DoubleSubmitUtil";
import { filtrerListeActions } from "../../../../../../common/util/RequetesUtils";
import { getUrlWithoutIdParam } from "../../../../../../common/util/route/routeUtil";
import { getLibelle } from "../../../../../../common/util/Utils";
import { GroupeBouton } from "../../../../../../common/widget/menu/GroupeBouton";
import { PATH_APERCU_COURRIER } from "../../../../../../router/ReceUrls";
import { IgnoreRequetePopin } from "../IgnoreRequetePopin";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "./hook/UpdateChoixDelivranceHook";

const INDEX_REQUETE_INCOMPLETE = 0;
const INDEX_ACTE_NON_DETENU = 1;
const INDEX_DIVERS = 2;
const INDEX_IGNORER_REQUETE = 3;

export const MenuReponseSansDelivrance: React.FC<IChoixActionDelivranceProps> = props => {
  const history = useHistory();
  const refRepondreSansDelivranceOptions0 = useRef(null);

  const [
    paramUpdateChoixDelivrance,
    setParamUpdateChoixDelivrance
  ] = useState<UpdateChoixDelivranceProps>();
  const [popinOuverte, setPopinOuverte] = useState<boolean>(false);

  const updateChoixDelivranceResultat = useUpdateChoixDelivrance(
    paramUpdateChoixDelivrance
  );

  useEffect(() => {
    if (updateChoixDelivranceResultat?.idRequete) {
      const url = `${getUrlWithoutIdParam(
        history.location.pathname
      )}/${PATH_APERCU_COURRIER}/${updateChoixDelivranceResultat.idRequete}`;

      history.push(url, props.actes?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChoixDelivranceResultat]);

  const repondreSansDelivranceOptions: IActionOption[] = [
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
      label: getLibelle("Ignorer la requête"),
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
          requete: props.requete
        });
        break;
      case INDEX_IGNORER_REQUETE:
        setPopinOuverte(true);
        break;
    }
  };

  const resetDoubleSubmit = () => {
    listeActions.forEach(el => {
      DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
    });
  };

  const listeActions = filtrerListeActions(
    props.requete,
    repondreSansDelivranceOptions
  );

  return (
    <>
      <GroupeBouton
        titre={getLibelle("Réponse sans délivrance")}
        listeActions={listeActions}
        onSelect={handleReponseSansDelivranceMenu}
      />
      <IgnoreRequetePopin
        isOpen={popinOuverte}
        onClosePopin={() => {
          setPopinOuverte(false);
          resetDoubleSubmit();
        }}
        requete={props.requete}
      />
    </>
  );
};
