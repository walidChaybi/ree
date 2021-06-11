import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { useHistory } from "react-router-dom";
import { getCompteurRequetes } from "../../../api/appels/requeteApi";
import { logError } from "../../common/util/LogManager";
import { ConfirmationPopin } from "../../common/widget/popin/ConfirmationPopin";
import { getLibelle, getText } from "../../common/widget/Text";
import { URL_DECONNEXION, URL_MES_REQUETES } from "../../router/ReceUrls";
import { OfficierContext } from "../contexts/OfficierContext";

interface BoutonDeconnexionProps {
  onClick?: (event: React.MouseEvent) => void;
}

export const BoutonDeconnexion: React.FC<BoutonDeconnexionProps> = ({
  onClick
}) => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const [confirmationDeco, setConfirmationDeco] = React.useState<boolean>(
    false
  );
  const [nbRequetes, setNbRequetes] = React.useState<number>(0);
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

  function deconnexion() {
    history.push(URL_DECONNEXION);
    history.go(0);
  }

  const handleClickDeconnexion = () => {
    setMenu(null);
    getCompteurRequetes()
      .then(result => {
        const nbReq = result.body.data;
        setNbRequetes(nbReq);
        if (nbReq > 0) {
          setConfirmationDeco(true);
        } else {
          deconnexion();
        }
      })
      .catch(error => {
        logError({
          error
        });
        deconnexion();
      });
  };

  // Eléments Popin Déconnexion
  const messagePopin = [
    getLibelle(
      `Il vous reste ${nbRequetes} requête(s) à signer, êtes-vous sûr de vouloir vous déconnecter ?`
    )
  ];

  const boutonsPopin = [
    {
      label: "Non",
      action: () => {
        setConfirmationDeco(false);
        history.push(URL_MES_REQUETES);
      }
    },
    {
      label: "Oui",
      action: () => {
        setConfirmationDeco(false);
        deconnexion();
      }
    }
  ];

  return (
    <>
      <ConfirmationPopin
        isOpen={confirmationDeco}
        messages={messagePopin}
        boutons={boutonsPopin}
      />
      <OfficierContext.Consumer>
        {officier => (
          <div id="simple-menu" className="UtilisateurBouton">
            {officier !== undefined &&
              officier.officierDataState !== undefined && (
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
    </>
  );
};
