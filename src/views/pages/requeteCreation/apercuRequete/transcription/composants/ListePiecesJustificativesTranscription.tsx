import { TypePieceJointe } from "@hook/requete/piecesJointes/communPieceJointe";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import {
  IRequeteCreationTranscription,
  RequeteCreationTranscription
} from "@model/requete/IRequeteCreationTranscription";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import {
  ListeGlisserDeposer,
  ListeItem
} from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useEffect, useState } from "react";

interface GroupPjTranscription {
  typePieceJustificative: TypePieceJustificative;
  piecesJustificatives: IPieceJustificativeCreation[];
}

interface ListePiecesJustificativesTranscriptionProps {
  requete: IRequeteCreationTranscription;
  autoriseOuvertureFenetreExt?: boolean;
}

export const ListePiecesJustificativesTranscription: React.FC<
  ListePiecesJustificativesTranscriptionProps
> = props => {
  const [groupesPjsTsranscriptionTries, setGroupesPjsTsranscriptionTries] =
    useState<GroupPjTranscription[]>([]);

  const setTitreActuelPjTranscription = (
    idPiece: string,
    nouveauLibelle: string
  ) => {
    const nouvelleRequete = { ...props.requete };
    const pieceJ = nouvelleRequete.piecesJustificatives?.find(
      piece => piece.id === idPiece
    );
    if (pieceJ) {
      pieceJ.nouveauLibelleFichierPJ = nouveauLibelle;
      setGroupesPjsTsranscriptionTries([...groupesPjsTsranscriptionTries]);
    }
  };

  const mappingIPiecesJustificativesCreationTrieesVersListeItem =
    (): ListeItem[] => {
      return groupesPjsTsranscriptionTries.map(
        (group: GroupPjTranscription): ListeItem => ({
          id: group.typePieceJustificative.code,
          libelle: group.typePieceJustificative.libelle,
          checkbox: false,
          aPoubelle: false,
          sousElement: (
            <>
              {group.piecesJustificatives.map(
                (piece: IPieceJustificativeCreation, index) => (
                  <AccordionVisionneuse
                    key={piece.id}
                    idDocumentAAfficher={piece.id}
                    titre={piece.nouveauLibelleFichierPJ}
                    titreOrigine={piece.nom}
                    typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
                    numRequete={props.requete.numero}
                    setTitreActuel={(nouveauLibelle: string) =>
                      setTitreActuelPjTranscription(piece.id, nouveauLibelle)
                    }
                    autoriseOuvertureFenetreExt={
                      props.autoriseOuvertureFenetreExt
                    }
                  />
                )
              )}
            </>
          )
        })
      );
    };

  // Recuperation des PJ triées et assignation de la liste (ListeItem)
  useEffect(() => {
    if (props.requete?.piecesJustificatives) {
      const piecesJustificativesTriees =
        RequeteCreationTranscription.getPJsTranscriptionTrieesParPriorites(
          props.requete
        );
      setGroupesPjsTsranscriptionTries(
        creationGroupesPjsTranscrition(piecesJustificativesTriees)
      );
    }
  }, [props.requete]);

  return (
    <>
      {props.requete && groupesPjsTsranscriptionTries && (
        <ListeGlisserDeposer
          liste={mappingIPiecesJustificativesCreationTrieesVersListeItem()}
          deverrouille={true}
          afficheDragHandle={true}
          useDragHandle={true}
          handleReorga={handleReorga}
          libellesSontTitres={true}
        />
      )}
    </>
  );

  function creationGroupesPjsTranscrition(
    piecesJustificativesCreationTriees: IPieceJustificativeCreation[]
  ): GroupPjTranscription[] {
    const groups: GroupPjTranscription[] = [];
    piecesJustificativesCreationTriees.forEach(pj => {
      const group = groups.find(
        grp => grp.typePieceJustificative === pj.typePieceJustificative
      );
      if (group) {
        group.piecesJustificatives.push(pj);
      } else {
        groups.push({
          typePieceJustificative: pj.typePieceJustificative,
          piecesJustificatives: [pj]
        });
      }
    });

    return groups;
  }

  function handleReorga(oldIndex: number, newIndex: number) {
    if (groupesPjsTsranscriptionTries) {
      const newList = [...groupesPjsTsranscriptionTries];
      const item = newList[oldIndex];
      newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, item);
      setGroupesPjsTsranscriptionTries(newList);
    }
  }
};


