import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { DoubleSubmitUtil } from "../../util/DoubleSubmitUtil";
import "./scss/MenuAction.scss";

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
    <div className="MenuAction">
      <button onClick={e => handleClickBouton(e)}>
        <span>{props.titre}</span>
        {!Boolean(menu) && (
          <ArrowForwardIosIcon className="icon-menu" fontSize="small" />
        )}
        {Boolean(menu) && (
          <ArrowBackIosIcon className="icon-menu" fontSize="small" />
        )}
      </button>
      <Menu
        className="Menu"
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
            width: "35%"
          }
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {props.listeActions.map(el => (
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
        ))}
      </Menu>
    </div>
  );
};
