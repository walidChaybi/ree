import { getCompteurRequetes } from "@api/appels/requeteApi";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { URL_DECONNEXION, URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { logError } from "@util/LogManager";
import {
  getLibelle,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React from "react";
import { useHistory } from "react-router-dom";
import { OfficierContext } from "../contexts/OfficierContext";

interface BoutonDeconnexionProps {
  onClick?: (event: React.MouseEvent) => void;
}

const codeErreurForbidden = 403;

export const BoutonDeconnexion: React.FC<BoutonDeconnexionProps> = ({
  onClick
}) => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const [confirmationDeco, setConfirmationDeco] =
    React.useState<boolean>(false);
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
    gestionnaireDoubleOuverture.arreterVerification();
    history.push(URL_DECONNEXION);
    history.go(0);
  }

  const handleClickDeconnexion = () => {
    setMenu(null);

    getCompteurRequetes(StatutRequete.A_SIGNER.nom)
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
        history.push(URL_MES_REQUETES_DELIVRANCE);
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
        {officier => {
          return (
            <div id="simple-menu" className="UtilisateurBouton">
              {officier !== undefined &&
                (officier.officierDataState !== undefined ||
                  officier.erreurState?.status === codeErreurForbidden) && (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={event => handleClickBoutonOfficer(event)}
                    >
                      {officier.officierDataState !== undefined
                        ? `${officier.officierDataState.prenom} ${
                            officier.officierDataState.nom
                          }${getFonction(
                            officier.officierDataState.fonctionAgent
                              ?.libelleFonction
                          )}`
                        : "Déconnexion"}
                    </Button>

                    <Menu
                      className="Menu"
                      anchorEl={menu}
                      keepMounted
                      open={Boolean(menu)}
                      onClose={handleCloseMenu}
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
                        {getLibelle("Déconnexion")}
                      </MenuItem>
                    </Menu>
                  </>
                )}
            </div>
          );
        }}
      </OfficierContext.Consumer>
    </>
  );
};

function getFonction(fonction?: string): string {
  return fonction
    ? ` - ${premiereLettreEnMajusculeLeResteEnMinuscule(fonction)}`
    : "";
}
