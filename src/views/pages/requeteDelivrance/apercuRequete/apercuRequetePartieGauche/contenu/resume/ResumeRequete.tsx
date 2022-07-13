import React from "react";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { IPieceJointe } from "../../../../../../../model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificative } from "../../../../../../../model/requete/pieceJointe/IPieceJustificative";
import { ListePiecesJointes } from "../../../../../../common/composant/piecesJointes/ListePiecesJointes";
import { TypePieceJointe } from "../../../../../../common/hook/requete/piecesJointes/PostPiecesJointesHook";
import { DEUX, TROIS, UN, ZERO } from "../../../../../../common/util/Utils";
import { SectionPanel } from "../../../../../../common/widget/section/SectionPanel";
import { getPanelsResumeRequete } from "./ResumeRequeteUtils";

export const titreDetail = "Détails de requête";

interface ResumeRequeteProps {
  requete: IRequeteDelivrance;
}

export const ResumeRequete: React.FC<ResumeRequeteProps> = props => {
  const panels = getPanelsResumeRequete(props.requete);

  return (
    <>
      <div className="ResumeRequete Fieldset">
        <div className="ResumeRequeteTitle">
          <span>{`Détail requête ${props.requete.numero}`}</span>
        </div>
        {panels.length > 1 && (
          <div className="PanelsResumeRequete">
            <SectionPanel {...panels[ZERO]} />
            <SectionPanel {...panels[UN]} />
            <SectionPanel {...panels[DEUX]} />
            <hr className={"SectionPanelAreaSeparation"} />
            <SectionPanel {...panels[TROIS]} />
            <hr className={"SectionPanelAreaSeparation"} />
            <ListePiecesJointes
              pieces={mapPiecesJustificatives(
                props.requete.piecesJustificatives
              )}
              numRequete={props.requete.numero}
              titre="Pièces Justificatives"
            />
          </div>
        )}
      </div>
    </>
  );
};

function mapPiecesJustificatives(
  pieces?: IPieceJustificative[]
): IPieceJointe[] {
  return pieces
    ? pieces.map(piece => ({
        id: piece.id,
        libelle: piece.typePieceJustificative.libelle,
        nom: piece.nom,
        typePiece: TypePieceJointe.PIECE_JUSTIFICATIVE
      }))
    : [];
}
