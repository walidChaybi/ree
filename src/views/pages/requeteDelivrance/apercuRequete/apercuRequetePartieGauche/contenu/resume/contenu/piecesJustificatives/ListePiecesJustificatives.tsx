import React, { Fragment } from "react";
import { IPieceJustificative } from "../../../../../../../../../model/requete/IPieceJustificative";
import "../../../../../../../../common/widget/section/scss/SectionPanel.scss";
import "../../../../../../../../common/widget/section/scss/SectionPanelArea.scss";
import { LienPieceJustificative } from "./LienPieceJustificative";

interface IListePiecesJustificatives {
  pieces: IPieceJustificative[];
  numRequete: string;
}

export const ListePiecesJustificatives: React.FC<IListePiecesJustificatives> = props => {
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
                  numRequete={props.numRequete}
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
