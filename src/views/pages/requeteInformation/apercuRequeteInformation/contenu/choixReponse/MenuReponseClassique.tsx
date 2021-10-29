import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { IReponseRequeteInfo } from "../../../../../../model/requete/v2/IReponseRequeteInfo";
import { getLibelle } from "../../../../../common/widget/Text";

interface MenuReponseProps {
  onClick: (reponse: IReponseRequeteInfo) => void;
  listeReponse?: IReponseRequeteInfo[];
  libelle?: string;
}

export const MenuReponseClassique: React.FC<MenuReponseProps> = props => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);

  const handleClickBoutonReponse = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const clickMenuItem = (reponse: IReponseRequeteInfo) => {
    props.onClick(reponse);
    setMenu(null);
  };

  return (
    <>
      {props.listeReponse && (
        <div className="MenuReponse">
          <button onClick={e => handleClickBoutonReponse(e)}>
            {getLibelle("Répondre")}
          </button>

          <Menu
            className="Menu"
            anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={handleCloseMenu}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            {props.listeReponse.map((reponse: IReponseRequeteInfo) => {
              return (
                <MenuItem
                  onClick={() => clickMenuItem(reponse)}
                  key={reponse.id}
                >
                  {reponse.libelle}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      )}
    </>
  );
};
