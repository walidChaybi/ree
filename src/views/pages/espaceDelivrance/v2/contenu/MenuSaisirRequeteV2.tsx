import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  LISTE_DES_REQUETES_COURRIER,
  SousTypeDelivrance
} from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import WithHabilitation from "../../../../common/util/habilitation/WithHabilitation";
import { getLibelle } from "../../../../common/widget/Text";
import {
  URL_MES_REQUETES_SAISIR_RDAPC,
  URL_MES_REQUETES_SAISIR_RDC,
  URL_MES_REQUETES_SAISIR_RDCSC,
  URL_MES_REQUETES_SAISIR_RDLFC,
  URL_REQUETES_SERVICE_SAISIR_RDAPC,
  URL_REQUETES_SERVICE_SAISIR_RDC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_SERVICE_SAISIR_RDLFC
} from "../../../../router/ReceUrls";
import "./scss/MenuSaisirRequeteV2.scss";

interface MenuSaisirRequeteProps {
  indexTabPanel: number;
  disabled?: boolean;
}

const MenuSaisirRequete: React.FC<MenuSaisirRequeteProps> = props => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);

  const handleClickBoutonSaisir = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const history = useHistory();

  const clickMenuItem = (nomRequete: string) => {
    if (props.indexTabPanel === 1) {
      switch (nomRequete) {
        case "RDAPC":
          history.push(URL_REQUETES_SERVICE_SAISIR_RDAPC);
          break;

        case "RDCSC":
          history.push(URL_REQUETES_SERVICE_SAISIR_RDCSC);
          break;

        case "RDC":
          history.push(URL_REQUETES_SERVICE_SAISIR_RDC);
          break;

        case "RDLFC":
          history.push(URL_REQUETES_SERVICE_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    } else {
      switch (nomRequete) {
        case "RDAPC":
          history.push(URL_MES_REQUETES_SAISIR_RDAPC);
          break;

        case "RDCSC":
          history.push(URL_MES_REQUETES_SAISIR_RDCSC);
          break;

        case "RDC":
          history.push(URL_MES_REQUETES_SAISIR_RDC);
          break;

        case "RDLFC":
          history.push(URL_MES_REQUETES_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    }
  };

  return (
    <div className="MenuSaisirRequete">
      <button
        onClick={e => handleClickBoutonSaisir(e)}
        disabled={props.disabled}
      >
        {getLibelle("Saisir une requête")}
      </button>

      <Menu
        className="Menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={handleCloseMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {LISTE_DES_REQUETES_COURRIER.map((nom: string) => {
          return (
            <MenuItem onClick={() => clickMenuItem(nom)} key={nom}>
              {SousTypeDelivrance.getEnumFor(nom).libelle}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default WithHabilitation(MenuSaisirRequete, "MenuSaisirRequete");
