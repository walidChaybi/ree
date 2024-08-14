import { getCompteurRequetes } from "@api/appels/requeteApi";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  URL_DECONNEXION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS
} from "@router/ReceUrls";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { logError } from "@util/LogManager";
import {
  ZERO,
  getLibelle,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RECEContext } from "../contexts/RECEContext";

interface BoutonDeconnexionProps {
  onClick?: (event: React.MouseEvent) => void;
}

const codeErreurForbidden = 403;

export const BoutonDeconnexion: React.FC<BoutonDeconnexionProps> = ({
  onClick
}) => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const [confirmationDeconnexion, setConfirmationDeconnexion] =
    React.useState<boolean>(false);
  const [nbRequetes, setNbRequetes] = React.useState<number>(ZERO);

  const navigate = useNavigate();
  const { infosLoginOfficier } = useContext(RECEContext);

  const listeUrlSansConfirmationDeconnexion = [
    URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS,
    URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE
  ];

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
    navigate(URL_DECONNEXION);
  }

  useEffect(() => {
    return () => {
      if (window.location.pathname.includes(URL_DECONNEXION)) {
        navigate(ZERO);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDeconnexion = () => {
    const estRouteSansConfirmationDeconnexion = Boolean(
      listeUrlSansConfirmationDeconnexion.filter(url =>
        window.location.pathname.includes(url)
      )[ZERO]
    );

    setMenu(null);

    if (estRouteSansConfirmationDeconnexion) {
      deconnexion();
    } else {
      getCompteurRequetes(StatutRequete.A_SIGNER.nom)
        .then(result => {
          const nbReq = result.body.data;
          setNbRequetes(nbReq);
          if (nbReq > ZERO) {
            setConfirmationDeconnexion(true);
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
    }
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
        setConfirmationDeconnexion(false);
        navigate(URL_MES_REQUETES_DELIVRANCE);
      }
    },
    {
      label: "Oui",
      action: () => {
        setConfirmationDeconnexion(false);
        deconnexion();
      }
    }
  ];

  return (
    <>
      <ConfirmationPopin
        estOuvert={confirmationDeconnexion}
        messages={messagePopin}
        boutons={boutonsPopin}
      />
      <div id="simple-menu" className="UtilisateurBouton">
        {infosLoginOfficier !== undefined &&
          (infosLoginOfficier.officierDataState !== undefined ||
            infosLoginOfficier.erreurState?.status === codeErreurForbidden) && (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={event => handleClickBoutonOfficer(event)}
              >
                {infosLoginOfficier.officierDataState !== undefined
                  ? `${infosLoginOfficier.officierDataState.prenom} ${
                      infosLoginOfficier.officierDataState.nom
                    }${getFonction(
                      infosLoginOfficier.officierDataState.fonctionAgent
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
    </>
  );
};

function getFonction(fonction?: string): string {
  return fonction
    ? ` - ${premiereLettreEnMajusculeLeResteEnMinuscule(fonction)}`
    : "";
}
