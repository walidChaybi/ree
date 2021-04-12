/* istanbul ignore file */

import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../views/common/util/Utils";
import { TypePieceJustificative } from "../../model/requete/v2/enum/TypePieceJustificative";
import { DocumentDelivrance } from "../../model/requete/v2/enum/DocumentDelivrance";
import { getNomenclatureRequete } from "../appels/requeteApi";

const TYPE_PIECE_JUSTIFICATIVE = "TYPE_PIECE_JUSTIFICATIVE";
const DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";

export async function peupleTypePieceJustificative() {
  const typesPieceJustificative = await getNomenclatureRequete(
    TYPE_PIECE_JUSTIFICATIVE
  );

  for (const data of typesPieceJustificative.body.data) {
    TypePieceJustificative.addEnum(
      TypePieceJustificative,
      data.id,
      new TypePieceJustificative(
        premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
      )
    );
  }
}

export async function peupleDocumentDelivrence() {
  const documentsDelivrence = await getNomenclatureRequete(DOCUMENT_DELIVRANCE);

  for (const data of documentsDelivrence.body.data) {
    DocumentDelivrance.addEnum(
      DocumentDelivrance,
      data.id,
      new DocumentDelivrance(
        premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
      )
    );
  }
}
