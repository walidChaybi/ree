import { PopoverOrigin } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import "./scss/BoutonMenu.scss";

const DUREE_OUVERTURE_POPIN = 100;

export interface IBoutonMenuItem {
  key: string;
  libelle: string;
}

export interface IBoutonMenuProps {
  boutonLibelle: string;
  listeItems: IBoutonMenuItem[];
  onClickMenuItem: (key: string, event?: React.SyntheticEvent) => void;
  titreBouton?: string;
  className?: string;
  disabled?: boolean;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  openOnMouseClick?: boolean;
}

export const BoutonMenu: React.FC<IBoutonMenuProps> = props => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  return (
    <div className={`bouton-menu ${props.className}`}>
      {props.listeItems.length > 0 && (
        <>
          <button
            title={props.titreBouton}
            onMouseEnter={!props.openOnMouseClick ? handleOpenMenu : undefined}
            onClick={props.openOnMouseClick ? handleOpenMenu : undefined}
            disabled={props.disabled}
          >
            {props.boutonLibelle}
          </button>
          <Menu
            className="Menu"
            anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={handleCloseMenu}
            transitionDuration={DUREE_OUVERTURE_POPIN}
            anchorOrigin={props.anchorOrigin}
            transformOrigin={props.transformOrigin}
            MenuListProps={{
              onMouseLeave: handleCloseMenu,
              onClick: handleCloseMenu
            }}
          >
            {props.listeItems.map((item: IBoutonMenuItem) => (
              <MenuItem
                onClick={event => props.onClickMenuItem(item.key, event)}
                key={item.key}
              >
                {item.libelle}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};
