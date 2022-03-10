import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React from "react";
import { IActionOption } from "../../../../model/requete/IActionOption";
import { DoubleSubmitUtil } from "../../util/DoubleSubmitUtil";
import "./scss/MenuAction.scss";

interface IMenuActionProps {
  titre: string;
  onSelect: (indexMenu: number) => any;
  listeActions: IActionOption[];
  deplierEnBas?: boolean;
  className?: string;
  widthMenuItem?: string;
  afficheChevron?: boolean;
  infoBulle?: string;
}

export const MenuAction: React.FC<IMenuActionProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const afficheFleche = () => {
    if (props.deplierEnBas) {
      return Boolean(anchorEl) ? (
        <ExpandLess className="icon-menu" fontSize="small" />
      ) : (
        <ExpandMore className="icon-menu" fontSize="small" />
      );
    } else {
      return Boolean(anchorEl) ? (
        <ArrowBackIosIcon className="icon-menu" fontSize="small" />
      ) : (
        <ArrowForwardIosIcon className="icon-menu" fontSize="small" />
      );
    }
  };

  return (
    <div title={props.infoBulle} className={`MenuAction ${props.className}`}>
      <button onClick={handleClick}>
        <span>{props.titre}</span>
        {props.afficheChevron && afficheFleche()}
      </button>
      <Menu
        className="Menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionProps={{
          onEnter: () => {
            props.listeActions.forEach(el => {
              DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
            });
          }
        }}
        PaperProps={{
          style: {
            width: props.widthMenuItem ? props.widthMenuItem : "35%"
          }
        }}
        anchorOrigin={{
          vertical: props.deplierEnBas ? "bottom" : "top",
          horizontal: props.deplierEnBas ? "left" : "right"
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
              handleClose();
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
