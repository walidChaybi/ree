import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { useHistory } from "react-router-dom";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { FeatureFlag } from "../../../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../../common/util/featureFlag/gestionnaireFeatureFlag";
import WithHabilitation from "../../../../common/util/habilitation/WithHabilitation";
import { getLibelle } from "../../../../common/util/Utils";
import {
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC
} from "../../../../router/ReceUrls";
import "./scss/MenuSaisirRequete.scss";

interface MenuSaisirRequeteProps {
  indexTabPanel: number;
  disabled?: boolean;
}

const MenuSaisirRequete: React.FC<MenuSaisirRequeteProps> = props => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const history = useHistory();

  const clickMenuItem = (nomRequete: string) => {
    if (props.indexTabPanel === 1) {
      switch (nomRequete) {
        case "RDCSC":
          history.push(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC);
          break;

        case "RDC":
          history.push(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC);
          break;

        case "RDLFC":
          history.push(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    } else {
      switch (nomRequete) {
        case "RDCSC":
          history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC);
          break;

        case "RDC":
          history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);
          break;

        case "RDLFC":
          history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    }
  };

  const listeRequeteCourrier = getListeDesRequetesCourrier();

  return (
    <div className="MenuSaisirRequete">
      <button onMouseEnter={handleOpenMenu} disabled={props.disabled}>
        {getLibelle("Saisir requête courrier")}
      </button>

      <Menu
        className="Menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={handleCloseMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        MenuListProps={{
          onMouseLeave: handleCloseMenu
        }}
      >
        {listeRequeteCourrier.map((sousTypeDelivrance: SousTypeDelivrance) => {
          return (
            <MenuItem
              onClick={() => clickMenuItem(sousTypeDelivrance.nom)}
              key={sousTypeDelivrance.nom}
            >
              {sousTypeDelivrance.libelle}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

function getListeDesRequetesCourrier(): SousTypeDelivrance[] {
  let listeRequeteCourrier: SousTypeDelivrance[] = [];

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(SousTypeDelivrance.RDC);
  }

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      SousTypeDelivrance.RDCSC
    );
  }

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      SousTypeDelivrance.RDLFC
    );
  }

  return listeRequeteCourrier;
}

export default WithHabilitation(MenuSaisirRequete, "MenuSaisirRequete");
