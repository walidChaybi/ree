import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  URL_MES_REQUETES_CREATION_SAISIR_RCTC,
  URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC
} from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { getLibelle } from "@util/Utils";
import React from "react";
import { useHistory } from "react-router-dom";

const DUREE_OUVERTURE_POPIN = 100;

interface MenuSaisirRequeteCreationProps {
  indexTabPanel: number;
  disabled?: boolean;
}

const MenuSaisirRequeteCreation: React.FC<
  MenuSaisirRequeteCreationProps
> = props => {
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
        case "RCTC":
          history.push(URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC);
          break;

        default:
          break;
      }
    } else {
      switch (nomRequete) {
        case "RCTC":
          history.push(URL_MES_REQUETES_CREATION_SAISIR_RCTC);
          break;

        default:
          break;
      }
    }
  };

  const listeRequeteCourrier = getListeDesRequetesCourrierCreation();

  return (
    <div className="MenuSaisirRequeteCreation">
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
        {listeRequeteCourrier.map((sousTypeCreation: SousTypeCreation) => {
          return (
            <MenuItem
              onClick={() => clickMenuItem(sousTypeCreation.nom)}
              key={sousTypeCreation.nom}
            >
              {sousTypeCreation.libelle}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

function getListeDesRequetesCourrierCreation(): SousTypeCreation[] {
  let listeRequeteCourrier: SousTypeCreation[] = [];

  listeRequeteCourrier = listeRequeteCourrier.concat(SousTypeCreation.RCTC);

  return listeRequeteCourrier;
}

export default WithHabilitation(
  MenuSaisirRequeteCreation,
  "MenuSaisirRequeteCreation"
);
