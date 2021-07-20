import { Link } from "@material-ui/core";
import { MimeType } from "file-type/core";
import React, { useState } from "react";
import { useGetPieceJustificativeApi } from "../../../common/hook/v2/PieceJustificativeHook";
import { FenetreExterne } from "../../../common/util/FenetreExterne";
import { VisionneuseDocument } from "../../../common/widget/document/VisionneuseDocument";

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
  const contenuPiece = useGetPieceJustificativeApi(props.idPiece);

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
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
        <FenetreExterne
          titre={`${props.nom} - Req N°${props.numRequete}`}
          onCloseHandler={() => {
            toggleFenetre();
          }}
          ratioWidth={0.33}
          ratioHeight={0.66}
        >
          <VisionneuseDocument
            titre={"Pièce Justificative"}
            contenu={contenuPiece?.contenu}
            typeMime={contenuPiece?.mimeType as MimeType}
          ></VisionneuseDocument>
        </FenetreExterne>
      )}
    </>
  );
};
