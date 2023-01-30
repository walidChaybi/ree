import { TypePieceJointe } from "@hook/requete/piecesJointes/communPieceJointe";
import { IDocumentPJ } from "@model/requete/IDocumentPj";
import {
  IRequeteCreationEtablissement,
  RequeteCreationEtablissement
} from "@model/requete/IRequeteCreationEtablissement";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import {
  ListeGlisserDeposer,
  ListeItem
} from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useEffect, useState } from "react";

interface ListePiecesJustificativesEtablissementProps {
  requete: IRequeteCreationEtablissement;
  autoriseOuvertureFenetreExt?: boolean;
}

export const ListePiecesJustificativesEtablissement: React.FC<
  ListePiecesJustificativesEtablissementProps
> = ({ autoriseOuvertureFenetreExt = false, ...props }) => {
  const [documentsPjTries, setDocumentsPjTries] = useState<IDocumentPJ[]>([]);

  const setNouveauLibellePieceJointe = (
    idDocument: string,
    idPiece: string,
    nouveauLibelle: string
  ) => {
    const documentPjTrouve = documentsPjTries.find(
      document => document.id === idDocument
    );
    if (documentPjTrouve) {
      const pieceJTrouvee = documentPjTrouve.piecesJustificatives.find(
        piece => piece.id === idPiece
      );
      if (pieceJTrouvee) {
        pieceJTrouvee.nouveauLibelleFichierPJ = nouveauLibelle;
        setDocumentsPjTries([...documentsPjTries]);
      }
    }
  };

  const mapDocumentsPjTriesVersListeItem = (): ListeItem[] => {
    return documentsPjTries.map(
      (document: IDocumentPJ): ListeItem => ({
        id: document.id,
        libelle: document.categorie.libelleAAfficher,
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
                  typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
                  numRequete={props.requete.numero}
                  setTitreActuel={(nouveauLibelle: string) => {
                    setNouveauLibellePieceJointe(
                      document.id,
                      piece.id,
                      nouveauLibelle
                    );
                  }}
                  autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
                />
              )
            )}
          </>
        )
      })
    );
  };

  useEffect(() => {
    if (props.requete?.documentsPj) {
      setDocumentsPjTries([
        ...RequeteCreationEtablissement.getDocumentsPJtriesParPriorites(
          props.requete
        )
      ]);
    }
  }, [props.requete]);

  return (
    <span className="PiecesJustificatives">
      {props.requete?.documentsPj && documentsPjTries && (
        <ListeGlisserDeposer
          liste={mapDocumentsPjTriesVersListeItem()}
          deverrouille={true}
          afficheDragHandle={true}
          useDragHandle={true}
          handleReorga={handleReorga}
          libellesSontTitres={true}
        />
      )}
    </span>
  );

  function handleReorga(oldIndex: number, newIndex: number) {
    if (documentsPjTries) {
      const newList = [...documentsPjTries];
      const item = newList[oldIndex];
      newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, item);
      setDocumentsPjTries(newList);
    }
  }
};
