import { ListePiecesJointes } from "@composant/piecesJointes/ListePiecesJointes";
import { TypePieceJointe } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IPieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { FenetreExterne } from "@util/FenetreExterne";
import React, { useState } from "react";
import { DetailRequetePage } from "../../../../detailRequete/DetailRequetePage";
import { ResumeRequetePartieHaute } from "./ResumeRequetePartieHaute";
import "./scss/ResumeRequete.scss";

export const titreDetail = "Détails de requête";

interface ResumeRequeteProps {
  requete: IRequeteDelivrance;
}

const width = 1100;
const height = 600;

export const ResumeRequete: React.FC<ResumeRequeteProps> = props => {
  const [fenetreExterne, setFenetreExterne] = useState<boolean>(false);

  const onClickNumero = () => {
    setFenetreExterne(true);
  };

  const onClose = () => {
    setFenetreExterne(false);
  };

  return (
    <>
      <div className="ResumeRequete Fieldset">
        <div className="ResumeRequeteTitle">
          <span>
            {`Résumé requête `}
            <span className="LinkNumeroRequete" onClick={onClickNumero}>
              {props.requete.numero}
            </span>
          </span>
        </div>
        {props.requete && (
          <div className="PanelsResumeRequete">
            <ResumeRequetePartieHaute requete={props.requete} />
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
      {fenetreExterne && (
        <FenetreExterne
          titre={`Détails requête : N°${props.requete.numero}`}
          onCloseHandler={onClose}
          height={height}
          width={width}
        >
          <DetailRequetePage idRequeteAAfficher={props.requete.id} />
        </FenetreExterne>
      )}
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
