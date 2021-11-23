import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  getCompteurRequetes,
  getCompteurRequetesV2
} from "../../../api/appels/requeteApi";
import { FeatureFlag } from "../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../common/util/featureFlag/gestionnaireFeatureFlag";
import { gestionnaireDoubleOuverture } from "../../common/util/GestionnaireDoubleOuverture";
import { logError } from "../../common/util/LogManager";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../common/util/Utils";
import { ConfirmationPopin } from "../../common/widget/popin/ConfirmationPopin";
import { getLibelle, getText } from "../../common/widget/Text";
import {
  URL_DECONNEXION,
  URL_MES_REQUETES,
  URL_MES_REQUETES_V2
} from "../../router/ReceUrls";
import { OfficierContext } from "../contexts/OfficierContext";

const etape2 = gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2);
interface BoutonDeconnexionProps {
  onClick?: (event: React.MouseEvent) => void;
}

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

    const fct = etape2 ? getCompteurRequetesV2 : getCompteurRequetes;

    fct()
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
        history.push(etape2 ? URL_MES_REQUETES_V2 : URL_MES_REQUETES);
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
                    {`${officier.officierDataState.prenom} ${
                      officier.officierDataState.nom
                    }${getFonction(
                      officier.officierDataState.fonctionAgent?.libelleFonction
                    )}`}
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

function getFonction(fonction?: string): string {
  return fonction
    ? ` - ${premiereLettreEnMajusculeLeResteEnMinuscule(fonction)}`
    : "";
}
