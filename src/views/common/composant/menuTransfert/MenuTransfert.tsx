import { Menu, MenuItem } from "@material-ui/core";
import { AssignmentInd } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { SousTypeRequete } from "../../../../model/requete/enum/SousTypeRequete";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import { IActionOption } from "../../../../model/requete/IActionOption";
import { IProvenanceRequete } from "../../../../model/requete/IProvenanceRequete";
import {
  receUrl,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_INFORMATION
} from "../../../router/ReceUrls";
import {
  TransfertParams,
  useTransfertApi
} from "../../hook/requete/TransfertHook";
import { FeatureFlag } from "../../util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../util/featureFlag/gestionnaireFeatureFlag";
import { Option } from "../../util/Type";
import { getLibelle } from "../../util/Utils";
import { OperationEnCours } from "../../widget/attente/OperationEnCours";
import { Bouton } from "../../widget/boutonAntiDoubleSubmit/Bouton";
import { GroupeBouton } from "../../widget/menu/GroupeBouton";
import {
  listeEntiteToOptions,
  listeUtilisateursToOptionsBis,
  onValidateAgent,
  onValidateService,
  resetDoubleSubmit
} from "./MenuTransfertUtil";
import { TransfertPopin } from "./TransfertPopin";

const INDEX_ACTION_TRANSFERT_SERVICE = 0;
const INDEX_ACTION_TRANSFERT_OFFICIER = 1;
const INDEX_ACTION_TRANSFERT_ABANDON = 2;

export interface IMenuTransfertProps {
  idRequete: string;
  typeRequete: TypeRequete;
  idUtilisateurRequete: string;
  sousTypeRequete: SousTypeRequete;
  provenance?: IProvenanceRequete;
  menuFermer?: boolean;
  disabled?: boolean;
  estTransfert: boolean;
  icone?: boolean;
  pasAbandon?: boolean;
  rafraichirParent?: () => void;
}

export const MenuTransfert: React.FC<IMenuTransfertProps> = props => {
  const history = useHistory();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const refReponseTransfertOptions0 = useRef(null);
  const [options, setOptions] = useState<IActionOption[]>([]);

  /* Gestion des options */
  const reponseSansDelivranceCSOptions: IActionOption[] = [
    {
      value: INDEX_ACTION_TRANSFERT_SERVICE,
      label: getLibelle("À un service"),
      ref: refReponseTransfertOptions0
    },
    {
      value: INDEX_ACTION_TRANSFERT_OFFICIER,
      label: getLibelle("À un officier de l'état civil"),
      ref: refReponseTransfertOptions0
    }
  ];

  useEffect(() => {
    const opts = reponseSansDelivranceCSOptions;
    if (
      props.typeRequete === TypeRequete.DELIVRANCE &&
      gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
      !props.pasAbandon
    ) {
      opts.push({
        value: INDEX_ACTION_TRANSFERT_ABANDON,
        label: getLibelle("Abandon traitement"),
        ref: refReponseTransfertOptions0
      });
    }
    setOptions(opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.typeRequete]);

  const handleTransfertMenu = async (indexMenu: number, e: any) => {
    if (e) {
      e.stopPropagation();
    }
    switch (indexMenu) {
      case INDEX_ACTION_TRANSFERT_SERVICE:
        setServicePopinOpen(true);
        break;
      case INDEX_ACTION_TRANSFERT_OFFICIER:
        setAgentPopinOpen(true);
        break;
      /* TODO US 572
          case INDEX_ACTION_TRANSFERT_ABANDON:
            break;*/
    }
  };

  /* Gestion du Menu */
  const [menuReponsesProposees, setMenuReponsesProposees] =
    React.useState<null | HTMLElement>(null);

  const handleClickBoutonReponse = (e: any) => {
    if (e) {
      e.stopPropagation();
    }
    setMenuReponsesProposees(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuReponsesProposees(null);
  };

  /* Gestion des pop-in de transfère */
  const [servicePopinOpen, setServicePopinOpen] = useState<boolean>(false);
  const [agentPopinOpen, setAgentPopinOpen] = useState<boolean>(false);
  const [param, setParam] = useState<TransfertParams>();

  const onCloseService = () => {
    setServicePopinOpen(false);
    resetDoubleSubmit(reponseSansDelivranceCSOptions);
  };
  const onCloseAgent = () => {
    setAgentPopinOpen(false);
    resetDoubleSubmit(reponseSansDelivranceCSOptions);
  };

  const idAction = useTransfertApi(param);

  useEffect(() => {
    if (idAction) {
      setOperationEnCours(false);
      if (props.estTransfert) {
        if (props.typeRequete === TypeRequete.DELIVRANCE) {
          receUrl.replaceUrl(history, URL_MES_REQUETES_DELIVRANCE);
        } else {
          receUrl.replaceUrl(history, URL_MES_REQUETES_INFORMATION);
        }
      } else if (props.rafraichirParent) {
        props.rafraichirParent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAction]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      {props.menuFermer ? (
        <div>
          {props.icone ? (
            <span title={getLibelle("Attribuer requête")}>
              <AssignmentInd onClick={e => handleClickBoutonReponse(e)} />
            </span>
          ) : (
            <Bouton
              disabled={props.disabled}
              onClick={e => handleClickBoutonReponse(e)}
            >
              {getLibelle("Transférer")}
            </Bouton>
          )}

          <Menu
            className="Menu"
            anchorEl={menuReponsesProposees}
            keepMounted
            open={Boolean(menuReponsesProposees)}
            onClose={handleCloseMenu}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            MenuListProps={{ onMouseLeave: handleCloseMenu }}
          >
            {options.map((action: IActionOption) => {
              return (
                <MenuItem
                  onClick={e => handleTransfertMenu(action.value, e)}
                  key={`action${action.value}`}
                >
                  {action.label}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      ) : (
        <GroupeBouton
          titre={"Transférer"}
          listeActions={options}
          onSelect={handleTransfertMenu}
        />
      )}

      <TransfertPopin
        open={servicePopinOpen}
        onClose={onCloseService}
        onValidate={(entite?: Option) =>
          onValidateService(
            setOperationEnCours,
            setParam,
            props,
            setServicePopinOpen,
            entite
          )
        }
        options={listeEntiteToOptions()}
        titre={`${props.estTransfert ? "Transfert" : "Attribuer"} à un service`}
      ></TransfertPopin>
      <TransfertPopin
        open={agentPopinOpen}
        onClose={onCloseAgent}
        onValidate={(agent?: Option) =>
          onValidateAgent(
            setParam,
            props,
            setAgentPopinOpen,
            setOperationEnCours,
            agent
          )
        }
        options={listeUtilisateursToOptionsBis(
          props.typeRequete,
          props.sousTypeRequete,
          props.idUtilisateurRequete,
          props.estTransfert
        )}
        titre={`${
          props.estTransfert ? "Transfert" : "Attribuer"
        } à un officier de l'état civil`}
      ></TransfertPopin>
    </>
  );
};
