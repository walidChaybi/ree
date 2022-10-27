import { PieceJustificativeLibelle } from "@model/requete/enum/PieceJustificativeLibelle";
import { IDocumentPJ } from "@model/requete/IDocumentPj";
import {
  IRequeteCreation,
  RequeteCreation
} from "@model/requete/IRequeteCreation";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import {
  ListeGlisserDeposer,
  ListeItem
} from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useCallback, useEffect, useState } from "react";
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
      const documentsPj = RequeteCreation.getDocumentsPJtrierParPriorites(
        props.requete
      );
      setListe(mappingIDocumentPjToListeItem(documentsPj));
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

  const mappingIDocumentPjToListeItem = (
    documentsPj: IDocumentPJ[]
  ): ListeItem[] => {
    const getLibelleComplet = (
      libelle: string,
      libelleTraite?: PieceJustificativeLibelle
    ) => {
      const numeroPostLibelle = PieceJustificativeLibelle.getNumero(
        libelle,
        libelleTraite
      );

      return `${libelleTraite?.nom ?? libelle} ${numeroPostLibelle ?? ""}`;
    };

    return documentsPj.map(
      (document: IDocumentPJ): ListeItem => ({
        id: document.id,
        libelle: `${document.categorie.nom} ${getLibelleComplet(
          document.libelle,
          document.libelleTraite
        )}`,
        checkbox: false,
        aPoubelle: false,
        sousElement: (
          <>
            {document.piecesJustificatives.map(
              (piece: IPieceJustificativeCreation, index) => (
                <AccordionVisionneuse
                  key={piece.id}
                  idDocumentAAfficher={piece.id}
                  titre={piece.nouveauLibelleFichierPJ}
                  titreOrigine={piece.nom}
                />
              )
            )}
          </>
        )
      })
    );
  };

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
