import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { IDataDetailRequeteApi } from "../../detailRequete/hook/DetailRequeteHook";
import "./scss/ChoixAction.scss";

export interface IActionOption {
  value: number;
  label: string;
  sousTypes: string[];
}

interface IMenuActionProps {
  titre: string;
  onSelect: (indexMenu: number) => any;
  listeActions: IActionOption[];
  requete?: IDataDetailRequeteApi;
}

export const MenuAction: React.FC<IMenuActionProps> = props => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);

  const handleClickBouton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  return (
    <>
      <button className="menu-choix-action" onClick={e => handleClickBouton(e)}>
        {props.titre}
        {!Boolean(menu) && (
          <ExpandMoreIcon className="icon-menu" fontSize="large" />
        )}
        {Boolean(menu) && (
          <ExpandLessIcon className="icon-menu" fontSize="large" />
        )}
      </button>
      <Menu
        id="menu"
        anchorEl={menu}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(menu)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            width: "58%",
            left: 0,
            right: 0
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {props.listeActions.map(
          el =>
            showChoixAction(el.sousTypes, props.requete?.data) && (
              <MenuItem onClick={() => props.onSelect(el.value)} key={el.value}>
                {el.label}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
};

function showChoixAction(
  sousTypes: string[],
  detailRequeteState?: any
): boolean {
  if (sousTypes) {
    return sousTypes.includes(detailRequeteState?.sousType.nom);
  }
  return true;
}
