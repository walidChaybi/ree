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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ApercuReqCreationPageContext } from "../ApercuReqCreationPage";
import "./scss/VoletPiecesJustificatives.scss";

interface OngletPiecesJustificativesProps {
  requete: IRequeteCreation;
}

export const OngletPiecesJustificatives: React.FC<
  OngletPiecesJustificativesProps
> = props => {
  const [liste, setListe] = useState<ListeItem[]>([]);
  const { setRequete } = useContext(ApercuReqCreationPageContext);

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

  const setTitreActuel = useCallback(
    (idDocument: string, idPiece: string, nouveauLibelle: string) => {
      const nouvelleRequete = { ...props.requete };
      const documentPj = nouvelleRequete.documentsPj?.find(
        document => document.id === idDocument
      );
      if (documentPj) {
        const pieceJ = documentPj.piecesJustificatives.find(
          piece => piece.id === idPiece
        );
        if (pieceJ) {
          pieceJ.nouveauLibelleFichierPJ = nouveauLibelle;
          setRequete(nouvelleRequete);
        }
      }
    },
    [props.requete, setRequete]
  );

  const mappingIDocumentPjToListeItem = useCallback(
    (documentsPj: IDocumentPJ[]): ListeItem[] => {
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
                    setTitreActuel={(nouveauLibelle: string) =>
                      setTitreActuel(document.id, piece.id, nouveauLibelle)
                    }
                  />
                )
              )}
            </>
          )
        })
      );
    },
    [setTitreActuel]
  );

  useEffect(() => {
    if (props.requete?.documentsPj) {
      const documentsPj = RequeteCreation.getDocumentsPJtrierParPriorites(
        props.requete
      );
      setListe(mappingIDocumentPjToListeItem(documentsPj));
    }
  }, [props.requete, mappingIDocumentPjToListeItem]);

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
