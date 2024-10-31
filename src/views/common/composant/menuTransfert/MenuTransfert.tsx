import { RECEContextData } from "@core/contexts/RECEContext";
import {
  TransfertUnitaireParams,
  useTransfertApi
} from "@hook/requete/TransfertHook";
import { IActionOption } from "@model/requete/IActionOption";
import { IProvenanceRequete } from "@model/requete/IProvenanceRequete";
import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { URL_MES_REQUETES_DELIVRANCE, URL_MES_REQUETES_INFORMATION } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listeServicesToOptions,
  listeUtilisateursToOptionsBis,
  onValidateAgent,
  onValidateService,
  reinitialiserOnClick
} from "./MenuTransfertUtil";
import { ITransfertPopinForm, TransfertPopin } from "./TransfertPopin";

const INDEX_ACTION_TRANSFERT_SERVICE = 0;
const INDEX_ACTION_TRANSFERT_OFFICIER = 1;

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
  rafraichirParent?: () => void;
}

export const MenuTransfert: React.FC<IMenuTransfertProps> = props => {
  const navigate = useNavigate();
  const refs = useRef([]);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [options, setOptions] = useState<IActionOption[]>([]);

  /* Gestion des options */
  const reponseSansDelivranceCSOptions: IActionOption[] = [
    {
      value: INDEX_ACTION_TRANSFERT_SERVICE,
      label: "À un service"
    },
    {
      value: INDEX_ACTION_TRANSFERT_OFFICIER,
      label: "À un officier de l'état civil"
    }
  ];

  useEffect(
    () => {
      setOptions(reponseSansDelivranceCSOptions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.typeRequete]
  );

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
    }
  };

  /* Gestion du Menu */
  const [menuReponsesProposees, setMenuReponsesProposees] = React.useState<null | HTMLElement>(null);

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
  const [param, setParam] = useState<TransfertUnitaireParams>();

  const { utilisateurs, services, utilisateurConnecte } = useContext(RECEContextData);

  const onCloseService = () => {
    setServicePopinOpen(false);
    reinitialiserOnClick(refs);
  };
  const onCloseAgent = () => {
    setAgentPopinOpen(false);
    reinitialiserOnClick(refs);
  };

  const idAction = useTransfertApi(param);

  useEffect(() => {
    if (idAction) {
      setOperationEnCours(false);
      if (props.estTransfert) {
        if (props.typeRequete === TypeRequete.DELIVRANCE) {
          replaceUrl(navigate, URL_MES_REQUETES_DELIVRANCE);
        } else {
          replaceUrl(navigate, URL_MES_REQUETES_INFORMATION);
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
        visible={operationEnCours || !utilisateurs || !services || !utilisateurConnecte}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      {props.menuFermer ? (
        <div>
          {props.icone ? (
            <span title={"Attribuer requête"}>
              <AssignmentInd onClick={e => handleClickBoutonReponse(e)} />
            </span>
          ) : (
            <BoutonDoubleSubmit disabled={props.disabled} onClick={e => handleClickBoutonReponse(e)}>
              {"Transférer"}
            </BoutonDoubleSubmit>
          )}

          <Menu
            className="Menu"
            anchorEl={menuReponsesProposees}
            keepMounted
            open={Boolean(menuReponsesProposees)}
            onClose={handleCloseMenu}
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
                <MenuItem onClick={e => handleTransfertMenu(action.value, e)} key={`action${action.value}`}>
                  {action.label}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      ) : (
        <GroupeBouton titre={"Transférer"} listeActions={options} onSelect={handleTransfertMenu} refs={refs} />
      )}

      <TransfertPopin
        open={servicePopinOpen}
        onClose={onCloseService}
        onValidate={(valeurs: ITransfertPopinForm) =>
          onValidateService(setOperationEnCours, setParam, props, setServicePopinOpen, valeurs.optionChoisie)
        }
        options={listeServicesToOptions(services)}
        titre={`${props.estTransfert ? "Transfert" : "Attribuer"} à un service`}
      ></TransfertPopin>
      <TransfertPopin
        open={agentPopinOpen}
        onClose={onCloseAgent}
        onValidate={(valeurs: ITransfertPopinForm) =>
          onValidateAgent(setParam, props, setAgentPopinOpen, setOperationEnCours, utilisateurs, valeurs.optionChoisie)
        }
        options={listeUtilisateursToOptionsBis(
          props.typeRequete,
          props.sousTypeRequete,
          utilisateurConnecte,
          props.estTransfert,
          utilisateurs
        )}
        titre={`${props.estTransfert ? "Transfert" : "Attribuer"} à un officier de l'état civil`}
      ></TransfertPopin>
    </>
  );
};
