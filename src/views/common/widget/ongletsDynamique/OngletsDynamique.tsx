import React from "react";
import { IActionOption } from "../../../../model/requete/IActionOption";
import { getLibelle } from "../../util/Utils";
import { MenuAction } from "../menu/MenuAction";
import "./scss/OngletsDynamique.scss";

interface OngletsDynamiqueProps {
  listePlus: IActionOption[];
  ongletSelectionne?: string;
  listeOnglets?: { libelle: string; id: string }[];
  actionClick: (document: string) => void;
  actionPlus: (event: any) => void;
  nombreOngletsMax: number;
  afficherPlus: boolean;
}

export const OngletsDynamique: React.FC<OngletsDynamiqueProps> = props => {
  function handleClick(id: string) {
    props.actionClick(id);
  }

  return (
    <div className="OngletsDynamique">
      {props.listeOnglets && (
        <>
          {props.listeOnglets.map(onglet => {
            return (
              <button
                key={onglet.id}
                onClick={() => handleClick(onglet.id)}
                className={`${
                  onglet.id === props.ongletSelectionne ? "selected" : ""
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
                infoBulle={getLibelle("Ajout d'un document")}
              ></MenuAction>
            )}
        </>
      )}
    </div>
  );
};
