/* istanbul ignore file */

import { DocumentDelivrance } from "../../model/requete/v2/enum/DocumentDelivrance";
import { TypePieceJustificative } from "../../model/requete/v2/enum/TypePieceJustificative";
import { logError } from "../../views/common/util/LogManager";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../views/common/util/Utils";
import { getNomenclatureRequete } from "../appels/requeteApi";

const TYPE_PIECE_JUSTIFICATIVE = "TYPE_PIECE_JUSTIFICATIVE";
const DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";

export async function peupleTypePieceJustificative() {
  try {
    const typesPieceJustificative = await getNomenclatureRequete(
      TYPE_PIECE_JUSTIFICATIVE
    );

    // Pas besoin de recharger l'enum si les données viennent du cache car il a déjà été alimenté une première fois
    if (!typesPieceJustificative.inReceCache) {
      TypePieceJustificative.clean();
      for (const data of typesPieceJustificative.body.data) {
        TypePieceJustificative.addEnum(
          data.id,
          new TypePieceJustificative(
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
          )
        );
      }
    }
  } catch (error) {
    logError({
      messageUtilisateur:
        "Impossible de charger les types de pièces justificatives",
      error
    });
  }
}

export async function peupleDocumentDelivrance() {
  try {
    const documentsDelivrence = await getNomenclatureRequete(
      DOCUMENT_DELIVRANCE
    );

    // Pas besoin de recharger l'enum si les données viennent du cache car il a déjà été alimenté une première fois
    if (!documentsDelivrence.inReceCache) {
      DocumentDelivrance.clean();
      for (const data of documentsDelivrence.body.data) {
        DocumentDelivrance.addEnum(
          data.id,
          new DocumentDelivrance(
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
          )
        );
      }
    }
  } catch (error) {
    logError({
      messageUtilisateur:
        "Impossible de charger les types de documents de délivrance",
      error
    });
  }
}
