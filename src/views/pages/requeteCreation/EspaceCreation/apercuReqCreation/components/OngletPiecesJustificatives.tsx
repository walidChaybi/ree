import React, { useCallback, useEffect, useState } from "react";
import { IDocumentPJ } from "../../../../../../model/requete/IDocumentPj";
import { IRequeteCreation } from "../../../../../../model/requete/IRequeteCreation";
import { IPieceJustificativeCreation } from "../../../../../../model/requete/pieceJointe/IPieceJustificativeCreation";
import { AccordionVisionneuse } from "../../../../../common/widget/accordion/AccordionVisionneuse";
import {
  ListeGlisserDeposer,
  ListeItem
} from "../../../../../common/widget/listeGlisserDeposer/ListeGlisserDeposer";
import "./scss/VoletPiecesJustificatives.scss";

interface OngletPiecesJustificativesProps {
  requete: IRequeteCreation;
}

export const OngletPiecesJustificatives: React.FC<
  OngletPiecesJustificativesProps
> = props => {
  const [liste, setListe] = useState<ListeItem[]>([]);

  useEffect(() => {
    if (props.requete?.documentsPj) {
      setListe(
        props.requete.documentsPj.map((document: IDocumentPJ) => ({
          libelle: `${document.categorie} - ${document.libelle}`,
          checkbox: false,
          id: document.id,
          aPoubelle: false,
          sousElement: (
            <>
              {document.piecesJustificatives.map(
                (piece: IPieceJustificativeCreation) => (
                  <AccordionVisionneuse
                    key={piece.id}
                    idDocumentAAfficher={piece.id}
                    titre={piece.nom}
                  />
                )
              )}
            </>
          )
        }))
      );
    }
  }, [props.requete]);

  const handleReorga = useCallback(
    (oldIndex: number, newIndex: number) => {
      if (liste) {
        const newList = [...liste];
        const item = newList[oldIndex];
        newList.splice(oldIndex, 1);
        newList.splice(newIndex, 0, item);
        setListe(newList);
      }
    },
    [liste]
  );

  return (
    <span className="PiecesJustificatives">
      {props.requete && liste && (
        <ListeGlisserDeposer
          liste={liste}
          deverrouille={true}
          afficheDragHandle={true}
          useDragHandle={true}
          handleReorga={handleReorga}
          libellesSontTitres={true}
        />
      )}
    </span>
  );
};
