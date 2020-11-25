import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getText } from "../../common/widget/Text";
import { OfficierContext } from "../contexts/OfficierContext";
import { useHistory } from "react-router-dom";
import { URL_DECONNEXION } from "../../router/ReceUrls";

interface BoutonDeconnexionProps {
  onClick?: (event: React.MouseEvent) => void;
}

export const BoutonDeconnexion: React.FC<BoutonDeconnexionProps> = ({
  onClick
}) => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);

  const history = useHistory();

  const handleClickBoutonOfficer = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (onClick) {
      onClick(event);
    }
    setMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const handleClickDeconnexion = () => {
    history.push(URL_DECONNEXION);
    history.go(0);
    setMenu(null);
  };

  return (
    <OfficierContext.Consumer>
      {officier => (
        <div className="UtilisateurBouton">
          {officier !== undefined && officier.officierDataState !== undefined && (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={event => handleClickBoutonOfficer(event)}
              >
                {`${officier.officierDataState.prenom} ${officier.officierDataState.nom}`}
              </Button>

              <Menu
                className="Menu"
                anchorEl={menu}
                keepMounted
                open={Boolean(menu)}
                onClose={handleCloseMenu}
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
                <MenuItem onClick={handleClickDeconnexion}>
                  <FontAwesomeIcon icon={faTimes} />
                  {getText("boutons.deconnexion")}
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      )}
    </OfficierContext.Consumer>
  );
};
