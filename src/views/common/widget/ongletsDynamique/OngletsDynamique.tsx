import { IActionOption } from "@model/requete/IActionOption";
import { DocumentEC } from "@model/requete/enum/DocumentEC";
import Add from "@mui/icons-material/Add";
import Clear from "@mui/icons-material/Clear";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { getLibelle } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useState } from "react";
import { MenuAction } from "../menu/MenuAction";
import "./scss/OngletsDynamique.scss";

interface OngletsDynamiqueProps {
  listePlus: IActionOption[];
  ongletSelectionne?: string;
  listeOnglets?: { libelle: string; id: string; icone: boolean }[];
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
                className={`${onglet.id === props.ongletSelectionne ? "selected" : ""} ${
                  props.listeOnglets?.length === NOMBRE_ONGLETS && index === DocumentEC.Complementaire ? "documentComplementaire" : ""
                }`}
              >
                <span>{onglet.libelle}</span>
                {onglet.icone && <ErrorOutline className="warning" />}
              </button>
            );
          })}

          {props.afficherPlus && (
            <MenuAction
              afficheChevron={false}
              listeActions={props.listePlus}
              onSelect={props.actionPlus}
              widthMenuItem="auto"
              infoBulle={getLibelle("Ajout d'un document complémentaire")}
            >
              <Add />
            </MenuAction>
          )}

          {props.afficherMoins && (
            <BoutonDoubleSubmit
              onClick={props.actionMoins}
              title={getLibelle("Suppression du document complémentaire")}
              className={`retirerDocument ${props.listeOnglets[props.listeOnglets.length - 1].id === idOngletCourant ? "selected" : ""}`}
            >
              <Clear />
            </BoutonDoubleSubmit>
          )}
        </>
      )}
    </div>
  );
};
