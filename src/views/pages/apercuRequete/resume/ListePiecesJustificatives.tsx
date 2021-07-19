import React, { Fragment } from "react";
import requete from "../../../../mock/data/requete";
import { IPieceJustificative } from "../../../common/types/RequeteType";
import "../../../common/widget/section/scss/SectionPanel.scss";
import "../../../common/widget/section/scss/SectionPanelArea.scss";
import { LienPieceJustificative } from "./LienPieceJustificative";

interface IListePiecesJustificatives {
  pieces: IPieceJustificative[];
}

export const ListePiecesJustificatives: React.FC<IListePiecesJustificatives> =
  props => {
    return (
      <div className={"SectionPanel"}>
        <Fragment>
          <div className={`SectionPanelArea`}>
            <div className={`wrapper`}>
              <label className="libelleContent">Pièces Justificatives</label>
            </div>
            <div className={`wrapper`}>
              {props.pieces.map((content, index) => (
                <span key={index}>
                  <LienPieceJustificative
                    nom={content.nom}
                    type={content.typePieceJustificative.libelle}
                    contenu={content.contenu}
                    numRequete={requete.idRequeteInitiale.toString()}
                    idPiece={content.id}
                  ></LienPieceJustificative>
                </span>
              ))}
            </div>
          </div>
        </Fragment>
      </div>
    );
  };
