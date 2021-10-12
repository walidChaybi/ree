import React, { useRef } from "react";
import { IActionOption } from "../../../../../../model/requete/v2/IActionOption";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { filtrerListeActions } from "../../../../../common/util/RequetesUtils";
import { GroupeBouton } from "../../../../../common/widget/menu/GroupeBouton";
import { getLibelle } from "../../../../../common/widget/Text";
import { IActionProps } from "./ChoixAction";

const INDEX_ACTION_METTRE_A_JOUR = 0;
const INDEX_ACTION_REDIGER_UNE_REPONSE = 1;

export const MenuAutre: React.FC<IActionProps> = props => {
  const refOptions0 = useRef(null);

  const reponseAutreOptions: IActionOption[] = [
    {
      value: INDEX_ACTION_METTRE_A_JOUR,
      label: getLibelle("Mettre à jour"),
      ref: refOptions0
    },
    {
      value: INDEX_ACTION_REDIGER_UNE_REPONSE,
      label: getLibelle("Rédiger une réponse à l'usager"),
      ref: refOptions0
    }
  ];

  const handleRepreponseAutreOptions = async (indexMenu: number) => {
    // TODO US pas encore réalisées
    // switch (indexMenu) {
    //   case INDEX_ACTION_METTRE_A_JOUR:
    //   case INDEX_ACTION_REDIGER_UNE_REPONSE:
    //             break;
    //   default:
    //     break;
    // }
  };

  return (
    <>
      <GroupeBouton
        titre={"Autre"}
        listeActions={filtrerListeActions(
          props.requete as IRequeteDelivrance,
          reponseAutreOptions
        )}
        onSelect={handleRepreponseAutreOptions}
      />
    </>
  );
};
