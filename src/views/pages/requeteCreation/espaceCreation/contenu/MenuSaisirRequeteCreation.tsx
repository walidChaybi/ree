import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PATH_SAISIR_RCTC, URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { useState, type FC, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const DUREE_OUVERTURE_POPIN = 100;

interface IMenuSaisirRequeteCreationProps {
  indexTabPanel: number;
  disabled?: boolean;
}

const MenuSaisirRequeteCreation: FC<IMenuSaisirRequeteCreationProps> = ({ indexTabPanel, disabled = false }) => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const clickMenuItem = (nomRequete: string) => {
    if (nomRequete === "RCTC") {
      navigate(indexTabPanel === 1 ? URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC : PATH_SAISIR_RCTC);
    }
  };

  const listeRequeteCourrier = getListeDesRequetesCourrierCreation();

  return (
    <div>
      <button
        onMouseEnter={handleOpenMenu}
        disabled={disabled}
        className="flex items-center justify-center rounded-xl rounded-b-none bg-bleu-sombre p-3 shadow-xl"
      >
        <ArrowDropDownIcon />
        <span>Saisir requête courrier</span>
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
              <AddIcon />
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

export default WithHabilitation(MenuSaisirRequeteCreation, "MenuSaisirRequeteCreation");
