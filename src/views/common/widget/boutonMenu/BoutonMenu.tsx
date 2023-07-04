import { PopoverOrigin } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Option, Options } from "@util/Type";
import React from "react";
import "./scss/BoutonMenu.scss";

const DUREE_OUVERTURE_POPIN = 100;

export interface IBoutonMenuProps {
  boutonLibelle: string;
  options: Options;
  onClickOption: (key: string, event?: React.SyntheticEvent) => void;
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
    e.stopPropagation();
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenu(null);
  };

  const handleCloseMenuFromMenuList = () => {
    setMenu(null);
  };

  return (
    <div className={`bouton-menu ${props.className}`}>
      {props.options.length > 0 && (
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
              onMouseLeave: handleCloseMenuFromMenuList,
              onClick: handleCloseMenuFromMenuList
            }}
          >
            {props.options.map((option: Option) => (
              <MenuItem
                onClick={event => props.onClickOption(option.cle, event)}
                key={option.cle}
              >
                {option.libelle}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};
