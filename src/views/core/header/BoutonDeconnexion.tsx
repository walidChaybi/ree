import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getText } from "../../common/widget/Text";
import { OfficierContext } from "../contexts/OfficierContext";
import { useHistory } from "react-router-dom";
import { DeconnexionAppUrl } from "../../router/UrlManager";

const ressource = require("../../../ressources/ressource.json");

interface BoutonDeconnexionProps {
  onClick?: (event: React.MouseEvent) => void;
}

export const BoutonDeconnexion: React.FC<BoutonDeconnexionProps> = ({
  onClick
}) => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const accessible = ressource.boutonDeconnexion.accessible;

  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    history.push(DeconnexionAppUrl);
    history.go(0);
    setMenu(null);
  };

  return (
    <OfficierContext.Consumer>
      {officier => (
        <div className="UtilisateurBouton">
          {officier !== undefined && officier.officierDataState !== undefined && (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => handleClick(event)}
            >
              {`${officier.officierDataState.prenom} ${officier.officierDataState.nom}`}
            </Button>
          )}
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
      )}
    </OfficierContext.Consumer>
  );
};
