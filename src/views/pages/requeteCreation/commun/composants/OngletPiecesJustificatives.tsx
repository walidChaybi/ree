import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ListePiecesJustificativesEtablissement } from "@pages/requeteCreation/apercuRequete/etablissement/commun/ListePiecesJustificativesEtablissement";
import { ListePiecesJustificativesTranscription } from "@pages/requeteCreation/apercuRequete/transcription/composants/ListePiecesJustificativesTranscription";
import React from "react";
import "./scss/VoletPiecesJustificatives.scss";

export type typeFctRenommePieceJustificative = (
  idPieceJustificative: string,
  nouveauLibelle: string,
  idDocumentPJ?: string
) => void;

interface OngletPiecesJustificativesProps {
  requete: IRequeteCreation;
  autoriseOuvertureFenetreExt?: boolean;
  onRenommePieceJustificative: typeFctRenommePieceJustificative;
}

export const OngletPiecesJustificatives: React.FC<
  OngletPiecesJustificativesProps
> = ({ autoriseOuvertureFenetreExt = false, ...props }) => {
  return (
    <span className="PiecesJustificatives">
      {SousTypeCreation.estSousTypeTranscription(props.requete?.sousType) && (
        <ListePiecesJustificativesTranscription
          requete={props.requete}
          autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
          onRenommePieceJustificative={props.onRenommePieceJustificative}
        />
      )}
      {!SousTypeCreation.estSousTypeTranscription(props.requete?.sousType) && (
        <ListePiecesJustificativesEtablissement
          requete={props.requete}
          autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
          onRenommePieceJustificative={props.onRenommePieceJustificative}
        />
      )}
    </span>
  );
};
