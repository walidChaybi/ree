import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import "./scss/MenuAction.scss";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { DoubleSubmitUtil } from "../../util/DoubleSubmitUtil";

export interface IActionOption {
  value: number;
  label: string;
  sousTypes?: SousTypeDelivrance[];
  ref: any;
}

interface IMenuActionProps {
  titre: string;
  onSelect: (indexMenu: number) => any;
  listeActions: IActionOption[];
  requete?: TRequete;
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
        onEnter={() => {
          props.listeActions.forEach(el => {
            DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
          });
        }}
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
            showChoixAction(
              el.sousTypes,
              props.requete as IRequeteDelivrance
            ) && (
              <MenuItem
                ref={el.ref}
                onClick={event => {
                  DoubleSubmitUtil.eviteDoubleSubmit(el.ref?.current);
                  setMenu(null);
                  props.onSelect(el.value);
                }}
                key={el.value}
              >
                {el.label}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
};

function showChoixAction(
  sousTypes?: SousTypeDelivrance[],
  detailRequeteState?: IRequeteDelivrance
): boolean {
  return sousTypes
    ? sousTypes.find(st => st === detailRequeteState?.sousType) != null
    : true;
}
