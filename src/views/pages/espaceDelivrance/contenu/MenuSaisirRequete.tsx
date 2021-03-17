import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./sass/MenuSaisirRequete.scss";
import {
  LISTE_DES_REQUETES_COURRIER,
  SousTypeDelivrance
} from "../../../../model/requete/v2/SousTypeDelivrance";
import { getLibelle } from "../../../common/widget/Text";
import {
  URL_MES_REQUETES_SAISIR_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_REQUETE
} from "../../../router/ReceUrls";
import { useHistory } from "react-router-dom";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";

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
    if (props.indexTabPanel === 0) {
      history.push(URL_MES_REQUETES_SAISIR_REQUETE, { nomRequete });
    } else if (props.indexTabPanel === 1) {
      history.push(URL_REQUETES_SERVICE_SAISIR_REQUETE, { nomRequete });
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
