import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { IReponseRequeteInfo } from "../../../../../../model/requete/v2/IReponseRequeteInfo";
import { IRequeteInformation } from "../../../../../../model/requete/v2/IRequeteInformation";
import { getLibelle } from "../../../../../common/widget/Text";

interface MenuReponseProps {
  onClick: (reponse: IReponseRequeteInfo) => void;
  listeReponse?: IReponseRequeteInfo[];
  requete: IRequeteInformation;
  libelle?: string;
}

export const MenuReponseClassique: React.FC<MenuReponseProps> = props => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const [reponsesFiltees, setReponsesFiltees] = useState<IReponseRequeteInfo[]>(
    []
  );

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

  useEffect(() => {
    if (props.listeReponse) {
      setReponsesFiltees(
        props.listeReponse.filter(
          reponse =>
            reponse.objet === props.requete.objet.nom &&
            reponse.complementObjet === props.requete.complementObjet.nom
        )
      );
    }
  }, [props.listeReponse, props.requete]);

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
            {reponsesFiltees.map((reponse: IReponseRequeteInfo) => {
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
