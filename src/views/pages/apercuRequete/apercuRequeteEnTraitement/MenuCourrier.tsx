import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../model/requete/v2/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { getUrlWithoutIdParam } from "../../../common/util/route/routeUtil";
import {
  IActionOption,
  MenuAction
} from "../../../common/widget/menu/MenuAction";
import { getLibelle } from "../../../common/widget/Text";
import { PATH_APERCU_COURRIER_ACCOMPAGNEMENT } from "../../../router/ReceUrls";
import { IActionProps } from "../apercuRequeteEnpriseEnCharge/contenu/ChoixAction";

const INDEX_MODIFIER_COURRIER = 0;
const INDEX_AFFICHER_EC = 1;
const INDEX_AFFICHER_EC_COMPLEMENTAIRE = 2;
const INDEX_OUVRIR_ACTE = 3;

const NB_DOCUMENTS_GENERES_2 = 2;

export const MenuCourrier: React.FC<IActionProps> = props => {
  const history = useHistory();
  const refAction0 = useRef(null);

  const [listeActions, setListeActions] = useState<IActionOption[]>([
    {
      value: INDEX_MODIFIER_COURRIER,
      label: getLibelle("Modifier le courrier"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refAction0
    }
  ]);

  useEffect(() => {
    const requete = props.requete as IRequeteDelivrance;
    const temp = listeActions;
    if (estReponseAvecDelivrance(requete)) {
      temp.push({
        value: INDEX_AFFICHER_EC,
        label: getLibelle("Afficher l'extrait/copie"),
        sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
        ref: refAction0
      });
      temp.push({
        value: INDEX_OUVRIR_ACTE,
        label: getLibelle("Ouvrir l'acte"),
        sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
        ref: refAction0
      });
      if (requete.documentsReponses.length > NB_DOCUMENTS_GENERES_2) {
        temp.push({
          value: INDEX_AFFICHER_EC_COMPLEMENTAIRE,
          label: getLibelle("Afficher le document E/C complémentaire"),
          sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
          ref: refAction0
        });
      }
      setListeActions(temp);
    }
  }, [listeActions, props.requete]);

  const handleAction = (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_MODIFIER_COURRIER:
        history.push(
          `${getUrlWithoutIdParam(
            history.location.pathname
          )}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/${props.requete.id}`
        );
        break;
      // TODO
      case INDEX_AFFICHER_EC:
      case INDEX_AFFICHER_EC_COMPLEMENTAIRE:
      case INDEX_OUVRIR_ACTE:
        break;
    }
  };

  return (
    <MenuAction
      deplierEnBas={true}
      listeActions={listeActions}
      onSelect={handleAction}
      titre="Actions"
      className="MenuCourrier"
      widthMenuItem="13rem"
    ></MenuAction>
  );
};

const estReponseAvecDelivrance = (requete: IRequeteDelivrance) => {
  if (
    requete.choixDelivrance ===
      ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC ||
    requete.choixDelivrance === ChoixDelivrance.REP_SANS_DEL_EC_DIVERS ||
    requete.choixDelivrance === ChoixDelivrance.REP_SANS_DEL_EC_DIVERS
  ) {
    return false;
  } else return true;
};
