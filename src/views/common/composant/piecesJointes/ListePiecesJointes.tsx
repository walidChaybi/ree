import { IPieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import React, { Fragment } from "react";
import "../../widget/section/scss/SectionPanel.scss";
import "../../widget/section/scss/SectionPanelArea.scss";
import { LienPieceJointe } from "./LienPieceJointe";

interface IListePiecesJointesProps {
  pieces: IPieceJointe[];
  numRequete: string;
  titre: string;
}

export const ListePiecesJointes: React.FC<IListePiecesJointesProps> = props => {
  return (
    <div className={"SectionPanel"}>
      <Fragment>
        <div className={`SectionPanelArea`}>
          <div className={`wrapper`}>
            <label className="libelleContent">{props.titre}</label>
          </div>
          <div className={`wrapper`}>
            {props.pieces.map((piece: IPieceJointe, index) => (
              <span key={index}>
                <LienPieceJointe
                  pieceJointe={piece}
                  numRequete={props.numRequete}
                  index={index}
                ></LienPieceJointe>
              </span>
            ))}
          </div>
        </div>
      </Fragment>
    </div>
  );
};
