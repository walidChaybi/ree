import { IActionOption } from "@model/requete/IActionOption";
import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Option } from "@util/Type";
import { replaceUrl } from "@util/route/UrlUtil";
import { ITransfertRequetesParams, useTransfertRequetesApi } from "@views/common/hook/requete/TransfertHook";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { MdAssignmentInd } from "react-icons/md";
import { useNavigate } from "react-router";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_DELIVRANCE } from "../../../../router/infoPages/InfoPagesEspaceDelivrance";
import { INFO_PAGE_MES_REQUETES_INFORMATION } from "../../../../router/infoPages/InfoPagesEspaceInformation";
import { getUtilisateursParTypeRequeteVersOptions, listeServicesToOptions, reinitialiserOnClick } from "./MenuTransfertUtil";
import { ITransfertPopinForm, TransfertPopin } from "./TransfertPopin";

enum EActionTransfert {
  TRANSFERT_SERVICE = 0,
  TRANSFERT_OFFICIER = 1
}

interface IMenuTransfertProps {
  idRequete: string;
  typeRequete: TypeRequete;
  idUtilisateurRequete: string;
  sousTypeRequete: SousTypeRequete;
  menuFermer?: boolean;
  disabled?: boolean;
  estTransfert: boolean;
  icone?: boolean;
  rafraichirParent?: () => void;
}

export const MenuTransfert: React.FC<IMenuTransfertProps> = props => {
  const navigate = useNavigate();
  const refs = useRef([]);
  const [options, setOptions] = useState<IActionOption[]>([]);

  /* Gestion des options */
  useEffect(() => {
    const reponseSansDelivranceCSOptions: IActionOption[] = [
      {
        value: EActionTransfert.TRANSFERT_SERVICE,
        label: "À un service"
      },
      {
        value: EActionTransfert.TRANSFERT_OFFICIER,
        label: "À un officier de l'état civil"
      }
    ];

    setOptions(reponseSansDelivranceCSOptions);
  }, [props.typeRequete]);

  const handleTransfertMenu = async (indexMenu: number, e: any) => {
    if (e) {
      e.stopPropagation();
    }
    switch (indexMenu) {
      case EActionTransfert.TRANSFERT_SERVICE:
        setServicePopinOpen(true);
        break;
      case EActionTransfert.TRANSFERT_OFFICIER:
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

  const handleCloseMenu = (e: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }

    setMenuReponsesProposees(null);
  };

  /* Gestion des pop-in de transfère */
  const [servicePopinOpen, setServicePopinOpen] = useState<boolean>(false);
  const [agentPopinOpen, setAgentPopinOpen] = useState<boolean>(false);
  const [transfertRequetesParams, setTransfertRequetesParams] = useState<ITransfertRequetesParams>();

  const { utilisateurs, services, utilisateurConnecte } = useContext(RECEContextData);

  const onCloseService = () => {
    setServicePopinOpen(false);
    reinitialiserOnClick(refs);
  };
  const onCloseAgent = () => {
    setAgentPopinOpen(false);
    reinitialiserOnClick(refs);
  };

  const { succesDuTransfert, transfertEnCours } = useTransfertRequetesApi(transfertRequetesParams);

  useEffect(() => {
    if (!succesDuTransfert) return;

    if (props.estTransfert) {
      if (props.typeRequete === TypeRequete.DELIVRANCE) {
        replaceUrl(navigate, LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url));
      } else {
        replaceUrl(navigate, LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_INFORMATION.url));
      }
    } else if (props.rafraichirParent) {
      props.rafraichirParent();
    }
  }, [succesDuTransfert]);

  const onValidateTransfertRequete = useCallback(
    (typeTransfert: "agent" | "service", agentOuService: Option) => {
      setTransfertRequetesParams({
        requetes: [{ id: props.idRequete, statut: props.estTransfert ? "TRANSFEREE" : "A_TRAITER" }],
        libelleAction: `${props.estTransfert ? "Transférée" : "Attribuée"} à ${agentOuService.libelle}`,
        estTransfert: props.estTransfert,
        ...(typeTransfert === "service" ? { idService: agentOuService.cle } : { idUtilisateurAAssigner: agentOuService.cle })
      });
      typeTransfert === "service" ? setServicePopinOpen(false) : setAgentPopinOpen(false);
    },
    [props.idRequete, props.estTransfert, setServicePopinOpen, setTransfertRequetesParams]
  );

  return (
    <>
      {transfertEnCours || !utilisateurs || !services || (!utilisateurConnecte && <PageChargeur />)}
      {props.menuFermer ? (
        <div>
          {props.icone ? (
            <span title={"Attribuer requête"}>
              <MdAssignmentInd
                onClick={e => handleClickBoutonReponse(e)}
                aria-hidden
              />
            </span>
          ) : (
            <BoutonDoubleSubmit
              disabled={props.disabled}
              onClick={e => handleClickBoutonReponse(e)}
            >
              {"Transférer"}
            </BoutonDoubleSubmit>
          )}

          <Menu
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
            MenuListProps={{ onMouseLeave: handleCloseMenu, className: "bg-bleu-sombre text-white" }}
          >
            {options.map((action: IActionOption) => {
              return (
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--bleu-rece)"
                    }
                  }}
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
          refs={refs}
        />
      )}

      <TransfertPopin
        open={servicePopinOpen}
        onClose={onCloseService}
        onValidate={(valeurs: ITransfertPopinForm) => onValidateTransfertRequete("service", valeurs.optionChoisie)}
        options={listeServicesToOptions(services)}
        titre={`${props.estTransfert ? "Transfert" : "Attribuer"} à un service`}
      />
      <TransfertPopin
        open={agentPopinOpen}
        onClose={onCloseAgent}
        onValidate={(valeurs: ITransfertPopinForm) => onValidateTransfertRequete("agent", valeurs.optionChoisie)}
        options={getUtilisateursParTypeRequeteVersOptions(
          props.typeRequete,
          props.sousTypeRequete,
          props.idUtilisateurRequete,
          utilisateurConnecte,
          props.estTransfert,
          utilisateurs,
          true
        )}
        titre={`${props.estTransfert ? "Transfert" : "Attribuer"} à un officier de l'état civil`}
      />
    </>
  );
};
