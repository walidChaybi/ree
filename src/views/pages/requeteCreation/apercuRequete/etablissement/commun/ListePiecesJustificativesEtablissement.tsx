import { DocumentPJ, IDocumentPJ } from "@model/requete/IDocumentPj";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { Options } from "@util/Type";
import { estRenseigne } from "@util/Utils";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { IconePlus } from "@widget/icones/IconePlus";
import { ListeGlisserDeposer, ListeItem } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useEffect, useState } from "react";
import { TFctRenommePieceJustificative } from "../../../commun/composants/OngletPiecesJustificatives";
import { ModaleAjoutPieceJustificativeRequeteCreation } from "./ModalAjoutPieceJustificative";
import "./scss/ListePiecesJustificativesEtablissement.scss";

interface ListePiecesJustificativesEtablissementProps {
  requete?: IRequeteCreationEtablissement;
  autoriseOuvertureFenetreExt?: boolean;
  onRenommePieceJustificative: TFctRenommePieceJustificative;
  rechargerRequete?: () => void;
}

export const ListePiecesJustificativesEtablissement: React.FC<ListePiecesJustificativesEtablissementProps> = ({
  autoriseOuvertureFenetreExt = false,
  ...props
}) => {
  const [documentPJTries, setDocumentPJTries] = useState<IDocumentPJ[]>([]);
  const [estModaleOuverte, setEstModaleOuverte] = useState<boolean>(false);

  useEffect(() => {
    if (props.requete?.documentsPj) {
      let nouveauxDocumentPJTries;
      if (estRenseigne(documentPJTries)) {
        nouveauxDocumentPJTries = majLibellesPiecesJustificatives(documentPJTries, props.requete.documentsPj);
      } else {
        nouveauxDocumentPJTries = [...props.requete.documentsPj];
      }
      setDocumentPJTries(nouveauxDocumentPJTries);
    }
    return () => {
      setDocumentPJTries([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requete]);

  const setNouveauLibellePieceJointe = (idDocumentPJ: string, idPieceJustificative: string, nouveauLibelle: string) => {
    const pieceJTrouvee = DocumentPJ.getPieceJustificative(documentPJTries, idDocumentPJ, idPieceJustificative);
    if (pieceJTrouvee) {
      pieceJTrouvee.nouveauLibelleFichierPJ = nouveauLibelle;
      setDocumentPJTries([...documentPJTries]);
      props.onRenommePieceJustificative(idPieceJustificative, nouveauLibelle, idDocumentPJ);
    }
  };

  const mapDocumentsPjTriesVersListeItem = (): ListeItem[] => {
    return documentPJTries.map(
      (document: IDocumentPJ): ListeItem => ({
        id: document.id,
        libelle: document.categorie.libelleAAfficher,
        checkbox: false,
        estSupprimable: false,
        estModifiable: false,
        sousElement: (
          <>
            {document.piecesJustificatives.map((piece: IPieceJustificativeCreation, index) => (
              <AccordionVisionneuse
                key={piece.id}
                idDocumentAAfficher={piece.id}
                titre={piece.nouveauLibelleFichierPJ}
                titreOrigine={piece.nom}
                typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
                numRequete={props.requete?.numero}
                setTitreActuel={(nouveauLibelle: string) => {
                  setNouveauLibellePieceJointe(document.id, piece.id, nouveauLibelle);
                }}
                autoriseOuvertureFenetreExt={autoriseOuvertureFenetreExt}
              />
            ))}
          </>
        )
      })
    );
  };

  function ouvrirModal() {
    setEstModaleOuverte(true);
  }

  function fermerModal() {
    setEstModaleOuverte(false);
    setDocumentPJTries([]);
    if (props.rechargerRequete) {
      props.rechargerRequete();
    }
  }

  const listeCategoriePJ: Options = documentPJTries.map(documentPJ => {
    return {
      cle: documentPJ.id,
      libelle: documentPJ.categorie.libelleAAfficher
    };
  });

  return (
    <span className="PiecesJustificativesContainer">
      <div className="IconePlusContainer">
        <BoutonDoubleSubmit
          onClick={ouvrirModal}
          className="BoutonPlus"
        >
          {"Ajouter un fichier"}
          <IconePlus
            className="text-lg"
            title={"Ajouter une pièce justificatives"}
            onClick={ouvrirModal}
          />
        </BoutonDoubleSubmit>
      </div>

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
      <ModaleAjoutPieceJustificativeRequeteCreation
        estOuvert={estModaleOuverte}
        onClose={fermerModal}
        listeCategoriePJ={listeCategoriePJ}
      />
    </span>
  );

  function handleReorga(oldIndex: number, newIndex: number) {
    if (documentPJTries) {
      const newList = [...documentPJTries];
      const item = newList[oldIndex];
      newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, item);
      setDocumentPJTries(newList);
    }
  }
};

function majLibellesPiecesJustificatives(documentsPJAMettreAJour: IDocumentPJ[], documentsPJReference: IDocumentPJ[]) {
  documentsPJAMettreAJour.forEach(documentPJAMettreAJour => {
    documentPJAMettreAJour.piecesJustificatives.forEach(pjAMettreAJour => {
      const pjReference = DocumentPJ.getPieceJustificative(documentsPJReference, documentPJAMettreAJour.id, pjAMettreAJour.id);
      if (pjReference) {
        pjAMettreAJour.libelle = pjReference.libelle;
      }
    });
  });
  return documentsPJAMettreAJour;
}
