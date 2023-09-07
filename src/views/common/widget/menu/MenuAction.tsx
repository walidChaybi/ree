import { reinitialiserOnClick } from "@composant/menuTransfert/MenuTransfertUtil";
import { IActionOption } from "@model/requete/IActionOption";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DoubleClicUtil } from "@util/DoubleClicUtil";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { MutableRefObject, useRef } from "react";
import "./scss/MenuAction.scss";

interface IMenuActionProps {
  titre?: string;
  onSelect: (indexMenu: number) => any;
  listeActions?: IActionOption[];
  deplierEnBas?: boolean;
  className?: string;
  classNameBouton?: string;
  widthMenuItem?: string;
  afficheChevron?: boolean;
  infoBulle?: string;
  actionMoins?: () => void;
}

export const MenuAction: React.FC<IMenuActionProps> = props => {
  const refs: MutableRefObject<HTMLElement[]> = useRef([]);
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
    <div
      title={props.infoBulle}
      className={`MenuAction ${props.className ? props.className : ""}`}
    >
      <Bouton
        className={`${props.classNameBouton}`}
        onClick={props.actionMoins ? props.actionMoins : handleClick}
      >
        <span>{props.titre}</span>
        {props.afficheChevron && afficheFleche()}
        {props.children}
      </Bouton>
      <Menu
        className="Menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionProps={{
          onEnter: () => reinitialiserOnClick(refs)
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
        {props.listeActions &&
          props.listeActions.map(el => (
            <MenuItem
              ref={element => {
                if (element) {
                  refs.current.push(element);
                }
              }}
              onClick={() => {
                refs.current.forEach(ref => {
                  DoubleClicUtil.desactiveOnClick(ref);
                });
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
