import React, { useRef } from "react";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { filtrerListeActions } from "../../../../common/util/RequetesUtils";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import { getLibelle } from "../../../../common/widget/Text";
import { IActionProps } from "./ChoixAction";

export const MenuReponseSansDelivrance: React.FC<IActionProps> = props => {
  const refRepondreSansDelivranceOptions0 = useRef(null);

  const repondreSansDelivranceOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle("Requête incomplète (117 - 18 - 19)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    },
    {
      value: 1,
      label: getLibelle("Acte non détenu au SCEC (115 - 64 - 24, ...)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    },
    {
      value: 2,
      label: getLibelle("Divers (17, ...)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    },
    {
      value: 3,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refRepondreSansDelivranceOptions0
    }
  ];

  const handleReponseSansDelivranceMenu = async () => {};

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
