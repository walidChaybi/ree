import { Droit } from "@model/agent/enum/Droit";
import { utilisateurADroit } from "@model/agent/IUtilisateur";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC
} from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { storeRece } from "@util/storeRece";
import { getLibelle } from "@util/Utils";
import React from "react";
import { useHistory } from "react-router-dom";
import "./scss/MenuSaisirRequete.scss";

const DUREE_OUVERTURE_POPIN = 100;

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
          if (
            storeRece.utilisateurCourant &&
            utilisateurADroit(Droit.DELIVRER, storeRece.utilisateurCourant)
          ) {
            history.push(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC);
          } else {
            alert("Vous n'avez pas les droits pour ce type de requête");
          }
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
        transitionDuration={DUREE_OUVERTURE_POPIN}
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
