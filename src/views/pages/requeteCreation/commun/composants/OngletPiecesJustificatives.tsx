import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { ListePiecesJustificativesEtablissement } from "@pages/requeteCreation/apercuRequete/etablissement/composants/ListePiecesJustificativesEtablissement";
import { ListePiecesJustificativesTranscription } from "@pages/requeteCreation/apercuRequete/transcription/composants/ListePiecesJustificativesTranscription";
import React from "react";
import "./scss/VoletPiecesJustificatives.scss";

interface OngletPiecesJustificativesProps {
  requete: IRequeteCreation;
  autoriseOuvertureFenetreExt?: boolean;
}

export const OngletPiecesJustificatives: React.FC<
  OngletPiecesJustificativesProps
> = ({ autoriseOuvertureFenetreExt = false, ...props }) => {
  return (
    <span className="PiecesJustificatives">
      {SousTypeCreation.estSousTypeTranscription(props.requete.sousType) && (
        <ListePiecesJustificativesTranscription
          requete={props.requete}
          autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
        />
      )}
      {!SousTypeCreation.estSousTypeTranscription(props.requete.sousType) && (
        <ListePiecesJustificativesEtablissement
          requete={props.requete}
          autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
        />
      )}
    </span>
  );
};
