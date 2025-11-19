import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import React from "react";
import { ListePiecesJustificativesEtablissement } from "../../apercuRequete/etablissement/commun/ListePiecesJustificativesEtablissement";
import { ListePiecesJustificativesTranscription } from "../../apercuRequete/transcription/composants/ListePiecesJustificativesTranscription";
import "./scss/VoletPiecesJustificatives.scss";

export type TFctRenommePieceJustificative = (idPieceJustificative: string, nouveauLibelle: string, idDocumentPJ?: string) => void;

interface IOngletPiecesJustificativesProps {
  requete: IRequeteCreation;
  autoriseOuvertureFenetreExt?: boolean;
  onRenommePieceJustificative: TFctRenommePieceJustificative;
  rechargerRequete?: () => void;
}

export const OngletPiecesJustificatives: React.FC<IOngletPiecesJustificativesProps> = ({
  autoriseOuvertureFenetreExt = false,
  ...props
}) => {
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
          rechargerRequete={props.rechargerRequete}
          requete={props.requete}
          autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
          onRenommePieceJustificative={props.onRenommePieceJustificative}
        />
      )}
    </span>
  );
};
