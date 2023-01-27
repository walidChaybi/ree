import { TypePieceJointe } from "@hook/requete/piecesJointes/communPieceJointe";
import { IDocumentPJ } from "@model/requete/IDocumentPj";
import {
  IRequeteCreationEtablissement,
  RequeteCreation
} from "@model/requete/IRequeteCreationEtablissement";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import {
  ListeGlisserDeposer,
  ListeItem
} from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ApercuReqCreationPageContext } from "../../apercuRequete/etablissement/ApercuReqCreationEtablissementPage";
import "./scss/VoletPiecesJustificatives.scss";

interface OngletPiecesJustificativesProps {
  requete: IRequeteCreationEtablissement | IRequeteCreationTranscription;
  autoriseOuvertureFenetreExt?: boolean;
}

export const OngletPiecesJustificatives: React.FC<
  OngletPiecesJustificativesProps
> = ({ autoriseOuvertureFenetreExt = false, ...props }) => {
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
      return documentsPj.map(
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
                    setTitreActuel={(nouveauLibelle: string) =>
                      setTitreActuel(document.id, piece.id, nouveauLibelle)
                    }
                    autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
                  />
                )
              )}
            </>
          )
        })
      );
    },
    [props.requete.numero, autoriseOuvertureFenetreExt, setTitreActuel]
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
