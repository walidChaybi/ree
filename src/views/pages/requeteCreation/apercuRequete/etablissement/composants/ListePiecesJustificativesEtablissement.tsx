import { DocumentPJ, IDocumentPJ } from "@model/requete/IDocumentPj";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { typeFctRenommePieceJustificative } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { estRenseigne } from "@util/Utils";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import {
  ListeGlisserDeposer,
  ListeItem
} from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useEffect, useState } from "react";

interface ListePiecesJustificativesEtablissementProps {
  requete?: IRequeteCreationEtablissement;
  autoriseOuvertureFenetreExt?: boolean;
  onRenommePieceJustificative: typeFctRenommePieceJustificative;
}

export const ListePiecesJustificativesEtablissement: React.FC<
  ListePiecesJustificativesEtablissementProps
> = ({ autoriseOuvertureFenetreExt = false, ...props }) => {
  const [documentPJTries, setDocumentPjTries] = useState<IDocumentPJ[]>([]);

  const setNouveauLibellePieceJointe = (
    idDocumentPJ: string,
    idPieceJustificative: string,
    nouveauLibelle: string
  ) => {
    const pieceJTrouvee = DocumentPJ.getPieceJustificative(
      documentPJTries,
      idDocumentPJ,
      idPieceJustificative
    );
    if (pieceJTrouvee) {
      pieceJTrouvee.nouveauLibelleFichierPJ = nouveauLibelle;
      setDocumentPjTries([...documentPJTries]);
      props.onRenommePieceJustificative(
        idPieceJustificative,
        nouveauLibelle,
        idDocumentPJ
      );
    }
  };

  const mapDocumentsPjTriesVersListeItem = (): ListeItem[] => {
    return documentPJTries.map(
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
                  numRequete={props.requete?.numero}
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
      let nouveauxDocumentPJTries;
      if (estRenseigne(documentPJTries)) {
        nouveauxDocumentPJTries = majLibellesPiecesJustificatives(
          documentPJTries,
          props.requete.documentsPj
        );
      } else {
        nouveauxDocumentPJTries = [...props.requete?.documentsPj];
      }
      setDocumentPjTries(nouveauxDocumentPJTries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requete]);

  return (
    <span className="PiecesJustificatives">
      {props.requete?.documentsPj && documentPJTries ? (
        <ListeGlisserDeposer
          liste={mapDocumentsPjTriesVersListeItem()}
          deverrouille={true}
          afficheDragHandle={true}
          useDragHandle={true}
          handleReorga={handleReorga}
          libellesSontTitres={true}
        />
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </span>
  );

  function handleReorga(oldIndex: number, newIndex: number) {
    if (documentPJTries) {
      const newList = [...documentPJTries];
      const item = newList[oldIndex];
      newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, item);
      setDocumentPjTries(newList);
    }
  }
};

function majLibellesPiecesJustificatives(
  documentsPJAMettreAJour: IDocumentPJ[],
  documentsPJReference: IDocumentPJ[]
) {
  documentsPJAMettreAJour.forEach(documentPJAMettreAJour => {
    documentPJAMettreAJour.piecesJustificatives.forEach(pjAMettreAJour => {
      const pjReference = DocumentPJ.getPieceJustificative(
        documentsPJReference,
        documentPJAMettreAJour.id,
        pjAMettreAJour.id
      );
      if (pjReference) {
        pjAMettreAJour.libelle = pjReference.libelle;
      }
    });
  });
  return documentsPJAMettreAJour;
}
