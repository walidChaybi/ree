import React, { useState } from "react";
import { IActionOption } from "../../../../model/requete/IActionOption";
import { DocumentEC } from "../../../pages/requeteDelivrance/editionExtraitCopie/enum/DocumentEC";
import { getLibelle } from "../../util/Utils";
import { MenuAction } from "../menu/MenuAction";
import "./scss/OngletsDynamique.scss";

interface OngletsDynamiqueProps {
  listePlus: IActionOption[];
  ongletSelectionne?: string;
  listeOnglets?: { libelle: string; id: string }[];
  actionClick: (document: string) => void;
  actionPlus: (indexMenu: number) => void;
  actionMoins: () => void;
  nombreOngletsMax: number;
  afficherPlus: boolean;
  afficherMoins: boolean;
}

const NOMBRE_ONGLETS = 3;
export const OngletsDynamique: React.FC<OngletsDynamiqueProps> = props => {
  const [idOngletCourant, setIdOngletCourant] = useState<string>("");
  function handleClick(id: string) {
    setIdOngletCourant(id);
    props.actionClick(id);
  }
  return (
    <div className="OngletsDynamique">
      {props.listeOnglets && (
        <>
          {props.listeOnglets.map((onglet, index) => {
            return (
              <button
                key={onglet.id}
                onClick={() => handleClick(onglet.id)}
                className={`${
                  onglet.id === props.ongletSelectionne ? "selected" : ""
                } ${
                  props.listeOnglets?.length === NOMBRE_ONGLETS &&
                  index === DocumentEC.Complementaire
                    ? "documentComplementaire"
                    : ""
                }`}
              >
                {onglet.libelle}
              </button>
            );
          })}

          {props.listeOnglets.length !== props.nombreOngletsMax &&
            props.afficherPlus && (
              <MenuAction
                afficheChevron={false}
                titre="+"
                listeActions={props.listePlus}
                onSelect={props.actionPlus}
                widthMenuItem="auto"
                infoBulle={getLibelle("Ajout d'un document complémentaire")}
              ></MenuAction>
            )}

          {props.listeOnglets.length >= props.nombreOngletsMax &&
            props.afficherMoins && (
              <MenuAction
                afficheChevron={false}
                titre="x"
                onSelect={props.actionMoins}
                widthMenuItem="auto"
                infoBulle={getLibelle("Suppression du document complémentaire")}
                actionMoins={props.actionMoins}
                classNameBouton={`retirerDocument ${
                  props.listeOnglets[props.listeOnglets.length - 1].id ===
                  idOngletCourant
                    ? "selected"
                    : ""
                }`}
              ></MenuAction>
            )}
        </>
      )}
    </div>
  );
};
