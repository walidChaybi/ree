import { Link } from "@material-ui/core";
import { IPieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { getLibelle } from "@util/Utils";
import React, { useState } from "react";
import { FenetrePiecesJointes } from "./FenetrePiecesJointes";

interface IDataLienFicheProps {
  pieceJointe: IPieceJointe;
  numRequete: string;
  index: number;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const LienPieceJointe: React.FC<IDataLienFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
    <>
      {props.pieceJointe.id && (
        <>
          <Link
            className={"lienFiche"}
            href={"#"}
            onClick={onClick}
            title={props.pieceJointe.nom}
          >
            {getNomPieceJointeOuDefaut(props.index, props.pieceJointe.libelle)}
          </Link>

          {fenetreOuverteState && (
            <FenetrePiecesJointes
              toggleFenetre={toggleFenetre}
              numRequete={props.numRequete}
              nom={getNomPieceJointeOuDefaut(
                props.index,
                props.pieceJointe.nom
              )}
              idPiece={props.pieceJointe.id}
              typePiece={props.pieceJointe.typePiece}
            ></FenetrePiecesJointes>
          )}
        </>
      )}
    </>
  );
};

function getNomPieceJointeOuDefaut(index: number, propriete?: string): string {
  return propriete ? propriete : `${getLibelle("Pièce n°")} ${index}}`;
}
