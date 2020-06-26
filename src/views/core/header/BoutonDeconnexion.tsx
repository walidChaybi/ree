import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getText } from "../../common/widget/Text";
const ressource = require("../../../ressources/ressource.json");

interface BoutonDeconnexionProps {
  nom: string;
  prenom: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const BoutonDeconnexion: React.FC<BoutonDeconnexionProps> = ({
  nom,
  prenom,
  onClick
}) => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const accessible = ressource.boutonDeconnexion.accessible;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  return (
    <div className="UtilisateurBouton">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        data-testid="UtilisateurBouton"
      >
        {prenom} {nom}
      </Button>
      {accessible && (
        <Menu
          className="Menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuItem onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
            {getText("boutons.deconnexion")}
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};
