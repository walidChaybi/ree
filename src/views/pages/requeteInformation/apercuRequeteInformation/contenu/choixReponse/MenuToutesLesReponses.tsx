import { IReponseRequeteInfo } from "@model/requete/IReponseRequeteInfo";
import { EObjetRequeteInfo } from "@model/requete/enum/EObjetRequeteInfo";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Option } from "@util/Type";
import { enumVersOptions, getLibelle } from "@util/Utils";
import NestedMenuItem from "@widget/menu/NestedMenuItem";
import React from "react";
import "./scss/MenuToutesLesReponses.scss";

interface MenuToutesLesReponsesProps {
  onClick: (reponse: IReponseRequeteInfo) => void;
  listeReponse?: IReponseRequeteInfo[];
  disabled: boolean;
}

export const MenuToutesLesReponses: React.FC<MenuToutesLesReponsesProps> = props => {
  const [menuToutesLesReponses, setMenuToutesLesReponses] = React.useState<null | HTMLElement>(null);

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
            MenuListProps={{ onMouseLeave: handleCloseMenu, className: "bg-bleu-sombre text-white" }}
          >
            {enumVersOptions(EObjetRequeteInfo, { clesAExclure: ["COMPLETION_REQUETE_EN_COURS"] }).map((optionObjetRequeteInfo: Option) => {
              let reponsesFiltrees: IReponseRequeteInfo[] = [];
              if (props.listeReponse) {
                reponsesFiltrees = props.listeReponse.filter(rep => rep.objet === optionObjetRequeteInfo.cle);
              }
              return (
                <NestedMenuItem
                  className="BoutonSousMenu"
                  label={optionObjetRequeteInfo.libelle}
                  parentMenuOpen={Boolean(menuToutesLesReponses)}
                  key={optionObjetRequeteInfo.cle}
                  openDirection="left"
                >
                  {reponsesFiltrees.map((reponse: IReponseRequeteInfo) => {
                    return (
                      <MenuItem
                        className="SousMenu"
                        sx={{
                          "&:hover": {
                            backgroundColor: "var(--bleu-rece)"
                          }
                        }}
                        onClick={() => clickMenuItem(reponse)}
                        key={reponse.id}
                      >
                        {libelleSurDeuxLignes(reponse.libelle)}
                      </MenuItem>
                    );
                  })}
                </NestedMenuItem>
              );
            })}
          </Menu>
        </div>
      )}
    </>
  );
};

const libelleSurDeuxLignes = (libelle: string) => {
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
};
