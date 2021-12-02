import { Link } from "@material-ui/core";
import { MimeType } from "file-type/core";
import React, { useState } from "react";
import { FenetrePiecesJustificatives } from "./FenetrePiecesJustificatives";

interface IDataLienFicheProps {
  type: string;
  nom: string;
  numRequete: string;
  contenu: string;
  typeMime?: MimeType;
  idPiece: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const LienPieceJustificative: React.FC<IDataLienFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
    <>
      {props.idPiece && (
        <>
          <Link
            className={"lienFiche"}
            href={"#"}
            onClick={onClick}
            title={props.nom}
          >
            {props.type}
          </Link>

          {fenetreOuverteState && (
            <FenetrePiecesJustificatives
              toggleFenetre={toggleFenetre}
              numRequete={props.numRequete}
              nom={props.nom}
              idPiece={props.idPiece}
            ></FenetrePiecesJustificatives>
          )}
        </>
      )}
    </>
  );
};
