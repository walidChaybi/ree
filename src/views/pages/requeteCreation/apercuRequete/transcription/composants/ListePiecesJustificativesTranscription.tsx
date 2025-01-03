import { ITypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { PieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { typeFctRenommePieceJustificative } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { estRenseigne } from "@util/Utils";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { ListeGlisserDeposer, ListeItem } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useEffect, useState } from "react";

interface GroupePJTranscription {
  typePieceJustificative: ITypePieceJustificative | null;
  piecesJustificatives: IPieceJustificativeCreation[];
}

interface ListePiecesJustificativesTranscriptionProps {
  requete: IRequeteCreationTranscription;
  autoriseOuvertureFenetreExt?: boolean;
  onRenommePieceJustificative: typeFctRenommePieceJustificative;
}

export const ListePiecesJustificativesTranscription: React.FC<ListePiecesJustificativesTranscriptionProps> = props => {
  const [groupesPJsTsranscriptionTries, setGroupesPJsTsranscriptionTries] = useState<GroupePJTranscription[]>([]);

  const setNouveauLibellePieceJointe = (idPieceJustificative: string, nouveauLibelle: string) => {
    const pieceJustificativeARenommer = PieceJustificative.getPieceJustificative(
      props.requete.piecesJustificatives,
      idPieceJustificative
    ) as IPieceJustificativeCreation;
    if (pieceJustificativeARenommer) {
      pieceJustificativeARenommer.nouveauLibelleFichierPJ = nouveauLibelle;
      setGroupesPJsTsranscriptionTries([...groupesPJsTsranscriptionTries]);
      props.onRenommePieceJustificative(idPieceJustificative, nouveauLibelle);
    }
  };

  const mappingIPiecesJustificativesCreationTrieesVersListeItem = (): ListeItem[] => {
    return groupesPJsTsranscriptionTries.map(
      (group: GroupePJTranscription): ListeItem => ({
        id: group.typePieceJustificative?.code ?? "",
        libelle: group.typePieceJustificative?.libelle ?? "",
        checkbox: false,
        estSupprimable: false,
        estModifiable: false,
        sousElement: (
          <>
            {group.piecesJustificatives.map((piece: IPieceJustificativeCreation, index) => (
              <AccordionVisionneuse
                key={piece.id}
                idDocumentAAfficher={piece.id}
                titre={piece.nouveauLibelleFichierPJ}
                titreOrigine={piece.nom}
                typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
                numRequete={props.requete?.numero}
                setTitreActuel={(nouveauLibelle: string) => setNouveauLibellePieceJointe(piece.id, nouveauLibelle)}
                autoriseOuvertureFenetreExt={props.autoriseOuvertureFenetreExt}
              />
            ))}
          </>
        )
      })
    );
  };

  // Recuperation des PJ triées et assignation de la liste (ListeItem)
  useEffect(() => {
    if (props.requete?.piecesJustificatives) {
      let nouveauxGroupesPJsTsranscriptionTries;
      if (estRenseigne(groupesPJsTsranscriptionTries)) {
        nouveauxGroupesPJsTsranscriptionTries = majLibellesPiecesJustificatives(
          groupesPJsTsranscriptionTries,
          props.requete?.piecesJustificatives
        );
      } else {
        nouveauxGroupesPJsTsranscriptionTries = creerGroupesPJsTranscrition(props.requete?.piecesJustificatives);
      }

      setGroupesPJsTsranscriptionTries(nouveauxGroupesPJsTsranscriptionTries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requete]);

  return (
    <>
      {props.requete && groupesPJsTsranscriptionTries ? (
        <ListeGlisserDeposer
          liste={mappingIPiecesJustificativesCreationTrieesVersListeItem()}
          deverrouille={true}
          afficheDragHandle={true}
          useDragHandle={true}
          handleReorga={handleReorga}
          libellesSontTitres={true}
        />
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </>
  );

  function creerGroupesPJsTranscrition(piecesJustificativesCreationTriees: IPieceJustificativeCreation[]): GroupePJTranscription[] {
    const groups: GroupePJTranscription[] = [];
    piecesJustificativesCreationTriees.forEach(pj => {
      const group = groups.find(grp => grp.typePieceJustificative === pj.typePieceJustificative);
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
    if (groupesPJsTsranscriptionTries) {
      const newList = [...groupesPJsTsranscriptionTries];
      const item = newList[oldIndex];
      newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, item);
      setGroupesPJsTsranscriptionTries(newList);
    }
  }
};

function majLibellesPiecesJustificatives(
  groupesPJAMettreAJour: GroupePJTranscription[],
  pjsReference: IPieceJustificativeCreation[]
): GroupePJTranscription[] {
  groupesPJAMettreAJour.forEach(groupePJAMettreAjour => {
    groupePJAMettreAjour.piecesJustificatives.forEach(pjAMettreAJour => {
      const pjReference = PieceJustificative.getPieceJustificative(pjsReference, pjAMettreAJour.id) as IPieceJustificativeCreation;
      if (pjReference) {
        pjAMettreAJour.libelle = pjReference.libelle;
      }
    });
  });
  return groupesPJAMettreAJour;
}
