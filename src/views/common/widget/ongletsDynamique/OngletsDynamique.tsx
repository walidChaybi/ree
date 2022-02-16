import React from "react";
import { IActionOption } from "../../../../model/requete/IActionOption";
import { MenuAction } from "../menu/MenuAction";
import "./scss/OngletsDynamique.scss";

interface OngletsDynamiqueProps {
  listePlus: IActionOption[];
  ongletSelectionne?: string;
  listeOnglets?: { libelle: string; id: string }[];
  actionClick: (document: string) => void;
  actionPlus: (event: any) => void;
  nombreOngletsMax: number;
}

export const OngletsDynamique: React.FC<OngletsDynamiqueProps> = props => {
  return (
    <div className="OngletsDynamique">
      {props.listeOnglets && (
        <>
          {props.listeOnglets.map(onglet => {
            return (
              <button
                key={onglet.id}
                onClick={() => props.actionClick(onglet.id)}
                className={`${
                  onglet.id === props.ongletSelectionne ? "selected" : ""
                }`}
              >
                {onglet.libelle}
              </button>
            );
          })}

          {props.listePlus.length !== props.nombreOngletsMax && (
            <MenuAction
              afficheChevron={false}
              titre="+"
              listeActions={props.listePlus}
              onSelect={props.actionPlus}
            ></MenuAction>
          )}
        </>
      )}
    </div>
  );
};
