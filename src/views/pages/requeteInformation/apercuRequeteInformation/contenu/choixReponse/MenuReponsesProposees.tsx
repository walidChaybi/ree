import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { IReponseRequeteInfo } from "../../../../../../model/requete/IReponseRequeteInfo";
import { IRequeteInformation } from "../../../../../../model/requete/IRequeteInformation";
import { getLibelle } from "../../../../../common/util/Utils";

interface MenuReponsesProposeesProps {
  onClick: (reponse: IReponseRequeteInfo) => void;
  listeReponse?: IReponseRequeteInfo[];
  requete: IRequeteInformation;
}

export const MenuReponsesProposees: React.FC<MenuReponsesProposeesProps> = props => {
  const [
    menuReponsesProposees,
    setMenuReponsesProposees
  ] = React.useState<null | HTMLElement>(null);
  const [reponsesFiltees, setReponsesFiltees] = useState<IReponseRequeteInfo[]>(
    []
  );
  const handleClickBoutonReponse = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuReponsesProposees(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuReponsesProposees(null);
  };

  const clickMenuItem = (reponse: IReponseRequeteInfo) => {
    props.onClick(reponse);
    handleCloseMenu();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.listeReponse]);

  return (
    <>
      {props.listeReponse && (
        <div>
          <button onClick={e => handleClickBoutonReponse(e)}>
            {getLibelle("Réponses proposées")}
          </button>

          <Menu
            className="Menu"
            anchorEl={menuReponsesProposees}
            keepMounted
            open={Boolean(menuReponsesProposees)}
            onClose={handleCloseMenu}
            getContentAnchorEl={null}
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
