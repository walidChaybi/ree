import { Menu, MenuItem } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IUtilisateur,
  utilisateurADroit
} from "../../../../model/agent/IUtilisateur";
import { Droit } from "../../../../model/Droit";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IActionOption } from "../../../../model/requete/v2/IActionOption";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import {
  receUrl,
  URL_MES_REQUETES_APERCU_REQUETE,
  URL_MES_REQUETES_INFORMATION
} from "../../../router/ReceUrls";
import {
  TransfertParams,
  useTransfertApi
} from "../../hook/v2/requete/TransfertHook";
import { DoubleSubmitUtil } from "../../util/DoubleSubmitUtil";
import { getUrlWithParam } from "../../util/route/routeUtil";
import { storeRece } from "../../util/storeRece";
import { Option, Options } from "../../util/Type";
import { OperationEnCours } from "../../widget/attente/OperationEnCours";
import { GroupeBouton } from "../../widget/menu/GroupeBouton";
import { getLibelle } from "../../widget/Text";
import { TransfertPopin } from "./TransfertPopin";

const INDEX_ACTION_TRANSFERT_SERVICE = 0;
const INDEX_ACTION_TRANSFERT_OFFICIER = 1;
const INDEX_ACTION_TRANSFERT_ABANDON = 2;

export interface IMenuTransfertProps {
  requete: TRequete;
  menuFermer?: boolean;
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
      label: getLibelle("À un officier d'état civil"),
      ref: refReponseTransfertOptions0
    }
  ];

  useEffect(() => {
    const opts = reponseSansDelivranceCSOptions;
    if (props.requete.type === TypeRequete.DELIVRANCE) {
      opts.push({
        value: INDEX_ACTION_TRANSFERT_ABANDON,
        label: getLibelle("Abandon traitement"),
        ref: refReponseTransfertOptions0
      });
    }
    setOptions(opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requete]);

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

  const resetDoubleSubmit = () => {
    reponseSansDelivranceCSOptions.forEach(el => {
      DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
    });
  };

  /* Gestion du Menu */
  const [
    menuReponsesProposees,
    setMenuReponsesProposees
  ] = React.useState<null | HTMLElement>(null);

  const handleClickBoutonReponse = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuReponsesProposees(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuReponsesProposees(null);
  };

  /* Gestion des pop-in de transfère */
  const [servicePopinOpen, setServicePopinOpen] = useState<boolean>(false);
  const [agentPopinOpen, setAgentPopinOpen] = useState<boolean>(false);
  const [param, setParam] = useState<TransfertParams>({});

  const onCloseService = () => {
    setServicePopinOpen(false);
    resetDoubleSubmit();
  };
  const onCloseAgent = () => {
    setAgentPopinOpen(false);
    resetDoubleSubmit();
  };

  const onValidateService = (entite: Option | undefined) => {
    if (entite) {
      setParam({
        idRequete: props.requete.id,
        idEntite: entite.value,
        idUtilisateur: "",
        statutRequete: StatutRequete.TRANSFEREE,
        libelleAction: `Requête attribuée à ${entite.str}`
      });
      setServicePopinOpen(false);
    }
  };

  const onValidateAgent = (agent: Option | undefined) => {
    if (agent) {
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
    }
  };

  const idAction = useTransfertApi(param);

  useEffect(() => {
    if (idAction) {
      if (props.requete.type === TypeRequete.DELIVRANCE) {
        history.push(
          getUrlWithParam(URL_MES_REQUETES_APERCU_REQUETE, props.requete.id)
        );
      } else {
        receUrl.replaceUrl(history, URL_MES_REQUETES_INFORMATION);
      }
    }
  }, [idAction, history, props.requete]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      {props.menuFermer ? (
        <div>
          <button onClick={e => handleClickBoutonReponse(e)}>
            {getLibelle("Transférer")}
          </button>

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
                  onClick={() => handleTransfertMenu(action.value)}
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
        onValidate={onValidateService}
        options={listeEntiteToOptions()}
        titre="Transfert à un service"
      ></TransfertPopin>
      <TransfertPopin
        open={agentPopinOpen}
        onClose={onCloseAgent}
        onValidate={onValidateAgent}
        options={listeUtilisateursToOptionsBis(props.requete)}
        titre="Transfert à un officier d'état civil"
      ></TransfertPopin>
    </>
  );
};

function listeEntiteToOptions(): Options {
  return [
    { value: "", str: "" },
    ...storeRece.listeEntite
      .filter(entite => entite.estDansSCEC)
      .map(entite => {
        return { value: entite.idEntite, str: entite.libelleEntite };
      })
  ];
}

function listeUtilisateursToOptionsBis(requete: TRequete): Options {
  return [
    { value: "", str: "" },
    ...storeRece.listeUtilisateurs
      .filter(utilisateur => filterUtilisateur(utilisateur, requete))
      .map(utilisateur => {
        return {
          value: utilisateur.idUtilisateur,
          str: `${utilisateur.nom} ${utilisateur.prenom}`
        };
      })
  ];
}

function filterUtilisateur(utilisateur: IUtilisateur, requete: TRequete) {
  if (requete.type === TypeRequete.DELIVRANCE) {
    return filtreUtilisateurRequeteDelivrance(
      utilisateur,
      requete as IRequeteDelivrance
    );
  } else {
    return filtreUtilisateurRequeteInformation(utilisateur);
  }
}

function filtreUtilisateurRequeteInformation(
  utilisateur: IUtilisateur
): boolean {
  const estDuSCEC = utilisateur.entite?.estDansSCEC;
  const aDroit = utilisateurADroit(Droit.INFORMER_USAGER, utilisateur);
  return Boolean(estDuSCEC && aDroit);
}

function filtreUtilisateurRequeteDelivrance(
  utilisateur: IUtilisateur,
  requete: IRequeteDelivrance
): boolean {
  const estDuSCEC = utilisateur.entite?.estDansSCEC;
  const aDroit =
    requete.sousType === SousTypeDelivrance.RDDCO
      ? utilisateurADroit(Droit.DELIVRER_COMEDEC, utilisateur)
      : utilisateurADroit(Droit.DELIVRER, utilisateur);
  return Boolean(estDuSCEC && aDroit);
}
