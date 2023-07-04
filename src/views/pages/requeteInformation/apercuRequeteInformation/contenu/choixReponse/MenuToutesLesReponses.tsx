import { IReponseRequeteInfo } from "@model/requete/IReponseRequeteInfo";
import { ObjetRequete } from "@model/requete/enum/ObjetRequete";
import { MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import { Option } from "@util/Type";
import { getLibelle } from "@util/Utils";
import NestedMenuItem from "@widget/menu/NestedMenuItem";
import React from "react";
import "./scss/MenuToutesLesReponses.scss";

interface MenuToutesLesReponsesProps {
  onClick: (reponse: IReponseRequeteInfo) => void;
  listeReponse?: IReponseRequeteInfo[];
  disabled: boolean;
}

export const MenuToutesLesReponses: React.FC<
  MenuToutesLesReponsesProps
> = props => {
  const [menuToutesLesReponses, setMenuToutesLesReponses] =
    React.useState<null | HTMLElement>(null);

  const handleClickBoutonReponse = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuToutesLesReponses(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuToutesLesReponses(null);
  };

  const clickMenuItem = (reponse: IReponseRequeteInfo) => {
    props.onClick(reponse);
    handleCloseMenu();
  };

  return (
    <>
      {props.listeReponse && (
        <div>
          <button
            disabled={props.disabled}
            onClick={e => handleClickBoutonReponse(e)}
          >
            {getLibelle("Toutes les réponses disponibles")}
          </button>

          <Menu
            className="Menu"
            anchorEl={menuToutesLesReponses}
            keepMounted
            open={Boolean(menuToutesLesReponses)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            MenuListProps={{ onMouseLeave: handleCloseMenu }}
          >
            {ObjetRequete.getAllEnumsAsOptionsSaufCompletion().map(
              (obj: Option) => {
                let reponsesFiltrees: IReponseRequeteInfo[] = [];
                if (props.listeReponse) {
                  reponsesFiltrees = props.listeReponse.filter(
                    rep => rep.objet === obj.cle
                  );
                }
                return (
                  <NestedMenuItem
                    className="BoutonSousMenu"
                    label={obj.libelle}
                    parentMenuOpen={Boolean(menuToutesLesReponses)}
                    key={obj.cle}
                    openDirection="left"
                  >
                    {reponsesFiltrees.map((reponse: IReponseRequeteInfo) => {
                      return (
                        <MenuItem
                          className="SousMenu"
                          onClick={() => clickMenuItem(reponse)}
                          key={reponse.id}
                        >
                          {libelleSurDeuxLignes(reponse.libelle)}
                        </MenuItem>
                      );
                    })}
                  </NestedMenuItem>
                );
              }
            )}
          </Menu>
        </div>
      )}
    </>
  );
};

function libelleSurDeuxLignes(libelle: string) {
  let libelleHMTL: any;
  let i = 90;
  if (libelle.length > i) {
    while (libelle.charAt(i) !== " ") {
      i++;
    }
    libelleHMTL = (
      <>
        <span>{libelle.slice(0, i)}</span>
        <span>{libelle.slice(i, libelle.length)}</span>
      </>
    );
  } else {
    libelleHMTL = <span>{libelle}</span>;
  }
  return libelleHMTL;
}
